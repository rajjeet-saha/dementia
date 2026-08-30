class GameResult {
  final String id;
  final String userId;
  final String gameId;
  final String gameType; // 'memory', 'attention', 'pattern', 'recall', 'emotion'
  final int difficultyLevel;
  final int score;
  final double accuracy;
  final int responseTimeMs;
  final int mistakesCount;
  final int hintsUsed;
  final int attemptsCount;
  final DateTime playedAt;
  final String syncStatus; // 'pending', 'synced', 'failed'

  GameResult({
    required this.id,
    required this.userId,
    required this.gameId,
    required this.gameType,
    required this.difficultyLevel,
    required this.score,
    required this.accuracy,
    required this.responseTimeMs,
    required this.mistakesCount,
    required this.hintsUsed,
    required this.attemptsCount,
    required this.playedAt,
    this.syncStatus = 'pending',
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'user_id': userId,
      'game_id': gameId,
      'game_type': gameType,
      'difficulty_level': difficultyLevel,
      'score': score,
      'accuracy': accuracy,
      'response_time_ms': responseTimeMs,
      'mistakes_count': mistakesCount,
      'hints_used': hintsUsed,
      'attempts_count': attemptsCount,
      'played_at': playedAt.toIso8601String(),
      'sync_status': syncStatus,
    };
  }

  factory GameResult.fromMap(Map<String, dynamic> map) {
    return GameResult(
      id: map['id'] as String,
      userId: map['user_id'] as String,
      gameId: map['game_id'] as String,
      gameType: map['game_type'] as String,
      difficultyLevel: map['difficulty_level'] as int,
      score: map['score'] as int,
      accuracy: (map['accuracy'] as num).toDouble(),
      responseTimeMs: map['response_time_ms'] as int,
      mistakesCount: map['mistakes_count'] as int,
      hintsUsed: map['hints_used'] as int,
      attemptsCount: map['attempts_count'] as int,
      playedAt: DateTime.parse(map['played_at'] as String),
      syncStatus: map['sync_status'] as String? ?? 'pending',
    );
  }
}