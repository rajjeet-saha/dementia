import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../models/cognitive_profile.dart';
import '../../models/game_result.dart';
import '../../models/user_profile.dart';
import '../../repositories/auth_repository.dart';
import '../../services/supabase_service.dart';
import '../../ml/cognitive_trend_analyzer.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';
import '../../app/routes.dart';

class CaregiverPortalScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const CaregiverPortalScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<CaregiverPortalScreen> createState() => _CaregiverPortalScreenState();
}

class _CaregiverPortalScreenState extends State<CaregiverPortalScreen> {
  final _searchController = TextEditingController();
  final _authRepository = AuthRepository();

  bool _isLoading = false;
  String? _errorMessage;

  UserProfile? _patientProfile;
  List<GameResult> _patientHistory = [];
  CognitiveProfile? _patientAnalytics;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _handleLogout() async {
    await _authRepository.signOut();
    if (mounted) {
      Navigator.pushNamedAndRemoveUntil(context, AppRoutes.login, (route) => false);
    }
  }

  Future<void> _searchPatient() async {
    final queryId = _searchController.text.trim().toUpperCase();
    if (queryId.isEmpty) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _patientProfile = null;
      _patientAnalytics = null;
      _patientHistory = [];
    });

    try {
      final client = SupabaseService.instance.client;
      if (client == null) throw Exception("Cloud connection not ready.");

      // 1. Find the user by their Public ID (e.g., NER-XXXXXX)
      final profileData = await client
          .from('profiles')
          .select()
          .eq('public_user_id', queryId)
          .maybeSingle();

      if (profileData == null) {
        setState(() {
          _errorMessage = "No user found with ID: $queryId";
          _isLoading = false;
        });
        return;
      }

      final profile = UserProfile.fromMap(profileData);

      // 2. Fetch their synchronized game history
      final gamesData = await client
          .from('game_results')
          .select()
          .eq('user_id', profile.id)
          .order('played_at', ascending: false)
          .limit(50);

      final history = gamesData.map((data) => GameResult.fromMap(data)).toList();

      // 3. Run the analytical engine on the fetched data
      final analytics = CognitiveTrendAnalyzer.analyzeProgress(history);

      setState(() {
        _patientProfile = profile;
        _patientHistory = history;
        _patientAnalytics = analytics;
        _isLoading = false;
      });

    } catch (e) {
      setState(() {
        _errorMessage = "Failed to load data. Ensure you have internet access.";
        _isLoading = false;
      });
      print('Search Error: $e');
    }
  }

  Widget _buildStatCard(String label, String value, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Column(
        children: [
          AccessibleText(
            value,
            baseFontSize: 28,
            fontWeight: FontWeight.w900,
            color: color,
          ),
          const SizedBox(height: 4),
          AccessibleText(
            label,
            baseFontSize: 14,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(loc?.translate('caregiver_portal') ?? 'Care Partner Portal'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_rounded),
            onPressed: _handleLogout,
            tooltip: loc?.translate('sign_out') ?? 'Sign Out',
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Bar Section
            Container(
              padding: const EdgeInsets.all(24.0),
              color: theme.colorScheme.surface,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  AccessibleText(
                    'Look up a user to view their cloud-synchronized activity.',
                    baseFontSize: 16,
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _searchController,
                          textCapitalization: TextCapitalization.characters,
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                          decoration: InputDecoration(
                            hintText: 'e.g., NER-7K42P9',
                            prefixIcon: const Icon(Icons.search_rounded),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          onSubmitted: (_) => _searchPatient(),
                        ),
                      ),
                      const SizedBox(width: 12),
                      ElevatedButton(
                        onPressed: _isLoading ? null : _searchPatient,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.all(16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: _isLoading
                            ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2))
                            : const Icon(Icons.arrow_forward_rounded, size: 28),
                      ),
                    ],
                  ),
                  if (_errorMessage != null) ...[
                    const SizedBox(height: 16),
                    AccessibleText(
                      _errorMessage!,
                      color: theme.colorScheme.error,
                      baseFontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ],
                ],
              ),
            ),

            const Divider(height: 1),

            // Patient Data Dashboard
            Expanded(
              child: _patientProfile == null && !_isLoading
                  ? Center(
                child: Icon(
                  Icons.monitor_heart_rounded,
                  size: 100,
                  color: theme.colorScheme.surfaceContainerHighest,
                ),
              )
                  : _isLoading
                  ? const SizedBox.shrink() // Loading indicator is in the button
                  : ListView(
                padding: const EdgeInsets.all(24),
                children: [
                  // Header
                  AccessibleText(
                    _patientProfile!.name,
                    baseFontSize: 32,
                    fontWeight: FontWeight.w900,
                  ),
                  AccessibleText(
                    'ID: ${_patientProfile!.publicUserId}',
                    baseFontSize: 18,
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.bold,
                  ),
                  const SizedBox(height: 32),

                  // Analytics Grid
                  if (_patientAnalytics != null) ...[
                    AccessibleText(
                      'Cognitive Overview',
                      baseFontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: _buildStatCard(
                            'Memory Score',
                            '${_patientAnalytics!.memoryScore.round()}%',
                            Colors.deepPurple,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _buildStatCard(
                            'Attention Score',
                            '${_patientAnalytics!.attentionScore.round()}%',
                            Colors.teal,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: _buildStatCard(
                            'Pattern Score',
                            '${_patientAnalytics!.patternScore.round()}%',
                            Colors.amber.shade900,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _buildStatCard(
                            'Games Played',
                            '${_patientHistory.length}',
                            theme.colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                  ],
                  const SizedBox(height: 32),

                  // Recent Activity List
                  AccessibleText(
                    'Recent Activity Logs',
                    baseFontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                  const SizedBox(height: 16),
                  if (_patientHistory.isEmpty)
                    const AccessibleText('No games played recently.')
                  else
                    ..._patientHistory.take(10).map((game) {
                      return ListTile(
                        contentPadding: EdgeInsets.zero,
                        leading: CircleAvatar(
                          backgroundColor: theme.colorScheme.surfaceContainerHighest,
                          child: Icon(Icons.videogame_asset_rounded, color: theme.colorScheme.primary),
                        ),
                        title: AccessibleText(game.gameType.toUpperCase(), fontWeight: FontWeight.bold),
                        subtitle: AccessibleText('Score: ${game.score} | Accuracy: ${(game.accuracy * 100).round()}%'),
                        trailing: AccessibleText(
                          '${game.playedAt.day}/${game.playedAt.month}',
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      );
                    }),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}