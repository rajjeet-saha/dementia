import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Standard Elderly Palette: Warm, calm, high contrast
  static const Color primaryBlue = Color(0xFF1E3A8A); // Deep Navy
  static const Color primaryGreen = Color(0xFF14532D); // Forest Green
  static const Color warmBackground = Color(0xFFFBF9F5); // Cream
  static const Color surfaceCard = Color(0xFFFFFFFF);
  static const Color textDark = Color(0xFF111827); // Off-Black
  static const Color textMuted = Color(0xFF4B5563);
  static const Color borderSubtle = Color(0xFFD1D5DB);

  // High-Contrast Palette: For visual impairment
  static const Color hcBackground = Color(0xFF000000);
  static const Color hcSurface = Color(0xFF121212);
  static const Color hcPrimary = Color(0xFFFFD700); // Bright Gold
  static const Color hcText = Color(0xFFFFFFFF);
  static const Color hcBorder = Color(0xFFFFD700);

  static ThemeData getStandardTheme() {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: warmBackground,
      colorScheme: const ColorScheme.light(
        primary: primaryBlue,
        secondary: primaryGreen,
        surface: surfaceCard,
        onPrimary: Colors.white,
        onSurface: textDark,
      ),
      textTheme: GoogleFonts.atkinsonHyperlegibleTextTheme().apply(
        bodyColor: textDark,
        displayColor: textDark,
      ),
      cardTheme: CardThemeData(
        color: surfaceCard,
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: borderSubtle, width: 1.5),
        ),
      ),
    );
  }

  static ThemeData getHighContrastTheme() {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: hcBackground,
      colorScheme: const ColorScheme.dark(
        primary: hcPrimary,
        secondary: hcPrimary,
        surface: hcSurface,
        onPrimary: Colors.black,
        onSurface: hcText,
      ),
      textTheme: GoogleFonts.atkinsonHyperlegibleTextTheme(
        ThemeData.dark().textTheme,
      ).apply(
        bodyColor: hcText,
        displayColor: hcText,
      ),
      cardTheme: CardThemeData(
        color: hcSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: hcBorder, width: 3.0),
        ),
      ),
    );
  }
}