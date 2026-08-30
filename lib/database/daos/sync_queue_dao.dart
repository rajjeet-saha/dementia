import 'package:sqflite/sqflite.dart';
import '../app_database.dart';
import '../database_constants.dart';

class SyncQueueItem {
  final String id;
  final String tableName;
  final String recordId;
  final String operation;
  final String payload;
  final int retryCount;
  final String? lastError;
  final DateTime createdAt;

  SyncQueueItem({
    required this.id,
    required this.tableName,
    required this.recordId,
    required this.operation,
    required this.payload,
    this.retryCount = 0,
    this.lastError,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'table_name': tableName,
      'record_id': recordId,
      'operation': operation,
      'payload': payload,
      'retry_count': retryCount,
      'last_error': lastError,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory SyncQueueItem.fromMap(Map<String, dynamic> map) {
    return SyncQueueItem(
      id: map['id'] as String,
      tableName: map['table_name'] as String,
      recordId: map['record_id'] as String,
      operation: map['operation'] as String,
      payload: map['payload'] as String,
      retryCount: map['retry_count'] as int? ?? 0,
      lastError: map['last_error'] as String?,
      createdAt: DateTime.parse(map['created_at'] as String),
    );
  }
}

class SyncQueueDao {
  final AppDatabase _appDatabase;

  SyncQueueDao({AppDatabase? appDatabase})
      : _appDatabase = appDatabase ?? AppDatabase.instance;

  Future<void> enqueue(SyncQueueItem item) async {
    final db = await _appDatabase.database;
    await db.insert(
      DatabaseConstants.tableSyncQueue,
      item.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<SyncQueueItem>> getPendingItems({int limit = 50}) async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableSyncQueue,
      orderBy: 'created_at ASC',
      limit: limit,
    );
    return results.map((map) => SyncQueueItem.fromMap(map)).toList();
  }

  Future<void> dequeue(String id) async {
    final db = await _appDatabase.database;
    await db.delete(
      DatabaseConstants.tableSyncQueue,
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<void> recordFailure(String id, String error) async {
    final db = await _appDatabase.database;
    await db.rawUpdate('''
      UPDATE ${DatabaseConstants.tableSyncQueue}
      SET retry_count = retry_count + 1, last_error = ?
      WHERE id = ?
    ''', [error, id]);
  }
}