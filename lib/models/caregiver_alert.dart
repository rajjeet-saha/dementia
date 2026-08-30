class CaregiverAlert {
  final String id;
  final String userId;
  final String alertType; // 'persistent_decline', 'missed_routine', 'notable_change'
  final String category; // 'memory', 'attention', 'pattern', 'general'
  final String severity; // 'low', 'medium', 'high'
  final String message;
  final double? baselineValue;
  final double? currentValue;
  final DateTime createdAt;
  final String syncStatus;

  CaregiverAlert({
    required this.id,
    required this.userId,
    required this.alertType,
    required this.category,
    this.severity = 'medium',
    required this.message,
    this.baselineValue,
    this.currentValue,
    required this.createdAt,
    this.syncStatus = 'pending',
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'user_id': userId,
      'alert_type': alertType,
      'category': category,
      'severity': severity,
      'message': message,
      'baseline_value': baselineValue,
      'current_value': currentValue,
      'created_at': createdAt.toIso8601String(),
      'sync_status': syncStatus,
    };
  }

  factory CaregiverAlert.fromMap(Map<String, dynamic> map) {
    return CaregiverAlert(
      id: map['id'] as String,
      userId: map['user_id'] as String,
      alertType: map['alert_type'] as String,
      category: map['category'] as String,
      severity: map['severity'] as String? ?? 'medium',
      message: map['message'] as String,
      baselineValue: (map['baseline_value'] as num?)?.toDouble(),
      currentValue: (map['current_value'] as num?)?.toDouble(),
      createdAt: DateTime.parse(map['created_at'] as String),
      syncStatus: map['sync_status'] as String? ?? 'pending',
    );
  }
}