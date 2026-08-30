class Reminder {
  final String id;
  final String userId;
  final String title;
  final String category; // 'medicine', 'hydration', 'appointment', 'activity'
  final String? instructions;
  final String scheduledTime; // HH:mm format
  final String? scheduledDate; // YYYY-MM-DD for single events
  final String recurrence; // 'once', 'daily', 'weekly'
  final bool isActive;
  final DateTime createdAt;
  final String syncStatus;

  Reminder({
    required this.id,
    required this.userId,
    required this.title,
    required this.category,
    this.instructions,
    required this.scheduledTime,
    this.scheduledDate,
    this.recurrence = 'daily',
    this.isActive = true,
    required this.createdAt,
    this.syncStatus = 'pending',
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'user_id': userId,
      'title': title,
      'category': category,
      'instructions': instructions,
      'scheduled_time': scheduledTime,
      'scheduled_date': scheduledDate,
      'recurrence': recurrence,
      'is_active': isActive ? 1 : 0,
      'created_at': createdAt.toIso8601String(),
      'sync_status': syncStatus,
    };
  }

  factory Reminder.fromMap(Map<String, dynamic> map) {
    return Reminder(
      id: map['id'] as String,
      userId: map['user_id'] as String,
      title: map['title'] as String,
      category: map['category'] as String,
      instructions: map['instructions'] as String?,
      scheduledTime: map['scheduled_time'] as String,
      scheduledDate: map['scheduled_date'] as String?,
      recurrence: map['recurrence'] as String? ?? 'daily',
      isActive: (map['is_active'] as int?) == 1,
      createdAt: DateTime.parse(map['created_at'] as String),
      syncStatus: map['sync_status'] as String? ?? 'pending',
    );
  }
}