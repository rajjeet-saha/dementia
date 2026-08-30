import 'package:sqflite/sqflite.dart';
import '../../models/game_result.dart';
import '../app_database.dart';
import '../database_constants.dart';

class GameResultDao {
  final AppDatabase _appDatabase;

  GameResultDao({AppDatabase? appDatabase})
      : _appDatabase = appDatabase ?? AppDatabase.instance;

  Future<void> insertResult(GameResult result) async {
    final db = await _appDatabase.database;
    await db.insert(
      DatabaseConstants.tableGameResults,
      result.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<GameResult>> getResultsForUser(String userId, {int limit = 50}) async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableGameResults,
      where: 'user_id = ?',
      whereArgs: [userId],
      orderBy: 'played_at DESC',
      limit: limit,
    );
    return results.map((map) => GameResult.fromMap(map)).toList();
  }

  Future<List<GameResult>> getPendingSyncResults() async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableGameResults,
      where: 'sync_status = ?',
      whereArgs: ['pending'],
    );
    return results.map((map) => GameResult.fromMap(map)).toList();
  }

  Future<void> markAsSynced(String id) async {
    final db = await _appDatabase.database;
    await db.update(
      DatabaseConstants.tableGameResults,
      {'sync_status': 'synced'},
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}