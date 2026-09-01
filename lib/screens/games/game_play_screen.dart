import 'dart:io';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:uuid/uuid.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../models/game_result.dart';
import '../../repositories/auth_repository.dart';
import '../../repositories/game_repository.dart';
import '../../widgets/cultural_background.dart';

// ---------------------------------------------------------
// Tiny Local HTTP Server to bypass CORS and serve Godot WASM
// ---------------------------------------------------------
class LocalGameServer {
  HttpServer? _server;
  int get port => _server?.port ?? 8080;

  Future<void> start() async {
    _server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    _server!.listen((HttpRequest request) async {
      final path = request.uri.path == '/' ? '/index.html' : request.uri.path;
      final assetPath = 'assets/godot_game$path';

      try {
        final data = await rootBundle.load(assetPath);
        final bytes = data.buffer.asUint8List();

        if (path.endsWith('.html')) {
          request.response.headers.contentType = ContentType.html;
        } else if (path.endsWith('.js')) {
          request.response.headers.contentType = ContentType.parse('application/javascript');
        } else if (path.endsWith('.wasm')) {
          request.response.headers.contentType = ContentType.parse('application/wasm');
        } else if (path.endsWith('.pck')) {
          request.response.headers.contentType = ContentType.parse('application/octet-stream');
        }

        request.response.headers.add('Cross-Origin-Opener-Policy', 'same-origin');
        request.response.headers.add('Cross-Origin-Embedder-Policy', 'require-corp');
        request.response.headers.add('Access-Control-Allow-Origin', '*');

        request.response.add(bytes);
      } catch (e) {
        request.response.statusCode = HttpStatus.notFound;
      } finally {
        await request.response.close();
      }
    });
  }

  void stop() {
    _server?.close();
  }
}

// ---------------------------------------------------------
// Main Game Play Screen
// ---------------------------------------------------------
class GamePlayScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;
  final String gameType;

  const GamePlayScreen({
    super.key,
    required this.accessibilityController,
    required this.gameType,
  });

  @override
  State<GamePlayScreen> createState() => _GamePlayScreenState();
}

class _GamePlayScreenState extends State<GamePlayScreen> {
  late WebViewController _controller;
  final LocalGameServer _localServer = LocalGameServer();
  final GameRepository _gameRepo = GameRepository();
  final AuthRepository _authRepo = AuthRepository();

  bool _isServerReady = false;
  bool _isLoading = true;

  // ==========================================
  // THE SEQUENCE CONTROLLER
  // ==========================================
  int currentGameIndex = 0;

  // You can shuffle these, remove some, or add more later directly in Flutter!
  final List<String> gameSequence = ['game_3', 'game_2', 'game_1'];

  @override
  void initState() {
    super.initState();
    _initServerAndWebView();
  }

  Future<void> _initServerAndWebView() async {
    await _localServer.start();

    _controller = WebViewController()
      ..setUserAgent('Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36')
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.transparent)
      ..addJavaScriptChannel(
        'FlutterBridge',
        onMessageReceived: (JavaScriptMessage message) {
          _handleGameFinished(message.message);
        },
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            if (mounted) {
              setState(() {
                _isLoading = false;
              });

              // NEW: A smart JavaScript loop that waits for Godot to finish booting
              _controller.runJavaScript('''
                function startWhenReady() {
                  if (typeof window.loadNextGame === 'function') {
                    window.loadNextGame('${gameSequence[currentGameIndex]}');
                  } else {
                    setTimeout(startWhenReady, 200); // Check again in 200ms
                  }
                }
                startWhenReady();
              ''');
            }
          },
        ),
      )
      ..loadRequest(Uri.parse('http://127.0.0.1:${_localServer.port}/'));

    if (mounted) {
      setState(() {
        _isServerReady = true;
      });
    }
  }

  Future<void> _handleGameFinished(String jsonPayload) async {
    // 1. Save the score to the database
    try {
      final user = await _authRepo.getCurrentUser();
      if (user != null) {
        final Map<String, dynamic> data = jsonDecode(jsonPayload);
        final result = GameResult(
          id: const Uuid().v4(),
          userId: user.id,
          gameId: data['game_id'] ?? 'godot_web_game',
          gameType: data['game_type'] ?? widget.gameType,
          difficultyLevel: data['difficulty_level'] ?? 1,
          score: data['score'] ?? 0,
          accuracy: (data['accuracy'] as num?)?.toDouble() ?? 0.0,
          responseTimeMs: data['response_time_ms'] ?? 0,
          mistakesCount: data['mistakes_count'] ?? 0,
          hintsUsed: data['hints_used'] ?? 0,
          attemptsCount: data['attempts_count'] ?? 1,
          playedAt: DateTime.now(),
        );
        await _gameRepo.saveGameResult(result);
      }
    } catch (e) {
      debugPrint('Error saving game result: $e');
    }

    // 2. Check if we need to load the next game or exit
    if (currentGameIndex < gameSequence.length - 1) {
      // Advance to the next game in the list
      currentGameIndex++;

      // Tell Godot to swap scenes instantly
      _controller.runJavaScript("window.loadNextGame('${gameSequence[currentGameIndex]}');");
    } else {
      // The sequence is fully complete. Exit the screen.
      if (mounted) Navigator.pop(context);
    }
  }

  @override
  void dispose() {
    _localServer.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CulturalBackground(
        child: SafeArea(
          child: Stack(
            children: [
              if (_isServerReady) WebViewWidget(controller: _controller),
              if (!_isServerReady || _isLoading)
                const Center(
                  child: CircularProgressIndicator(),
                ),
            ],
          ),
        ),
      ),
    );
  }
}