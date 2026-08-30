import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:flutter_tts/flutter_tts.dart';

class VoiceAssistantService {
  final stt.SpeechToText _speechToText = stt.SpeechToText();
  final FlutterTts _flutterTts = FlutterTts();

  bool _isSttInitialized = false;

  Future<bool> initialize() async {
    if (!_isSttInitialized) {
      _isSttInitialized = await _speechToText.initialize(
        onError: (error) => print('STT Error: $error'),
        onStatus: (status) => print('STT Status: $status'),
      );
    }

    // Configure TTS for elderly accessibility (slightly slower, clear pitch)
    await _flutterTts.setSpeechRate(0.45);
    await _flutterTts.setPitch(1.0);

    return _isSttInitialized;
  }

  Future<void> startListening({
    required Function(String) onResult,
    required String localeId,
  }) async {
    if (!_isSttInitialized) await initialize();

    if (_isSttInitialized) {
      await _speechToText.listen(
        onResult: (result) {
          onResult(result.recognizedWords);
        },
        localeId: localeId,
        cancelOnError: true,
        partialResults: true,
      );
    }
  }

  Future<void> stopListening() async {
    await _speechToText.stop();
  }

  Future<void> speak(String text, String languageCode) async {
    await _flutterTts.setLanguage(languageCode);
    await _flutterTts.speak(text);
  }

  Future<void> stopSpeaking() async {
    await _flutterTts.stop();
  }
}