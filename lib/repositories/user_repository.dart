import 'dart:convert';
import 'package:uuid/uuid.dart';
import '../database/daos/sync_queue_dao.dart';
import '../database/daos/user_dao.dart';
import '../database/database_constants.dart';
import '../models/user_profile.dart';

class UserRepository {
  final UserDao _userDao;
  final SyncQueueDao _syncQueueDao;
  static const _uuid = Uuid();

  UserRepository({
    UserDao? userDao,
    SyncQueueDao? syncQueueDao,
  })  : _userDao = userDao ?? UserDao(),
        _syncQueueDao = syncQueueDao ?? SyncQueueDao();

  Future<UserProfile?> getProfile() async {
    return await _userDao.getCurrentUser();
  }

  Future<void> updateSettings({
    required String fontSize,
    required String fontFamily,
    required bool highContrast,
    required String language,
  }) async {
    final current = await _userDao.getCurrentUser();
    if (current == null) return;

    final updated = current.copyWith(
      fontSizePreference: fontSize,
      fontFamilyPreference: fontFamily,
      highContrastEnabled: highContrast,
      preferredLanguage: language,
      updatedAt: DateTime.now(),
      syncStatus: 'pending',
    );

    await _userDao.updateUser(updated);

    // Queue update for cloud synchronization
    await _syncQueueDao.enqueue(
      SyncQueueItem(
        id: _uuid.v4(),
        tableName: DatabaseConstants.tableUser,
        recordId: updated.id,
        operation: 'UPDATE',
        payload: jsonEncode(updated.toMap()),
        createdAt: DateTime.now(),
      ),
    );
  }
}