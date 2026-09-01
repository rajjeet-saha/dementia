import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import '../accessibility/accessibility_controller.dart';
import '../accessibility/app_theme.dart';
import '../localization/app_localizations_delegate.dart';
import 'routes.dart';

class Redler extends StatelessWidget {
  final AccessibilityController accessibilityController;

  const Redler({
    super.key,
    required this.accessibilityController,
  });

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: accessibilityController,
      builder: (context, _) {
        return MaterialApp(
          title: 'Redler',
          debugShowCheckedModeBanner: false,
          theme: accessibilityController.isHighContrast
          // 1. HIGH CONTRAST THEME (Activated when toggle is ON)
              ? ThemeData(
            useMaterial3: true,
            brightness: Brightness.dark,
            scaffoldBackgroundColor: Colors.black,
            colorScheme: const ColorScheme.highContrastDark(
              primary: Colors.yellowAccent,
              secondary: Colors.cyanAccent,
              surface: Colors.black,
              onSurface: Colors.white,
            ),
          )
          // 2. STANDARD CULTURAL THEME (Activated when toggle is OFF)
              : ThemeData(
            useMaterial3: true,
            brightness: Brightness.light,
            scaffoldBackgroundColor: const Color(0xFFFAFAFA),
            colorScheme: ColorScheme.fromSeed(
              seedColor: const Color(0xFF3F51B5), // Ashoka Navy Blue base
              primary: const Color(0xFF303F9F),
              primaryContainer: const Color(0xFFE8EAF6),
              secondary: const Color(0xFFFF9800), // Saffron
              secondaryContainer: const Color(0xFFFFF3E0),
              tertiary: const Color(0xFF4CAF50), // Green
              tertiaryContainer: const Color(0xFFE8F5E9),
              surface: const Color(0xFFFAFAFA), // Off-white
              surfaceContainerHighest: const Color(0xFFF5F5F5),
            ),
          ),
          locale: accessibilityController.locale,
          supportedLocales: const [
            Locale('en', ''),
            Locale('hi', ''),
            Locale('as', ''),
            Locale('bn', ''),
            Locale('mni', ''),
            Locale('lus', ''),
            Locale('kha', ''),
            Locale('trp', ''),
          ],
          localizationsDelegates: const [
            AppLocalizationsDelegate(),
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          builder: (context, child) {
            return MediaQuery(
              data: MediaQuery.of(context).copyWith(
                textScaler: TextScaler.linear(
                  accessibilityController.textScaleFactor,
                ),
              ),
              child: child!,
            );
          },
          // Route Management
          initialRoute: AppRoutes.login,
          onGenerateRoute: (settings) => AppRoutes.generateRoute(
            settings,
            accessibilityController,
          ),
        );
      },
    );
  }
}