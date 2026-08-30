import 'package:sqflite/sqflite.dart';
import '../../models/user_profile.dart';
import '../app_database.dart';
import '../database_constants.dart';

class UserDao {
  final AppDatabase _appDatabase;

  UserDao({AppDatabase? appDatabase})
      : _appDatabase = appDatabase ?? AppDatabase.instance;

  Future<void> insertUser(UserProfile user) async {
    final db = await _appDatabase.database;
    await db.insert(
      DatabaseConstants.tableUser,
      user.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<UserProfile?> getCurrentUser() async {
    final db = await _appDatabase.database;
    final results = await db.query(DatabaseConstants.tableUser, limit: 1);
    if (results.isNotEmpty) {
      return UserProfile.fromMap(results.first);
    }
    return null;
  }

  Future<void> updateUser(UserProfile user) async {
    final db = await _appDatabase.database;
    await db.update(
      DatabaseConstants.tableUser,
      user.toMap(),
      where: 'id = ?',
      whereArgs: [user.id],
    );
  }

  Future<void> clearUser() async {
    final db = await _appDatabase.database;
    await db.delete(DatabaseConstants.tableUser);
  }
}