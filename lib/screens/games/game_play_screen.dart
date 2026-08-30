import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';
import 'dart:async';
import '../../accessibility/accessibility_controller.dart';
import '../../models/game_result.dart';
import '../../repositories/auth_repository.dart';
import '../../repositories/game_repository.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';

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
  final GameRepository _gameRepo = GameRepository();
  final AuthRepository _authRepo = AuthRepository();

  int _currentPhase = 0; // 0: Memory, 1: Pattern, 2: Object, 3: Saving, 4: Done

  // Scoring metrics
  int _score = 0;
  int _mistakes = 0;
  int _hintsUsed = 0;
  late DateTime _gameStartTime;

  // Memory Phase State
  bool _showMemoryTarget = true;

  @override
  void initState() {
    super.initState();
    _gameStartTime = DateTime.now();
    _startMemoryPhase();
  }

  void _startMemoryPhase() {
    // Show the target object for 3 seconds, then hide it and show options
    Timer(const Duration(seconds: 3), () {
      if (mounted) {
        setState(() {
          _showMemoryTarget = false;
        });
      }
    });
  }

  void _handleAnswer(bool isCorrect) {
    if (isCorrect) {
      setState(() {
        _score += 33; // Roughly 1/3rd of 100%
        _currentPhase++;
      });
    } else {
      setState(() {
        _mistakes++;
        // Provide a visual hint or just move on depending on difficulty
        // For this baseline, we'll let them try again by not advancing the phase
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Not quite! Try again.', style: TextStyle(fontSize: 18)),
          backgroundColor: Colors.orange,
          duration: Duration(seconds: 1),
        ),
      );
    }

    if (_currentPhase == 3) {
      _finishGame();
    }
  }

  Future<void> _finishGame() async {
    setState(() => _currentPhase = 3); // Saving state

    try {
      final user = await _authRepo.getCurrentUser();
      if (user == null) return;

      final duration = DateTime.now().difference(_gameStartTime).inMilliseconds;
      double finalAccuracy = _mistakes == 0 ? 1.0 : (3 / (3 + _mistakes));

      final result = GameResult(
        id: const Uuid().v4(),
        userId: user.id,
        gameId: 'unified_workout_1',
        gameType: 'mixed_cognitive',
        difficultyLevel: 1,
        score: _score >= 99 ? 100 : _score, // Round up to 100
        accuracy: finalAccuracy,
        responseTimeMs: duration,
        mistakesCount: _mistakes,
        hintsUsed: _hintsUsed,
        attemptsCount: 1,
        playedAt: DateTime.now(),
      );

      await _gameRepo.saveGameResult(result);

      if (mounted) {
        setState(() => _currentPhase = 4); // Done state
      }
    } catch (e) {
      print('Error saving game: $e');
    }
  }

  Widget _buildMemoryPhase(ThemeData theme) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        AccessibleText(
          _showMemoryTarget ? 'Remember this item!' : 'Which item did you just see?',
          baseFontSize: 24,
          fontWeight: FontWeight.bold,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        if (_showMemoryTarget)
          Icon(Icons.pets_rounded, size: 120, color: theme.colorScheme.primary)
        else ...[
          AccessibleButton(
            label: 'A Car',
            icon: Icons.directions_car_rounded,
            isPrimary: false,
            onPressed: () => _handleAnswer(false),
          ),
          AccessibleButton(
            label: 'A Dog',
            icon: Icons.pets_rounded,
            onPressed: () => _handleAnswer(true),
          ),
          AccessibleButton(
            label: 'A House',
            icon: Icons.home_rounded,
            isPrimary: false,
            onPressed: () => _handleAnswer(false),
          ),
        ]
      ],
    );
  }

  Widget _buildPatternPhase(ThemeData theme) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const AccessibleText(
          'What comes next in the pattern?',
          baseFontSize: 24,
          fontWeight: FontWeight.bold,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Icon(Icons.circle, size: 60, color: theme.colorScheme.primary),
            Icon(Icons.square, size: 60, color: theme.colorScheme.secondary),
            Icon(Icons.circle, size: 60, color: theme.colorScheme.primary),
            Icon(Icons.help_outline_rounded, size: 60, color: theme.colorScheme.error),
          ],
        ),
        const SizedBox(height: 60),
        AccessibleButton(
          label: 'A Circle',
          icon: Icons.circle,
          isPrimary: false,
          onPressed: () => _handleAnswer(false),
        ),
        AccessibleButton(
          label: 'A Square',
          icon: Icons.square,
          onPressed: () => _handleAnswer(true),
        ),
      ],
    );
  }

  Widget _buildObjectPhase(ThemeData theme) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const AccessibleText(
          'What is this object used for?',
          baseFontSize: 24,
          fontWeight: FontWeight.bold,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 40),
        Icon(Icons.umbrella_rounded, size: 120, color: theme.colorScheme.tertiary),
        const SizedBox(height: 60),
        AccessibleButton(
          label: 'Drinking water',
          isPrimary: false,
          onPressed: () => _handleAnswer(false),
        ),
        AccessibleButton(
          label: 'Protection from rain',
          onPressed: () => _handleAnswer(true),
        ),
        AccessibleButton(
          label: 'Cutting food',
          isPrimary: false,
          onPressed: () => _handleAnswer(false),
        ),
      ],
    );
  }

  Widget _buildCompletionPhase(ThemeData theme) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.workspace_premium_rounded, size: 120, color: Colors.amber.shade700),
        const SizedBox(height: 24),
        const AccessibleText(
          'Great Job!',
          baseFontSize: 32,
          fontWeight: FontWeight.w900,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 12),
        const AccessibleText(
          'Your daily cognitive workout is complete and saved to your progress.',
          baseFontSize: 18,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 48),
        AccessibleButton(
          label: 'Return Home',
          icon: Icons.home_rounded,
          onPressed: () => Navigator.pop(context),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    Widget currentView;
    switch (_currentPhase) {
      case 0:
        currentView = _buildMemoryPhase(theme);
        break;
      case 1:
        currentView = _buildPatternPhase(theme);
        break;
      case 2:
        currentView = _buildObjectPhase(theme);
        break;
      case 3:
        currentView = const Center(child: CircularProgressIndicator(strokeWidth: 4));
        break;
      case 4:
        currentView = _buildCompletionPhase(theme);
        break;
      default:
        currentView = const SizedBox.shrink();
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Daily Workout'),
        // Prevent accidental back-button presses during gameplay
        automaticallyImplyLeading: _currentPhase == 4,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          // AnimatedSwitcher gives a smooth fade between the game phases
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 500),
            child: KeyedSubtree(
              key: ValueKey<int>(_currentPhase),
              child: currentView,
            ),
          ),
        ),
      ),
    );
  }
}