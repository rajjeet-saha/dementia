import 'dart:convert';
import 'package:uuid/uuid.dart';
import '../database/daos/reminder_dao.dart';
import '../database/daos/sync_queue_dao.dart';
import '../database/database_constants.dart';
import '../models/reminder.dart';

class ReminderRepository {
  final ReminderDao _reminderDao;
  final SyncQueueDao _syncQueueDao;
  static const _uuid = Uuid();

  ReminderRepository({
    ReminderDao? reminderDao,
    SyncQueueDao? syncQueueDao,
  })  : _reminderDao = reminderDao ?? ReminderDao(),
        _syncQueueDao = syncQueueDao ?? SyncQueueDao();

  Future<void> addReminder(Reminder reminder) async {
    // 1. Write to local SQLite
    await _reminderDao.insertReminder(reminder);

    // 2. Stage to Outbox Queue
    await _syncQueueDao.enqueue(
      SyncQueueItem(
        id: _uuid.v4(),
        tableName: DatabaseConstants.tableReminders,
        recordId: reminder.id,
        operation: 'INSERT',
        payload: jsonEncode(reminder.toMap()),
        createdAt: DateTime.now(),
      ),
    );
  }

  Future<List<Reminder>> getActiveReminders(String userId) async {
    return await _reminderDao.getActiveReminders(userId);
  }

  Future<void> deleteReminder(String id) async {
    await _reminderDao.deleteReminder(id);

    await _syncQueueDao.enqueue(
      SyncQueueItem(
        id: _uuid.v4(),
        tableName: DatabaseConstants.tableReminders,
        recordId: id,
        operation: 'DELETE',
        payload: jsonEncode({'id': id}),
        createdAt: DateTime.now(),
      ),
    );
  }
}