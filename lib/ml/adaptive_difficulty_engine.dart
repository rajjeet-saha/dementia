import '../models/game_result.dart';

class AdaptiveDifficultyEngine {
  /// Calculates the next recommended difficulty (1 to 5) based on the user's recent game history.
  /// When your ML model is ready, replace the heuristic logic inside with model inference.
  static int calculateNextDifficulty({
    required List<GameResult> recentResults,
    required int currentDifficulty,
  }) {
    if (recentResults.isEmpty) {
      return 1; // Default starting difficulty
    }

    // Consider up to the last 5 games
    final sample = recentResults.take(5).toList();

    double totalAccuracy = 0.0;
    int totalMistakes = 0;
    int totalResponseTimeMs = 0;

    for (final result in sample) {
      totalAccuracy += result.accuracy;
      totalMistakes += result.mistakesCount;
      totalResponseTimeMs += result.responseTimeMs;
    }

    final avgAccuracy = totalAccuracy / sample.length;
    final avgMistakes = totalMistakes / sample.length;
    final avgResponseTimeMs = totalResponseTimeMs / sample.length;

    int newDifficulty = currentDifficulty;

    // Promotion rule: High accuracy, low mistakes, and prompt response
    if (avgAccuracy >= 0.85 && avgMistakes <= 2 && avgResponseTimeMs <= 6000) {
      if (newDifficulty < 5) {
        newDifficulty += 1;
      }
    }
    // Demotion rule: Low accuracy or persistent mistakes
    else if (avgAccuracy < 0.60 || avgMistakes >= 5 || avgResponseTimeMs > 12000) {
      if (newDifficulty > 1) {
        newDifficulty -= 1;
      }
    }

    return newDifficulty;
  }
}