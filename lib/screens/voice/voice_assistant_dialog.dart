import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../app/routes.dart';
import '../../voice/intent_detector.dart';
import '../../voice/voice_assistant_service.dart';
import '../../voice/voice_commands.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';

class VoiceAssistantDialog extends StatefulWidget {
  final AccessibilityController accessibilityController; // Must match exactly

  const VoiceAssistantDialog({
    super.key,
    required this.accessibilityController, // Must match exactly
  });

  @override
  State<VoiceAssistantDialog> createState() => _VoiceAssistantDialogState();
}

class _VoiceAssistantDialogState extends State<VoiceAssistantDialog> {
  final VoiceAssistantService _voiceService = VoiceAssistantService();
  String _spokenText = "Listening...";
  bool _isListening = false;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    _startVoiceInteraction();
  }

  @override
  void dispose() {
    _voiceService.stopListening();
    _voiceService.stopSpeaking();
    super.dispose();
  }

  Future<void> _startVoiceInteraction() async {
    final hasPermission = await _voiceService.initialize();

    if (!hasPermission) {
      setState(() {
        _spokenText = "Microphone permission denied.";
      });
      return;
    }

    setState(() {
      _isListening = true;
      _spokenText = "Listening...";
    });

    final currentLanguageCode = widget.accessibilityController.locale.languageCode;

    await _voiceService.startListening(
      localeId: currentLanguageCode,
      onResult: (text) {
        setState(() {
          _spokenText = text;
        });
      },
    );

    await Future.delayed(const Duration(seconds: 4));

    if (mounted && _isListening) {
      await _processIntent();
    }
  }

  Future<void> _processIntent() async {
    setState(() {
      _isListening = false;
      _isProcessing = true;
    });

    await _voiceService.stopListening();

    final currentLanguageCode = widget.accessibilityController.locale.languageCode;
    final intent = IntentDetector.detectIntent(_spokenText, currentLanguageCode);
    final responseText = IntentDetector.getResponseText(intent);

    setState(() {
      _spokenText = responseText;
    });

    await _voiceService.speak(responseText, currentLanguageCode);

    await Future.delayed(const Duration(seconds: 2));

    if (!mounted) return;

    switch (intent) {
      case VoiceIntent.openGames:
        Navigator.pop(context);
        Navigator.pushNamed(context, AppRoutes.games);
        break;
      case VoiceIntent.openReminders:
        Navigator.pop(context);
        Navigator.pushNamed(context, AppRoutes.reminders);
        break;
      case VoiceIntent.openProgress:
        Navigator.pop(context);
        Navigator.pushNamed(context, AppRoutes.progress);
        break;
      case VoiceIntent.openSettings:
        Navigator.pop(context);
        Navigator.pushNamed(context, AppRoutes.settings);
        break;
      case VoiceIntent.goHome:
        Navigator.pop(context);
        Navigator.popUntil(context, ModalRoute.withName(AppRoutes.home));
        break;
      case VoiceIntent.unknown:
        setState(() {
          _isProcessing = false;
        });
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 48,
            height: 6,
            decoration: BoxDecoration(
              color: theme.colorScheme.outlineVariant,
              borderRadius: BorderRadius.circular(3),
            ),
          ),
          const SizedBox(height: 24),

          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: _isListening
                  ? theme.colorScheme.primaryContainer
                  : theme.colorScheme.surfaceContainerHighest,
              shape: BoxShape.circle,
            ),
            child: Icon(
              _isListening ? Icons.mic_rounded : Icons.mic_none_rounded,
              size: 72,
              color: _isListening
                  ? theme.colorScheme.primary
                  : theme.colorScheme.onSurfaceVariant,
            ),
          ),

          const SizedBox(height: 24),

          AccessibleText(
            _spokenText,
            baseFontSize: 24,
            fontWeight: FontWeight.bold,
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 32),

          if (!_isProcessing)
            AccessibleButton(
              label: _isListening ? 'Stop' : 'Try Again',
              onPressed: () {
                if (_isListening) {
                  _processIntent();
                } else {
                  _startVoiceInteraction();
                }
              },
              isPrimary: !_isListening,
            ),

          const SizedBox(height: 12),

          AccessibleButton(
            label: 'Close',
            onPressed: () => Navigator.pop(context),
            isPrimary: false,
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }
}