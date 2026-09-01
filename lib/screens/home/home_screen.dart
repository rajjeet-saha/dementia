import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../models/user_profile.dart';
import '../../repositories/user_repository.dart';
import '../../utils/date_formatter.dart';
import '../../widgets/accessible_text.dart';
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

  // Square Card for the Bottom Row (Progress & Settings)
  Widget _buildSquareCard({
    required BuildContext context,
    required IconData icon,
    required String title,
    required Color bgColor,
    required Color iconColor,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: bgColor.withValues(alpha: 0.85),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.white.withValues(alpha: 0.6), width: 2),
          boxShadow: [
            BoxShadow(
              color: iconColor.withValues(alpha: 0.1),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 52, color: iconColor),
            const SizedBox(height: 12),
            AccessibleText(
              title,
              baseFontSize: 18,
              fontWeight: FontWeight.bold,
              textAlign: TextAlign.center,
              color: iconColor,
            ),
          ],
        ),
      ),
    );
  }

  // Wide Card for the Top Columns (Play Games & Reminders)
  Widget _buildWideCard({
    required BuildContext context,
    required IconData icon,
    required String title,
    required Color bgColor,
    required Color iconColor,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 24),
        decoration: BoxDecoration(
          color: bgColor.withValues(alpha: 0.85),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.white.withValues(alpha: 0.6), width: 2),
          boxShadow: [
            BoxShadow(
              color: iconColor.withValues(alpha: 0.1),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            Icon(icon, size: 48, color: iconColor),
            const SizedBox(width: 20),
            Expanded(
              child: AccessibleText(
                title,
                baseFontSize: 24,
                fontWeight: FontWeight.bold,
                color: iconColor,
              ),
            ),
            Icon(Icons.arrow_forward_ios_rounded, size: 28, color: iconColor.withValues(alpha: 0.5)),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final greeting = DateFormatter.getTimeBasedGreeting();
    final displayName = _userProfile?.name.isNotEmpty == true ? _userProfile!.name : 'Friend';

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        toolbarHeight: 70,
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          loc?.translate('app_title') ?? 'Redler',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w900,
            color: theme.colorScheme.primary,
          ),
        ),
        actions: [
          IconButton(
            iconSize: 28,
            color: theme.colorScheme.primary,
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
      body: Stack(
        children: [
          // 1. Soft Pastel Tricolor Background (Indian Flag Theme)
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFFFFF3E0), // Soft Pastel Saffron
                  Color(0xFFFAFAFA), // Pure White
                  Color(0xFFE8F5E9), // Soft Pastel Green
                ],
                stops: [0.0, 0.5, 1.0],
              ),
            ),
          ),

          // 2. Cultural Imagery using your specific PNG files
          // Positioned(
          //   top: 140,
          //   right: 20,
          //   child: Opacity(
          //     opacity: 0.25, // Opaque enough to see clearly
          //     child: Image.asset(
          //       'assets/images/horn.png',
          //       width: 140,
          //     ),
          //   ),
          // ),
          Positioned(
            bottom: 40,
            left: 10,
            child: Opacity(
              opacity: 0.25,
              child: Image.asset(
                'assets/images/land_pic.png',
                width: 250,
              ),
            ),
          ),

          // 3. The Interactive UI Layer
          SafeArea(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 16),

                  // Top Row: Greeting + Voice Assistant
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            AccessibleText(
                              '$greeting,',
                              baseFontSize: 22,
                              color: theme.colorScheme.primary.withValues(alpha: 0.8),
                            ),
                            AccessibleText(
                              displayName,
                              baseFontSize: 32,
                              fontWeight: FontWeight.w900,
                              color: theme.colorScheme.primary,
                            ),
                          ],
                        ),
                      ),

                      // Prominent Voice Assistant Button
                      InkWell(
                        onTap: () {
                          showModalBottomSheet(
                            context: context,
                            isScrollControlled: true,
                            shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                            ),
                            builder: (ctx) => VoiceAssistantDialog(
                              accessibilityController: widget.accessibilityController,
                            ),
                          );
                        },
                        borderRadius: BorderRadius.circular(50),
                        child: Container(
                          padding: const EdgeInsets.all(22),
                          decoration: BoxDecoration(
                            color: const Color(0xFFE3F2FD),
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: theme.colorScheme.primary.withValues(alpha: 0.5),
                              width: 2,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: theme.colorScheme.primary.withValues(alpha: 0.2),
                                blurRadius: 12,
                                offset: const Offset(0, 6),
                              ),
                            ],
                          ),
                          child: Icon(
                            Icons.mic_rounded,
                            size: 52,
                            color: theme.colorScheme.primary,
                          ),
                        ),
                      ),
                      const SizedBox(width: 24),
                    ],
                  ),

                  const SizedBox(height: 32),

                  // Top Action: Play Games (Wide)
                  _buildWideCard(
                    context: context,
                    icon: Icons.videogame_asset_rounded,
                    title: loc?.translate('play_games') ?? 'Play Game',
                    bgColor: const Color(0xFFFFF8E1), // Light saffron
                    iconColor: Colors.deepOrange.shade700,
                    onTap: () => Navigator.pushNamed(context, AppRoutes.gamePlay, arguments: 'daily_workout'),
                  ),

                  const SizedBox(height: 16),

                  // Middle Action: Reminders (Wide)
                  _buildWideCard(
                    context: context,
                    icon: Icons.alarm_rounded,
                    title: loc?.translate('reminders') ?? 'Reminders',
                    bgColor: const Color(0xFFF1F8E9), // Light green
                    iconColor: Colors.green.shade800,
                    onTap: () => Navigator.pushNamed(context, AppRoutes.reminders),
                  ),

                  const SizedBox(height: 16),

                  // Bottom Row: Progress & Settings (Side-by-Side)
                  Row(
                    children: [
                      Expanded(
                        child: AspectRatio(
                          aspectRatio: 1.0,
                          child: _buildSquareCard(
                            context: context,
                            icon: Icons.auto_graph_rounded,
                            title: loc?.translate('my_progress') ?? 'My Progress',
                            bgColor: const Color(0xFFF3E5F5), // Light purple
                            iconColor: Colors.purple.shade800,
                            onTap: () => Navigator.pushNamed(context, AppRoutes.progress),
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: AspectRatio(
                          aspectRatio: 1.0,
                          child: _buildSquareCard(
                            context: context,
                            icon: Icons.settings_rounded,
                            title: loc?.translate('settings') ?? 'Settings',
                            bgColor: Colors.white,
                            iconColor: Colors.blueGrey.shade800,
                            onTap: () => Navigator.pushNamed(context, AppRoutes.settings),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}