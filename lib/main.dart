import 'package:flutter/material.dart';
import 'accessibility/accessibility_controller.dart';
import 'app/app.dart';
import 'database/app_database.dart';
import 'services/supabase_service.dart';
import 'services/notification_service.dart';
import 'sync/sync_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize SQLite database
  await AppDatabase.instance.database;

  // Initialize Notifications
  await NotificationService.instance.initialize();

  // Initialize Supabase client
  await SupabaseService.instance.initialize();

  // Start the background Sync Engine
  SyncManager.instance.initialize();

  final accessibilityController = AccessibilityController();

  runApp(Redler(accessibilityController: accessibilityController));
}