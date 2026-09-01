import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../repositories/auth_repository.dart';
import '../../widgets/accessible_text.dart';
import '../../widgets/cultural_background.dart';
import '../../app/routes.dart';

class SettingsScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const SettingsScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final List<Map<String, String>> _languages = [
    {'code': 'en', 'name': 'English'},
    {'code': 'hi', 'name': 'Hindi'},
    {'code': 'as', 'name': 'Assamese'},
    {'code': 'bn', 'name': 'Bengali'},
    {'code': 'mni', 'name': 'Manipuri'},
    {'code': 'lus', 'name': 'Mizo'},
    {'code': 'kha', 'name': 'Khasi'},
    {'code': 'trp', 'name': 'Kokborok'},
  ];

  Future<void> _handleLogout(BuildContext context) async {
    final authRepo = AuthRepository();
    await authRepo.signOut();
    if (context.mounted) {
      Navigator.pushNamedAndRemoveUntil(context, AppRoutes.login, (route) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final currentLang = widget.accessibilityController.locale.languageCode;

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(loc?.translate('settings') ?? 'Settings', style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: theme.colorScheme.primary),
      ),
      body: CulturalBackground(
        imageAsset: 'leaves.png', // Uses the Tea Leaves asset
        imageAlignment: Alignment.topRight,
        imageOpacity: 0.25,
        imageWidth: 250,
        imageHeight: 250,
        child: ListView(
          padding: const EdgeInsets.all(24.0),
          children: [
            const SizedBox(height: 80),

            // Language Settings Section
            AccessibleText(
              loc?.translate('language_settings') ?? 'Language Settings',
              baseFontSize: 22,
              fontWeight: FontWeight.w900,
              color: theme.colorScheme.primary,
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.85),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: _languages.any((l) => l['code'] == currentLang) ? currentLang : 'en',
                  isExpanded: true,
                  icon: Icon(Icons.language_rounded, color: theme.colorScheme.primary),
                  style: const TextStyle(fontSize: 20, color: Colors.black87),
                  items: _languages.map((lang) {
                    return DropdownMenuItem<String>(
                      value: lang['code'],
                      child: Text(lang['name']!, style: const TextStyle(fontWeight: FontWeight.bold)),
                    );
                  }).toList(),
                  onChanged: (String? newValue) {
                    if (newValue != null) {
                      widget.accessibilityController.changeLocale(newValue);
                    }
                  },
                ),
              ),
            ),

            const SizedBox(height: 32),

            // Visual Settings Section
            AccessibleText(
              loc?.translate('visual_settings') ?? 'Visual Settings',
              baseFontSize: 22,
              fontWeight: FontWeight.w900,
              color: theme.colorScheme.primary,
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.85),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white),
              ),
              child: Column(
                children: [
                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: AccessibleText(loc?.translate('high_contrast') ?? 'High Contrast Mode', baseFontSize: 18, fontWeight: FontWeight.bold),
                    subtitle: AccessibleText(loc?.translate('high_contrast_desc') ?? 'Increases text and button visibility', baseFontSize: 14),
                    value: widget.accessibilityController.isHighContrast,
                    activeColor: const Color(0xFF138808), // Indian Green
                    onChanged: (bool value) {
                      widget.accessibilityController.toggleHighContrast(value);
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 32),

            // Account Section
            AccessibleText(
              loc?.translate('account_details') ?? 'Account Details',
              baseFontSize: 22,
              fontWeight: FontWeight.w900,
              color: theme.colorScheme.primary,
            ),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: () => _handleLogout(context),
              icon: const Icon(Icons.logout_rounded, size: 28),
              label: Text(
                loc?.translate('sign_out') ?? 'Sign Out',
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red.shade700,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 24),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}