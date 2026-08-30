import 'voice_commands.dart';

class IntentDetector {
  /// Simple offline keyword matching to determine the user's intent.
  /// This can be expanded with more languages and variations.
  static VoiceIntent detectIntent(String spokenText, String languageCode) {
    final text = spokenText.toLowerCase();

    // English Keywords
    if (languageCode.startsWith('en')) {
      if (text.contains('game') || text.contains('play')) {
        return VoiceIntent.openGames;
      }
      if (text.contains('medicine') || text.contains('reminder') || text.contains('appointment') || text.contains('pill')) {
        return VoiceIntent.openReminders;
      }
      if (text.contains('progress') || text.contains('score') || text.contains('report')) {
        return VoiceIntent.openProgress;
      }
      if (text.contains('setting') || text.contains('contrast') || text.contains('font')) {
        return VoiceIntent.openSettings;
      }
      if (text.contains('home') || text.contains('dashboard') || text.contains('back')) {
        return VoiceIntent.goHome;
      }
    }
    // Assamese Keywords (Example setup, add actual localized keywords as needed)
    else if (languageCode.startsWith('as')) {
      if (text.contains('khel') || text.contains('khela')) {
        return VoiceIntent.openGames;
      }
      if (text.contains('ousodh') || text.contains('monot')) {
        return VoiceIntent.openReminders;
      }
    }
    // Bengali Keywords
    else if (languageCode.startsWith('bn')) {
      if (text.contains('khela') || text.contains('game')) {
        return VoiceIntent.openGames;
      }
      if (text.contains('oshudh') || text.contains('mone')) {
        return VoiceIntent.openReminders;
      }
    }

    // Default fallback
    return VoiceIntent.unknown;
  }

  /// Provides an appropriate text response based on the detected intent.
  static String getResponseText(VoiceIntent intent) {
    switch (intent) {
      case VoiceIntent.openGames:
        return "Opening your games now.";
      case VoiceIntent.openReminders:
        return "Taking you to your reminders.";
      case VoiceIntent.openProgress:
        return "Opening your progress report.";
      case VoiceIntent.openSettings:
        return "Opening settings.";
      case VoiceIntent.goHome:
        return "Going back to the home screen.";
      case VoiceIntent.unknown:
        return "I didn't quite catch that. Could you repeat?";
    }
  }
}