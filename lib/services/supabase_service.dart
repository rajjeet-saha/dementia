import 'package:supabase_flutter/supabase_flutter.dart';
import '../app/app_config.dart';

class SupabaseService {
  static final SupabaseService instance = SupabaseService._init();
  bool _isInitialized = false;

  SupabaseService._init();

  bool get isInitialized => _isInitialized;

  Future<void> initialize() async {
    if (_isInitialized) return;

    try {
      await Supabase.initialize(
        url: AppConfig.supabaseUrl,
        anonKey: AppConfig.supabaseAnonKey,
      );
      _isInitialized = true;
      print('✅ Supabase Initialized Successfully!');
    } catch (e) {
      print('🚨 Supabase Init Error: $e');
      _isInitialized = false;
    }
  }

  SupabaseClient? get client {
    if (!_isInitialized) return null;
    return Supabase.instance.client;
  }
}