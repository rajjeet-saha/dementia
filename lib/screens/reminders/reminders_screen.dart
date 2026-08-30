import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../models/reminder.dart';
import '../../repositories/reminder_repository.dart';
import '../../repositories/auth_repository.dart';
import '../../services/notification_service.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';
import '../../app/routes.dart';

class RemindersScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const RemindersScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<RemindersScreen> createState() => _RemindersScreenState();
}

class _RemindersScreenState extends State<RemindersScreen> {
  final ReminderRepository _reminderRepo = ReminderRepository();
  final AuthRepository _authRepo = AuthRepository();
  List<Reminder> _reminders = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadReminders();
  }

  Future<void> _loadReminders() async {
    final user = await _authRepo.getCurrentUser();
    if (user != null) {
      final reminders = await _reminderRepo.getActiveReminders(user.id);
      if (mounted) {
        setState(() {
          _reminders = reminders;
          _isLoading = false;
        });
      }
    } else {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _deleteReminder(Reminder reminder) async {
    await _reminderRepo.deleteReminder(reminder.id);
    // Cancel the local notification using a hash of the ID
    await NotificationService.instance.cancelReminder(reminder.id.hashCode);
    _loadReminders();
  }

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case 'medicine': return Icons.medication_rounded;
      case 'hydration': return Icons.water_drop_rounded;
      case 'appointment': return Icons.calendar_month_rounded;
      default: return Icons.notifications_active_rounded;
    }
  }

  Color _getCategoryColor(String category, ColorScheme colorScheme) {
    switch (category) {
      case 'medicine': return Colors.red.shade400;
      case 'hydration': return Colors.blue.shade400;
      case 'appointment': return Colors.purple.shade400;
      default: return colorScheme.primary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(loc?.translate('reminders') ?? 'Reminders'),
      ),
      body: SafeArea(
        child: _isLoading
            ? const Center(child: CircularProgressIndicator(strokeWidth: 4))
            : _reminders.isEmpty
            ? Center(
          child: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.alarm_off_rounded, size: 80, color: theme.colorScheme.outlineVariant),
                const SizedBox(height: 24),
                AccessibleText(
                  loc?.translate('no_reminders') ?? 'No active reminders.',
                  baseFontSize: 22,
                  textAlign: TextAlign.center,
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ],
            ),
          ),
        )
            : ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: _reminders.length,
          itemBuilder: (context, index) {
            final reminder = _reminders[index];
            return Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: theme.colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(20),
              ),
              child: ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                leading: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.surface,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    _getCategoryIcon(reminder.category),
                    size: 32,
                    color: _getCategoryColor(reminder.category, theme.colorScheme),
                  ),
                ),
                title: AccessibleText(
                  reminder.title,
                  baseFontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 8),
                    AccessibleText(
                      reminder.scheduledTime, // Format: HH:mm AM/PM
                      baseFontSize: 20,
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.bold,
                    ),
                    if (reminder.instructions != null && reminder.instructions!.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      AccessibleText(
                        reminder.instructions!,
                        baseFontSize: 16,
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ]
                  ],
                ),
                trailing: IconButton(
                  icon: const Icon(Icons.delete_outline_rounded, size: 32),
                  color: theme.colorScheme.error,
                  onPressed: () => _deleteReminder(reminder),
                ),
              ),
            );
          },
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(24.0),
        child: AccessibleButton(
          label: loc?.translate('add_reminder') ?? 'Add New Reminder',
          icon: Icons.add_alarm_rounded,
          onPressed: () async {
            await Navigator.pushNamed(context, AppRoutes.addReminder);
            _loadReminders(); // Refresh list when returning
          },
        ),
      ),
    );
  }
}