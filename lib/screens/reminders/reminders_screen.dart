import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../widgets/accessible_text.dart';
import '../../widgets/cultural_background.dart';

class RemindersScreen extends StatelessWidget {
  final AccessibilityController accessibilityController;

  const RemindersScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(
            loc?.translate('reminders') ?? 'Reminders',
            style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.bold)
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: theme.colorScheme.primary),
        actions: [
          IconButton(
            icon: const Icon(Icons.contrast_rounded),
            color: theme.colorScheme.primary,
            tooltip: loc?.translate('high_contrast') ?? 'Toggle High Contrast',
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
        // Image completely removed for this screen
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 80),
              AccessibleText(
                loc?.translate('reminders_desc') ?? 'Medicines, water, and appointments',
                baseFontSize: 18,
                color: theme.colorScheme.onSurfaceVariant,
              ),
              const SizedBox(height: 32),

              Expanded(
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.alarm_on_rounded,
                        size: 80,
                        color: theme.colorScheme.primary.withValues(alpha: 0.3),
                      ),
                      const SizedBox(height: 16),
                      AccessibleText(
                        loc?.translate('no_reminders') ?? 'No active reminders.',
                        baseFontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.primary,
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),

              ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Adding Reminders available in Full Version')),
                  );
                },
                icon: const Icon(Icons.add_rounded, size: 32),
                label: Text(
                  loc?.translate('add_reminder') ?? 'Add New Reminder',
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF138808), // Indian Green
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  elevation: 4,
                ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}