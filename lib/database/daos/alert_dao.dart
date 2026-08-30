import 'package:sqflite/sqflite.dart';
import '../../models/caregiver_alert.dart';
import '../app_database.dart';
import '../database_constants.dart';

class AlertDao {
  final AppDatabase _appDatabase;

  AlertDao({AppDatabase? appDatabase})
      : _appDatabase = appDatabase ?? AppDatabase.instance;

  Future<void> insertAlert(CaregiverAlert alert) async {
    final db = await _appDatabase.database;
    await db.insert(
      DatabaseConstants.tableAlerts,
      alert.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<CaregiverAlert>> getAlertsForUser(String userId) async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableAlerts,
      where: 'user_id = ?',
      whereArgs: [userId],
      orderBy: 'created_at DESC',
    );
    return results.map((map) => CaregiverAlert.fromMap(map)).toList();
  }

  Future<List<CaregiverAlert>> getPendingSyncAlerts() async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableAlerts,
      where: 'sync_status = ?',
      whereArgs: ['pending'],
    );
    return results.map((map) => CaregiverAlert.fromMap(map)).toList();
  }

  Future<void> markAsSynced(String id) async {
    final db = await _appDatabase.database;
    await db.update(
      DatabaseConstants.tableAlerts,
      {'sync_status': 'synced'},
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}