import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../widgets/accessible_text.dart';
import '../../widgets/cultural_background.dart';

class UserProgressScreen extends StatelessWidget {
  final AccessibilityController accessibilityController;

  const UserProgressScreen({
    super.key,
    required this.accessibilityController,
  });

  Widget _buildStatCard(String label, String value, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.85),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.3), width: 2),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 4),
          )
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 32, color: color),
          const SizedBox(height: 8),
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
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(
          loc?.translate('my_progress') ?? 'My Progress',
          style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: theme.colorScheme.primary),
        actions: [
          IconButton(
            icon: const Icon(Icons.contrast_rounded),
            color: theme.colorScheme.primary,
            onPressed: () {
              accessibilityController.toggleHighContrast(
                !accessibilityController.isHighContrast,
              );
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: CulturalBackground(
        imageAsset: 'farmers.png', // Uses the Farmers asset
        imageAlignment: Alignment.bottomLeft,
        imageOpacity: 0.35,
        imageWidth: 280,
        imageHeight: 280,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 100), // Space for AppBar
              AccessibleText(
                loc?.translate('my_progress_desc') ?? 'View your recent activity',
                baseFontSize: 18,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(height: 32),

              // Overview Stats Grid
              GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                children: [
                  _buildStatCard('Memory', 'Good', const Color(0xFF138808), Icons.psychology_rounded),
                  _buildStatCard('Accuracy', '94%', const Color(0xFFFF9933), Icons.check_circle_outline_rounded),
                  _buildStatCard('Games', '12', theme.colorScheme.primary, Icons.videogame_asset_rounded),
                  _buildStatCard('Streak', '3 Days', Colors.purple, Icons.local_fire_department_rounded),
                ],
              ),

              const SizedBox(height: 40),

              // Recent Activity placeholder
              AccessibleText(
                'Recent Activity',
                baseFontSize: 22,
                fontWeight: FontWeight.bold,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(height: 16),

              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.7),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Center(
                    child: Text('Play more games to see detailed history!'),
                  ),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}