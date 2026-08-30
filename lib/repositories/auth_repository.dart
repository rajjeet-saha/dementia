import 'dart:convert';
import 'package:uuid/uuid.dart';
import '../database/daos/sync_queue_dao.dart';
import '../database/daos/user_dao.dart';
import '../database/database_constants.dart';
import '../models/user_profile.dart';
import '../services/supabase_service.dart';
import '../utils/id_generator.dart';

class AuthRepository {
  final UserDao _userDao;
  final SyncQueueDao _syncQueueDao;
  final SupabaseService _supabaseService;
  static const _uuid = Uuid();

  AuthRepository({
    UserDao? userDao,
    SyncQueueDao? syncQueueDao,
    SupabaseService? supabaseService,
  })  : _userDao = userDao ?? UserDao(),
        _syncQueueDao = syncQueueDao ?? SyncQueueDao(),
        _supabaseService = supabaseService ?? SupabaseService.instance;

  Future<UserProfile?> getCurrentUser() async {
    return await _userDao.getCurrentUser();
  }

  Future<UserProfile> signUp({
    required String name,
    required String email,
    required String password,
    String? phoneNumber,
    required String role,
    required String preferredLanguage,
  }) async {
    final String localId = _uuid.v4();
    final String publicUserId = IdGenerator.generatePatientId();
    final now = DateTime.now();

    String syncStatus = 'pending';
    String assignedId = localId;

    // 1. Attempt Supabase Auth if cloud is initialized and reachable
    if (_supabaseService.isInitialized) {
      try {
        final client = _supabaseService.client;
        if (client != null) {
          final authResponse = await client.auth.signUp(
            email: email,
            password: password,
          );

          if (authResponse.user != null) {
            assignedId = authResponse.user!.id;
            syncStatus = 'synced';

            // Insert initial cloud profile mirror
            await client.from('profiles').insert({
              'id': assignedId,
              'public_user_id': publicUserId,
              'name': name,
              'phone_number': phoneNumber,
              'role': role,
              'preferred_language': preferredLanguage,
              'created_at': now.toIso8601String(),
              'updated_at': now.toIso8601String(),
            });
          }
        }
      } catch (e) {
        // ADD THIS PRINT STATEMENT
        print('🚨 CLOUD SIGNUP REJECTED: $e');

        // Continue offline: record will be pushed automatically during background sync
        syncStatus = 'pending';
      }
    }

    final profile = UserProfile(
      id: assignedId,
      publicUserId: publicUserId,
      name: name,
      phoneNumber: phoneNumber,
      role: role,
      preferredLanguage: preferredLanguage,
      createdAt: now,
      updatedAt: now,
      syncStatus: syncStatus,
    );

    // 2. Persist to local SQLite
    await _userDao.insertUser(profile);

    // 3. If offline, stage in Sync Outbox Queue
    if (syncStatus == 'pending') {
      await _syncQueueDao.enqueue(
        SyncQueueItem(
          id: _uuid.v4(),
          tableName: DatabaseConstants.tableUser,
          recordId: profile.id,
          operation: 'INSERT',
          payload: jsonEncode(profile.toMap()),
          createdAt: now,
        ),
      );
    }

    return profile;
  }

  Future<UserProfile?> signIn({
    required String email,
    required String password,
  }) async {
    // Check local database first
    final localUser = await _userDao.getCurrentUser();

    if (_supabaseService.isInitialized) {
      try {
        final client = _supabaseService.client;
        if (client != null) {
          final authResponse = await client.auth.signInWithPassword(
            email: email,
            password: password,
          );

          if (authResponse.user != null) {
            final profileData = await client
                .from('profiles')
                .select()
                .eq('id', authResponse.user!.id)
                .maybeSingle();

            if (profileData != null) {
              final cloudProfile = UserProfile.fromMap(profileData);
              await _userDao.insertUser(cloudProfile);
              return cloudProfile;
            } else {
              print('🚨 LOGIN ERROR: User authenticated, but no profile found in "profiles" table.');
            }
          }
        }
      } catch (e) {
        // THIS WILL TELL US EXACTLY WHAT IS WRONG
        print('🚨 SUPABASE LOGIN REJECTED: $e');

        // If network fails, return cached local session
        if (localUser != null) return localUser;
        rethrow;
      }
    }

    return localUser;
  }

  Future<void> signOut() async {
    if (_supabaseService.isInitialized) {
      try {
        await _supabaseService.client?.auth.signOut();
      } catch (_) {}
    }
    await _userDao.clearUser();
  }
}