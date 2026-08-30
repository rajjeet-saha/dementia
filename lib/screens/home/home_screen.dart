import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../models/user_profile.dart';
import '../../repositories/user_repository.dart';
import '../../utils/date_formatter.dart';
import '../../widgets/accessible_card.dart';
import '../../widgets/accessible_text.dart';
import '../../widgets/status_banner.dart';
import '../../app/routes.dart';
import '../voice/voice_assistant_dialog.dart';

class HomeScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const HomeScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final UserRepository _userRepository = UserRepository();
  UserProfile? _userProfile;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadUserProfile();
  }

  Future<void> _loadUserProfile() async {
    final profile = await _userRepository.getProfile();
    if (mounted) {
      setState(() {
        _userProfile = profile;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final greeting = DateFormatter.getTimeBasedGreeting();
    final displayName = _userProfile?.name.isNotEmpty == true
        ? _userProfile!.name
        : 'Friend';

    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 80,
        backgroundColor: theme.colorScheme.surface,
        title: Text(
          loc?.translate('app_title') ?? 'Redler',
          style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            iconSize: 32,
            icon: const Icon(Icons.contrast_rounded),
            tooltip: loc?.translate('high_contrast') ?? 'Toggle High Contrast',
            onPressed: () {
              widget.accessibilityController.toggleHighContrast(
                !widget.accessibilityController.isHighContrast,
              );
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            const StatusBanner(isOnline: true),
            Expanded(
              child: _isLoading
                  ? const Center(child: CircularProgressIndicator(strokeWidth: 4))
                  : ListView(
                padding: const EdgeInsets.only(top: 16, bottom: 32),
                children: [
                  // Dynamic Greeting Banner
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 8,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AccessibleText(
                          '$greeting,',
                          baseFontSize: 22,
                          color: theme.colorScheme.onSurface.withValues(alpha: 0.8),
                        ),
                        const SizedBox(height: 4),
                        AccessibleText(
                          displayName,
                          baseFontSize: 30,
                          fontWeight: FontWeight.w900,
                          color: theme.colorScheme.primary,
                        ),
                        if (_userProfile?.publicUserId != null) ...[
                          const SizedBox(height: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 10,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primaryContainer,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              'ID: ${_userProfile!.publicUserId}',
                              style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: theme.colorScheme.onPrimaryContainer,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Navigation Cards
                  AccessibleCard(
                    icon: Icons.videogame_asset_rounded,
                    iconColor: Colors.deepPurple,
                    title: loc?.translate('play_games') ?? 'Play Game',
                    description: loc?.translate('play_games_desc') ?? 'Memory and brain exercises',
                    onTap: () {
                      // Bypass the menu and launch the unified game directly!
                      Navigator.pushNamed(context, AppRoutes.gamePlay, arguments: 'daily_workout');
                    },
                  ),
                  AccessibleCard(
                    icon: Icons.mic_rounded,
                    iconColor: Colors.teal,
                    title: loc?.translate('voice_assistant') ?? 'Voice Assistant',
                    description: loc?.translate('voice_assistant_desc') ?? 'Speak to navigate or set reminders',
                    onTap: () {
                      showModalBottomSheet(
                        context: context,
                        isScrollControlled: true,
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                        ),
                        builder: (ctx) => VoiceAssistantDialog(
                          // FIX: lowercase 'a' here
                          accessibilityController: widget.accessibilityController,
                        ),
                      );
                    },
                  ),
                  AccessibleCard(
                    icon: Icons.alarm_rounded,
                    iconColor: Colors.amber.shade800,
                    title: loc?.translate('reminders') ?? 'Reminders',
                    description: loc?.translate('reminders_desc') ?? 'Medicines, water, and appointments',
                    onTap: () {
                      Navigator.pushNamed(context, AppRoutes.reminders);
                    },
                  ),
                  AccessibleCard(
                    icon: Icons.auto_graph_rounded,
                    iconColor: Colors.green.shade700,
                    title: loc?.translate('my_progress') ?? 'My Progress',
                    description: loc?.translate('my_progress_desc') ?? 'View your weekly activity score',
                    onTap: () {
                      Navigator.pushNamed(context, AppRoutes.progress);
                    },
                  ),
                  AccessibleCard(
                    icon: Icons.settings_rounded,
                    iconColor: Colors.blueGrey,
                    title: loc?.translate('settings') ?? 'Settings',
                    description: loc?.translate('settings_desc') ?? 'Font size, contrast, and account',
                    onTap: () {
                      Navigator.pushNamed(context, AppRoutes.settings);
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}