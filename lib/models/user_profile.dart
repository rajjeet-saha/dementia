class UserProfile {
  final String id;
  final String publicUserId;
  final String name;
  final String? phoneNumber;
  final String role; // 'user' or 'care_partner'
  final String preferredLanguage;
  final String fontSizePreference;
  final String fontFamilyPreference;
  final bool highContrastEnabled;
  final bool voiceAssistantEnabled;
  final double voiceSpeed;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String syncStatus; // 'pending', 'synced', 'failed'

  UserProfile({
    required this.id,
    required this.publicUserId,
    required this.name,
    this.phoneNumber,
    required this.role,
    this.preferredLanguage = 'en',
    this.fontSizePreference = 'medium',
    this.fontFamilyPreference = 'atkinson',
    this.highContrastEnabled = false,
    this.voiceAssistantEnabled = true,
    this.voiceSpeed = 1.0,
    required this.createdAt,
    required this.updatedAt,
    this.syncStatus = 'synced',
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'public_user_id': publicUserId,
      'name': name,
      'phone_number': phoneNumber,
      'role': role,
      'preferred_language': preferredLanguage,
      'font_size_preference': fontSizePreference,
      'font_family_preference': fontFamilyPreference,
      'high_contrast_enabled': highContrastEnabled ? 1 : 0,
      'voice_assistant_enabled': voiceAssistantEnabled ? 1 : 0,
      'voice_speed': voiceSpeed,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'sync_status': syncStatus,
    };
  }

  factory UserProfile.fromMap(Map<String, dynamic> map) {
    return UserProfile(
      id: map['id'] as String,
      publicUserId: map['public_user_id'] as String,
      name: map['name'] as String,
      phoneNumber: map['phone_number'] as String?,
      role: map['role'] as String,
      preferredLanguage: map['preferred_language'] as String? ?? 'en',
      fontSizePreference: map['font_size_preference'] as String? ?? 'medium',
      fontFamilyPreference: map['font_family_preference'] as String? ?? 'atkinson',
      highContrastEnabled: (map['high_contrast_enabled'] as int?) == 1,
      voiceAssistantEnabled: (map['voice_assistant_enabled'] as int?) != 0,
      voiceSpeed: (map['voice_speed'] as num?)?.toDouble() ?? 1.0,
      createdAt: DateTime.parse(map['created_at'] as String),
      updatedAt: DateTime.parse(map['updated_at'] as String),
      syncStatus: map['sync_status'] as String? ?? 'synced',
    );
  }

  UserProfile copyWith({
    String? id,
    String? publicUserId,
    String? name,
    String? phoneNumber,
    String? role,
    String? preferredLanguage,
    String? fontSizePreference,
    String? fontFamilyPreference,
    bool? highContrastEnabled,
    bool? voiceAssistantEnabled,
    double? voiceSpeed,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? syncStatus,
  }) {
    return UserProfile(
      id: id ?? this.id,
      publicUserId: publicUserId ?? this.publicUserId,
      name: name ?? this.name,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      role: role ?? this.role,
      preferredLanguage: preferredLanguage ?? this.preferredLanguage,
      fontSizePreference: fontSizePreference ?? this.fontSizePreference,
      fontFamilyPreference: fontFamilyPreference ?? this.fontFamilyPreference,
      highContrastEnabled: highContrastEnabled ?? this.highContrastEnabled,
      voiceAssistantEnabled: voiceAssistantEnabled ?? this.voiceAssistantEnabled,
      voiceSpeed: voiceSpeed ?? this.voiceSpeed,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      syncStatus: syncStatus ?? this.syncStatus,
    );
  }
}