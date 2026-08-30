import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../models/reminder.dart';
import '../../repositories/reminder_repository.dart';
import '../../repositories/auth_repository.dart';
import '../../services/notification_service.dart';
import '../../utils/date_formatter.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';

class AddReminderScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const AddReminderScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<AddReminderScreen> createState() => _AddReminderScreenState();
}

class _AddReminderScreenState extends State<AddReminderScreen> {
  final _titleController = TextEditingController();
  final _instructionsController = TextEditingController();
  final _reminderRepo = ReminderRepository();
  final _authRepo = AuthRepository();

  String _selectedCategory = 'medicine';
  TimeOfDay _selectedTime = TimeOfDay.now();
  bool _isSaving = false;

  @override
  void dispose() {
    _titleController.dispose();
    _instructionsController.dispose();
    super.dispose();
  }

  Future<void> _pickTime() async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: _selectedTime,
      builder: (context, child) {
        return MediaQuery(
          // Ensure time picker uses accessibility scaling
          data: MediaQuery.of(context).copyWith(
            textScaler: TextScaler.linear(widget.accessibilityController.textScaleFactor),
          ),
          child: child!,
        );
      },
    );
    if (picked != null && mounted) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  Future<void> _saveReminder() async {
    if (_titleController.text.trim().isEmpty) return;

    setState(() => _isSaving = true);

    try {
      final user = await _authRepo.getCurrentUser();
      if (user == null) return;

      final now = DateTime.now();
      final scheduledDateTime = DateTime(
          now.year, now.month, now.day, _selectedTime.hour, _selectedTime.minute
      );

      final formattedTime = DateFormatter.formatTime12Hour(_selectedTime.hour, _selectedTime.minute);
      final uuid = const Uuid().v4();

      final reminder = Reminder(
        id: uuid,
        userId: user.id,
        title: _titleController.text.trim(),
        category: _selectedCategory,
        instructions: _instructionsController.text.trim(),
        scheduledTime: formattedTime,
        createdAt: now,
      );

      // Save locally & queue for cloud sync
      await _reminderRepo.addReminder(reminder);

      // Schedule offline local notification
      await NotificationService.instance.scheduleReminder(
        id: uuid.hashCode,
        title: 'Time for: ${reminder.title}',
        body: reminder.instructions?.isNotEmpty == true ? reminder.instructions! : 'Open Sahayata for details',
        scheduledTime: scheduledDateTime,
      );

      if (mounted) Navigator.pop(context);

    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('New Reminder'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const AccessibleText('What do you want to be reminded about?', baseFontSize: 20, fontWeight: FontWeight.bold),
              const SizedBox(height: 12),
              TextField(
                controller: _titleController,
                style: const TextStyle(fontSize: 22),
                decoration: InputDecoration(
                  hintText: 'e.g., Blood Pressure Pill',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 24),

              const AccessibleText('Category', baseFontSize: 20, fontWeight: FontWeight.bold),
              const SizedBox(height: 12),
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(value: 'medicine', icon: Icon(Icons.medication_rounded, size: 28)),
                  ButtonSegment(value: 'hydration', icon: Icon(Icons.water_drop_rounded, size: 28)),
                  ButtonSegment(value: 'appointment', icon: Icon(Icons.calendar_month_rounded, size: 28)),
                ],
                selected: {_selectedCategory},
                onSelectionChanged: (Set<String> newSelection) {
                  setState(() => _selectedCategory = newSelection.first);
                },
              ),
              const SizedBox(height: 24),

              const AccessibleText('Time', baseFontSize: 20, fontWeight: FontWeight.bold),
              const SizedBox(height: 12),
              InkWell(
                onTap: _pickTime,
                borderRadius: BorderRadius.circular(16),
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    border: Border.all(color: theme.colorScheme.primary, width: 2),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      AccessibleText(
                        DateFormatter.formatTime12Hour(_selectedTime.hour, _selectedTime.minute),
                        baseFontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.primary,
                      ),
                      Icon(Icons.access_time_filled_rounded, size: 36, color: theme.colorScheme.primary),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              const AccessibleText('Extra Instructions (Optional)', baseFontSize: 20, fontWeight: FontWeight.bold),
              const SizedBox(height: 12),
              TextField(
                controller: _instructionsController,
                maxLines: 3,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  hintText: 'e.g., Take after eating food',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 40),

              _isSaving
                  ? const Center(child: CircularProgressIndicator(strokeWidth: 4))
                  : AccessibleButton(
                label: 'Save Reminder',
                icon: Icons.check_circle_rounded,
                onPressed: _saveReminder,
              ),
            ],
          ),
        ),
      ),
    );
  }
}