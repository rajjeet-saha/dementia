import '../models/cognitive_profile.dart';
import '../models/game_result.dart';

class CognitiveTrendAnalyzer {
  /// Evaluates game results to produce the elderly user's high-level cognitive profile.
  static CognitiveProfile analyzeProgress(List<GameResult> results) {
    if (results.isEmpty) {
      return CognitiveProfile.initial();
    }

    double memorySum = 0.0;
    int memoryCount = 0;

    double attentionSum = 0.0;
    int attentionCount = 0;

    double patternSum = 0.0;
    int patternCount = 0;

    for (final r in results) {
      final scoreVal = r.score.toDouble();
      if (r.gameType.contains('memory')) {
        memorySum += scoreVal;
        memoryCount++;
      } else if (r.gameType.contains('attention') || r.gameType.contains('recognition')) {
        attentionSum += scoreVal;
        attentionCount++;
      } else if (r.gameType.contains('pattern')) {
        patternSum += scoreVal;
        patternCount++;
      } else {
        // Fallback distribution
        memorySum += scoreVal;
        memoryCount++;
      }
    }

    final memoryScore = memoryCount > 0 ? (memorySum / memoryCount) : 80.0;
    final attentionScore = attentionCount > 0 ? (attentionSum / attentionCount) : 80.0;
    final patternScore = patternCount > 0 ? (patternSum / patternCount) : 80.0;

    final overallAverage = (memoryScore + attentionScore + patternScore) / 3.0;
    // Map 0-100 to 1.0 - 5.0 stars
    final overallRating = ((overallAverage / 100.0) * 4.0 + 1.0).clamp(1.0, 5.0);

    String summaryStatus = 'Active';
    if (overallAverage >= 80) {
      summaryStatus = 'Great';
    } else if (overallAverage >= 60) {
      summaryStatus = 'Good';
    } else {
      summaryStatus = 'Needs Practice';
    }

    return CognitiveProfile(
      memoryScore: memoryScore,
      attentionScore: attentionScore,
      patternScore: patternScore,
      overallRating: overallRating,
      totalGamesPlayed: results.length,
      summaryStatus: summaryStatus,
    );
  }

  /// Checks if recent performance indicates a persistent decline compared to baseline.
  static bool hasSignificantDecline({
    required List<GameResult> allHistory,
    int recentWindowSize = 5,
    double declineThresholdPercentage = 0.25,
  }) {
    if (allHistory.length < (recentWindowSize * 2)) {
      return false; // Not enough baseline history
    }

    final recentGames = allHistory.take(recentWindowSize).toList();
    final baselineGames = allHistory.skip(recentWindowSize).take(15).toList();

    final recentAvg = recentGames.map((e) => e.score).reduce((a, b) => a + b) / recentGames.length;
    final baselineAvg = baselineGames.map((e) => e.score).reduce((a, b) => a + b) / baselineGames.length;

    if (baselineAvg <= 0) return false;

    final drop = (baselineAvg - recentAvg) / baselineAvg;
    return drop >= declineThresholdPercentage;
  }
}