import 'package:flutter/material.dart';
import '../accessibility/accessibility_controller.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/home/home_screen.dart';
import '../screens/games/games_menu_screen.dart';
import '../screens/games/game_play_screen.dart';
import '../screens/reminders/reminders_screen.dart';
import '../screens/reminders/add_reminder_screen.dart';
import '../screens/progress/user_progress_screen.dart';
import '../screens/settings/settings_screen.dart';
import '../screens/caregiver/caregiver_portal_screen.dart';

class AppRoutes {
  static const String login = '/login';
  static const String signup = '/signup';
  static const String home = '/home';
  static const String games = '/games';
  static const String gamePlay = '/game_play';
  static const String reminders = '/reminders';
  static const String addReminder = '/add_reminder';
  static const String progress = '/progress';
  static const String settings = '/settings';
  static const String caregiverPortal = '/caregiver_portal';

  static Route<dynamic> generateRoute(
      RouteSettings settingsRoute,
      AccessibilityController accessibilityController,
      ) {
    switch (settingsRoute.name) {
      case login:
        return MaterialPageRoute(builder: (_) => LoginScreen(accessibilityController: accessibilityController));
      case signup:
        return MaterialPageRoute(builder: (_) => SignupScreen(accessibilityController: accessibilityController));
      case home:
        return MaterialPageRoute(builder: (_) => HomeScreen(accessibilityController: accessibilityController));
      case games:
        return MaterialPageRoute(builder: (_) => GamesMenuScreen(accessibilityController: accessibilityController));
      case gamePlay:
      // Extract the game type/name from arguments
        final gameType = settingsRoute.arguments as String? ?? 'Unknown Game';
        return MaterialPageRoute(
          builder: (_) => GamePlayScreen(
            accessibilityController: accessibilityController,
            gameType: gameType,
          ),
        );
      case reminders:
        return MaterialPageRoute(builder: (_) => RemindersScreen(accessibilityController: accessibilityController));
      case addReminder:
        return MaterialPageRoute(builder: (_) => AddReminderScreen(accessibilityController: accessibilityController));
      case progress:
        return MaterialPageRoute(builder: (_) => UserProgressScreen(accessibilityController: accessibilityController));
      case settings:
        return MaterialPageRoute(builder: (_) => SettingsScreen(accessibilityController: accessibilityController));
      case caregiverPortal:
        return MaterialPageRoute(builder: (_) => CaregiverPortalScreen(accessibilityController: accessibilityController));
      default:
        return MaterialPageRoute(builder: (_) => LoginScreen(accessibilityController: accessibilityController));
    }
  }
}