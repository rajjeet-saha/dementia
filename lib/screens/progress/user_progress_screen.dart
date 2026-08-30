import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../ml/cognitive_trend_analyzer.dart';
import '../../models/cognitive_profile.dart';
import '../../models/game_result.dart';
import '../../repositories/auth_repository.dart';
import '../../repositories/game_repository.dart';
import '../../widgets/accessible_text.dart';

class UserProgressScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const UserProgressScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<UserProgressScreen> createState() => _UserProgressScreenState();
}

class _UserProgressScreenState extends State<UserProgressScreen> {
  final GameRepository _gameRepo = GameRepository();
  final AuthRepository _authRepo = AuthRepository();

  CognitiveProfile? _profile;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadProgress();
  }

  Future<void> _loadProgress() async {
    final user = await _authRepo.getCurrentUser();
    if (user != null) {
      final List<GameResult> history = await _gameRepo.getHistory(user.id, limit: 50);
      final profile = CognitiveTrendAnalyzer.analyzeProgress(history);
      if (mounted) {
        setState(() {
          _profile = profile;
          _isLoading = false;
        });
      }
    } else {
      if (mounted) {
        setState(() {
          _profile = CognitiveProfile.initial();
          _isLoading = false;
        });
      }
    }
  }

  String _getEmojiForScore(double score) {
    if (score >= 80) return '😊';
    if (score >= 60) return '🙂';
    return '💪';
  }

  String _getStatusText(double score) {
    if (score >= 80) return 'Great';
    if (score >= 60) return 'Good';
    return 'Keep Practicing';
  }

  Widget _buildCategoryCard({
    required BuildContext context,
    required String title,
    required double score,
    required IconData icon,
    required Color color,
  }) {
    final theme = Theme.of(context);
    final emoji = _getEmojiForScore(score);
    final status = _getStatusText(score);

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: theme.colorScheme.outlineVariant.withValues(alpha: 0.5),
        ),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, size: 36, color: color),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AccessibleText(
                  title,
                  baseFontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
                const SizedBox(height: 4),
                AccessibleText(
                  status,
                  baseFontSize: 16,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ],
            ),
          ),
          Text(
            emoji,
            style: const TextStyle(fontSize: 36),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final loc = AppLocalizations.of(context);
    final profile = _profile ?? CognitiveProfile.initial();

    return Scaffold(
      appBar: AppBar(
        title: Text(loc?.translate('my_progress') ?? 'My Progress'),
      ),
      body: SafeArea(
        child: _isLoading
            ? const Center(child: CircularProgressIndicator(strokeWidth: 4))
            : ListView(
          padding: const EdgeInsets.all(20),
          children: [
            // Overall Weekly Encouragement Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer,
                borderRadius: BorderRadius.circular(24),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      AccessibleText(
                        'Overall Status',
                        baseFontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.onPrimaryContainer,
                      ),
                      Row(
                        children: List.generate(5, (index) {
                          final starVal = index + 1;
                          return Icon(
                            starVal <= profile.overallRating.round()
                                ? Icons.star_rounded
                                : Icons.star_outline_rounded,
                            color: Colors.amber.shade700,
                            size: 28,
                          );
                        }),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  AccessibleText(
                    'Great work this week!',
                    baseFontSize: 26,
                    fontWeight: FontWeight.w900,
                    color: theme.colorScheme.onPrimaryContainer,
                  ),
                  const SizedBox(height: 6),
                  AccessibleText(
                    'Total exercises completed: ${profile.totalGamesPlayed}',
                    baseFontSize: 16,
                    color: theme.colorScheme.onPrimaryContainer.withValues(alpha: 0.8),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            AccessibleText(
              'Activity Areas',
              baseFontSize: 22,
              fontWeight: FontWeight.bold,
              color: theme.colorScheme.primary,
            ),
            const SizedBox(height: 12),

            _buildCategoryCard(
              context: context,
              title: 'Memory',
              score: profile.memoryScore,
              icon: Icons.psychology_rounded,
              color: Colors.deepPurple,
            ),
            _buildCategoryCard(
              context: context,
              title: 'Attention',
              score: profile.attentionScore,
              icon: Icons.visibility_rounded,
              color: Colors.teal,
            ),
            _buildCategoryCard(
              context: context,
              title: 'Pattern & Shapes',
              score: profile.patternScore,
              icon: Icons.shape_line_rounded,
              color: Colors.amber.shade900,
            ),
          ],
        ),
      ),
    );
  }
}