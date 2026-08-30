class CognitiveProfile {
  final double memoryScore;
  final double attentionScore;
  final double patternScore;
  final double overallRating; // 1.0 to 5.0
  final int totalGamesPlayed;
  final String summaryStatus; // 'Great', 'Good', 'Active'

  CognitiveProfile({
    required this.memoryScore,
    required this.attentionScore,
    required this.patternScore,
    required this.overallRating,
    required this.totalGamesPlayed,
    required this.summaryStatus,
  });

  factory CognitiveProfile.initial() {
    return CognitiveProfile(
      memoryScore: 100.0,
      attentionScore: 100.0,
      patternScore: 100.0,
      overallRating: 5.0,
      totalGamesPlayed: 0,
      summaryStatus: 'Ready to Play',
    );
  }
}