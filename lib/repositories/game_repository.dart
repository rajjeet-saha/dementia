import 'dart:convert';
import 'package:uuid/uuid.dart';
import '../database/daos/game_result_dao.dart';
import '../database/daos/sync_queue_dao.dart';
import '../database/database_constants.dart';
import '../models/game_result.dart';

class GameRepository {
  final GameResultDao _gameResultDao;
  final SyncQueueDao _syncQueueDao;
  static const _uuid = Uuid();

  GameRepository({
    GameResultDao? gameResultDao,
    SyncQueueDao? syncQueueDao,
  })  : _gameResultDao = gameResultDao ?? GameResultDao(),
        _syncQueueDao = syncQueueDao ?? SyncQueueDao();

  Future<void> saveGameResult(GameResult result) async {
    // 1. Write to local SQLite
    await _gameResultDao.insertResult(result);

    // 2. Stage to Outbox Queue
    await _syncQueueDao.enqueue(
      SyncQueueItem(
        id: _uuid.v4(),
        tableName: DatabaseConstants.tableGameResults,
        recordId: result.id,
        operation: 'INSERT',
        payload: jsonEncode(result.toMap()),
        createdAt: DateTime.now(),
      ),
    );
  }

  Future<List<GameResult>> getHistory(String userId, {int limit = 50}) async {
    return await _gameResultDao.getResultsForUser(userId, limit: limit);
  }
}