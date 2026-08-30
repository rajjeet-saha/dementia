import 'dart:math';

class IdGenerator {
  // Omit ambiguous characters like 0, O, 1, I to avoid confusion for elderly users & care partners
  static const String _charset = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  static final Random _random = Random.secure();

  /// Generates a human-readable, non-predictable patient ID (e.g., 'NER-7K42P9')
  static String generatePatientId() {
    final buffer = StringBuffer('NER-');
    for (int i = 0; i < 6; i++) {
      final index = _random.nextInt(_charset.length);
      buffer.write(_charset[index]);
    }
    return buffer.toString();
  }
}