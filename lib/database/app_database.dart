import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'database_constants.dart';

class AppDatabase {
  static final AppDatabase instance = AppDatabase._init();
  static Database? _database;

  AppDatabase._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB(DatabaseConstants.databaseName);
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: DatabaseConstants.databaseVersion,
      onCreate: _createDB,
    );
  }

  Future<void> _createDB(Database db, int version) async {
    // 1. User Profile Table
    await db.execute('''
      CREATE TABLE ${DatabaseConstants.tableUser} (
        id TEXT PRIMARY KEY,
        public_user_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        phone_number TEXT,
        role TEXT NOT NULL,
        preferred_language TEXT NOT NULL,
        font_size_preference TEXT NOT NULL,
        font_family_preference TEXT NOT NULL,
        high_contrast_enabled INTEGER NOT NULL,
        voice_assistant_enabled INTEGER NOT NULL,
        voice_speed REAL NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        sync_status TEXT NOT NULL
      )
    ''');

    // 2. Game Results Table
    await db.execute('''
      CREATE TABLE ${DatabaseConstants.tableGameResults} (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        game_id TEXT NOT NULL,
        game_type TEXT NOT NULL,
        difficulty_level INTEGER NOT NULL,
        score INTEGER NOT NULL,
        accuracy REAL NOT NULL,
        response_time_ms INTEGER NOT NULL,
        mistakes_count INTEGER NOT NULL,
        hints_used INTEGER NOT NULL,
        attempts_count INTEGER NOT NULL,
        played_at TEXT NOT NULL,
        sync_status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ${DatabaseConstants.tableUser} (id) ON DELETE CASCADE
      )
    ''');

    // 3. Reminders Table
    await db.execute('''
      CREATE TABLE ${DatabaseConstants.tableReminders} (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        instructions TEXT,
        scheduled_time TEXT NOT NULL,
        scheduled_date TEXT,
        recurrence TEXT NOT NULL,
        is_active INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        sync_status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ${DatabaseConstants.tableUser} (id) ON DELETE CASCADE
      )
    ''');

    // 4. Caregiver Alerts Table
    await db.execute('''
      CREATE TABLE ${DatabaseConstants.tableAlerts} (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        alert_type TEXT NOT NULL,
        category TEXT NOT NULL,
        severity TEXT NOT NULL,
        message TEXT NOT NULL,
        baseline_value REAL,
        current_value REAL,
        created_at TEXT NOT NULL,
        sync_status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES ${DatabaseConstants.tableUser} (id) ON DELETE CASCADE
      )
    ''');

    // 5. Sync Queue (Outbox Pattern)
    await db.execute('''
      CREATE TABLE ${DatabaseConstants.tableSyncQueue} (
        id TEXT PRIMARY KEY,
        table_name TEXT NOT NULL,
        record_id TEXT NOT NULL,
        operation TEXT NOT NULL,
        payload TEXT NOT NULL,
        retry_count INTEGER NOT NULL DEFAULT 0,
        last_error TEXT,
        created_at TEXT NOT NULL
      )
    ''');

    // Indexes for high performance query resolution
    await db.execute('CREATE INDEX idx_game_results_sync ON ${DatabaseConstants.tableGameResults}(sync_status);');
    await db.execute('CREATE INDEX idx_reminders_sync ON ${DatabaseConstants.tableReminders}(sync_status);');
    await db.execute('CREATE INDEX idx_alerts_sync ON ${DatabaseConstants.tableAlerts}(sync_status);');
  }

  Future<void> close() async {
    final db = await instance.database;
    db.close();
  }
}