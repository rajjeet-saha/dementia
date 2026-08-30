import 'dart:convert';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../database/daos/sync_queue_dao.dart';
import '../database/database_constants.dart';
import '../services/supabase_service.dart';

class SyncManager {
  static final SyncManager instance = SyncManager._init();

  final SyncQueueDao _syncQueueDao = SyncQueueDao();
  final Connectivity _connectivity = Connectivity();

  bool _isSyncing = false;

  SyncManager._init();

  /// Starts listening to network changes to trigger automatic syncs
  void initialize() {
    _connectivity.onConnectivityChanged.listen((List<ConnectivityResult> results) {
      if (results.contains(ConnectivityResult.mobile) ||
          results.contains(ConnectivityResult.wifi)) {
        triggerSync();
      }
    });

    // Attempt an initial sync on startup just in case
    triggerSync();
  }

  /// Manually trigger a sync cycle
  /// Manually trigger a sync cycle
  Future<void> triggerSync() async {
    print('--- 🔄 SYNC MANAGER WAKING UP ---');

    if (_isSyncing) {
      print('⏳ Status: Already syncing, returning early.');
      return;
    }

    if (!SupabaseService.instance.isInitialized) {
      print('❌ Status: Supabase is NOT initialized. Check app_config.dart credentials!');
      return;
    }

    final client = SupabaseService.instance.client;
    if (client == null) {
      print('❌ Status: Supabase client is null.');
      return;
    }

    _isSyncing = true;
    print('✅ Status: Connected to Supabase. Checking local SQLite queue...');

    try {
      final pendingItems = await _syncQueueDao.getPendingItems(limit: 20);
      print('📦 Status: Found ${pendingItems.length} items waiting to sync.');

      if (pendingItems.isEmpty) {
        _isSyncing = false;
        return;
      }

      for (final item in pendingItems) {
        bool success = false;
        print('⚙️ Processing item: ${item.operation} on table: ${item.tableName}');

        try {
          final payload = jsonDecode(item.payload) as Map<String, dynamic>;

          String cloudTable = item.tableName;
          if (cloudTable == DatabaseConstants.tableUser) {
            cloudTable = 'profiles';
          }

          payload.remove('sync_status');

          if (item.operation == 'INSERT') {
            await client.from(cloudTable).insert(payload);
            success = true;
            print('✅ SUCCESS: Uploaded to $cloudTable!');
          }
          else if (item.operation == 'UPDATE') {
            await client.from(cloudTable).update(payload).eq('id', item.recordId);
            success = true;
            print('✅ SUCCESS: Updated $cloudTable!');
          }
          else if (item.operation == 'DELETE') {
            await client.from(cloudTable).delete().eq('id', item.recordId);
            success = true;
            print('✅ SUCCESS: Deleted from $cloudTable!');
          }

        } catch (e) {
          print('🚨 SUPABASE UPLOAD ERROR on ${item.tableName}: $e');
          await _syncQueueDao.recordFailure(item.id, e.toString());
        }

        if (success) {
          await _syncQueueDao.dequeue(item.id);
        }
      }
    } catch (e) {
      print('🚨 FATAL QUEUE ERROR: $e');
    } finally {
      _isSyncing = false;

      final moreItems = await _syncQueueDao.getPendingItems(limit: 1);
      if (moreItems.isNotEmpty) {
        print('🔄 More items found, triggering next batch...');
        triggerSync();
      } else {
        print('😴 Sync Manager finished and going back to sleep.');
      }
    }
  }
}