import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../widgets/accessible_card.dart';
import '../../app/routes.dart';

class GamesMenuScreen extends StatelessWidget {
  final AccessibilityController accessibilityController;

  const GamesMenuScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(loc?.translate('play_games') ?? 'Cognitive Games'),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 8),
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                'Select a game to train your memory and attention.',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ),
            const SizedBox(height: 16),
            AccessibleCard(
              icon: Icons.grid_view_rounded,
              iconColor: Colors.deepOrange,
              title: 'Memory Match',
              description: 'Match familiar local objects to test your memory.',
              onTap: () {
                Navigator.pushNamed(context, AppRoutes.gamePlay, arguments: 'memory');
              },
            ),
            AccessibleCard(
              icon: Icons.pattern_rounded,
              iconColor: Colors.indigo,
              title: 'Pattern Recognition',
              description: 'Find the next item in the sequence.',
              onTap: () {
                Navigator.pushNamed(context, AppRoutes.gamePlay, arguments: 'pattern');
              },
            ),
            AccessibleCard(
              icon: Icons.lightbulb_rounded,
              iconColor: Colors.amber.shade700,
              title: 'Object Recognition',
              description: 'Identify common household and cultural items.',
              onTap: () {
                Navigator.pushNamed(context, AppRoutes.gamePlay, arguments: 'recognition');
              },
            ),
            AccessibleCard(
              icon: Icons.emoji_emotions_rounded,
              iconColor: Colors.pink.shade400,
              title: 'Emotion Recognition',
              description: 'Identify feelings from facial expressions.',
              onTap: () {
                Navigator.pushNamed(context, AppRoutes.gamePlay, arguments: 'emotion');
              },
            ),
          ],
        ),
      ),
    );
  }
}