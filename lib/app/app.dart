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
          title: 'Sahayata NER',
          debugShowCheckedModeBanner: false,
          theme: accessibilityController.isHighContrast
              ? AppTheme.getHighContrastTheme()
              : AppTheme.getStandardTheme(),
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