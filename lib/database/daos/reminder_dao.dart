import 'package:sqflite/sqflite.dart';
import '../../models/reminder.dart';
import '../app_database.dart';
import '../database_constants.dart';

class ReminderDao {
  final AppDatabase _appDatabase;

  ReminderDao({AppDatabase? appDatabase})
      : _appDatabase = appDatabase ?? AppDatabase.instance;

  Future<void> insertReminder(Reminder reminder) async {
    final db = await _appDatabase.database;
    await db.insert(
      DatabaseConstants.tableReminders,
      reminder.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<Reminder>> getActiveReminders(String userId) async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableReminders,
      where: 'user_id = ? AND is_active = 1',
      whereArgs: [userId],
      orderBy: 'scheduled_time ASC',
    );
    return results.map((map) => Reminder.fromMap(map)).toList();
  }

  Future<void> deleteReminder(String id) async {
    final db = await _appDatabase.database;
    await db.delete(
      DatabaseConstants.tableReminders,
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<List<Reminder>> getPendingSyncReminders() async {
    final db = await _appDatabase.database;
    final results = await db.query(
      DatabaseConstants.tableReminders,
      where: 'sync_status = ?',
      whereArgs: ['pending'],
    );
    return results.map((map) => Reminder.fromMap(map)).toList();
  }

  Future<void> markAsSynced(String id) async {
    final db = await _appDatabase.database;
    await db.update(
      DatabaseConstants.tableReminders,
      {'sync_status': 'synced'},
      where: 'id = ?',
      whereArgs: [id],
    );
  }
}