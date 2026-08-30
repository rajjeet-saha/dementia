import 'package:flutter/material.dart';

class AccessibilityController extends ChangeNotifier {
  bool _isHighContrast = false;
  Locale _locale = const Locale('en');
  double _textScaleFactor = 1.0;

  bool get isHighContrast => _isHighContrast;
  Locale get locale => _locale;
  double get textScaleFactor => _textScaleFactor;

  void toggleHighContrast(bool value) {
    _isHighContrast = value;
    notifyListeners();
  }

  void setLocale(Locale newLocale) {
    _locale = newLocale;
    notifyListeners();
  }

  void updateFontSize(String sizePreference) {
    switch (sizePreference) {
      case 'large':
        _textScaleFactor = 1.2;
        break;
      case 'extra_large':
        _textScaleFactor = 1.4;
        break;
      case 'medium':
      default:
        _textScaleFactor = 1.0;
        break;
    }
    notifyListeners();
  }
}