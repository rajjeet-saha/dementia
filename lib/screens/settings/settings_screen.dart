import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../models/user_profile.dart';
import '../../repositories/user_repository.dart';
import '../../repositories/auth_repository.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';
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
  final UserRepository _userRepository = UserRepository();
  final AuthRepository _authRepository = AuthRepository();

  UserProfile? _userProfile;
  bool _isLoading = true;

  // Local UI State
  late bool _isHighContrast;
  late String _selectedLanguage;
  late String _selectedFontSize;

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

  @override
  void initState() {
    super.initState();
    // Initialize with current global state to prevent jank
    _isHighContrast = widget.accessibilityController.isHighContrast;
    _selectedLanguage = widget.accessibilityController.locale.languageCode;
    _selectedFontSize = 'medium';
    _loadProfile();
  }

  Future<void> _loadProfile() async {
    final profile = await _userRepository.getProfile();
    if (mounted) {
      setState(() {
        _userProfile = profile;
        if (profile != null) {
          _selectedLanguage = profile.preferredLanguage;
          _selectedFontSize = profile.fontSizePreference;
          _isHighContrast = profile.highContrastEnabled;

          // Ensure controller matches loaded profile
          widget.accessibilityController.updateFontSize(_selectedFontSize);
        }
        _isLoading = false;
      });
    }
  }

  Future<void> _saveSettings() async {
    // 1. Update UI globally immediately
    widget.accessibilityController.setLocale(Locale(_selectedLanguage));
    widget.accessibilityController.toggleHighContrast(_isHighContrast);
    widget.accessibilityController.updateFontSize(_selectedFontSize);

    // 2. Persist to SQLite and Queue for Supabase Sync
    if (_userProfile != null) {
      await _userRepository.updateSettings(
        fontSize: _selectedFontSize,
        fontFamily: _userProfile!.fontFamilyPreference,
        highContrast: _isHighContrast,
        language: _selectedLanguage,
      );
    }
  }

  Future<void> _handleLogout() async {
    await _authRepository.signOut();
    if (mounted) {
      Navigator.pushNamedAndRemoveUntil(context, AppRoutes.login, (route) => false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(loc?.translate('settings') ?? 'Settings'),
      ),
      body: SafeArea(
        child: _isLoading
            ? const Center(child: CircularProgressIndicator(strokeWidth: 4))
            : SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Profile Overview Card
              if (_userProfile != null) ...[
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primaryContainer,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      AccessibleText(
                        loc?.translate('account_details') ?? 'Account Details',
                        baseFontSize: 18,
                        color: theme.colorScheme.onPrimaryContainer.withValues(alpha: 0.8),
                      ),
                      const SizedBox(height: 8),
                      AccessibleText(
                        _userProfile!.name,
                        baseFontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: theme.colorScheme.onPrimaryContainer,
                      ),
                      const SizedBox(height: 4),
                      AccessibleText(
                        'ID: ${_userProfile!.publicUserId}',
                        baseFontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onPrimaryContainer,
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 32),
              ],

              AccessibleText(
                loc?.translate('visual_settings') ?? 'Visual Settings',
                baseFontSize: 22,
                fontWeight: FontWeight.bold,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(height: 16),

              // High Contrast Toggle
              Container(
                decoration: BoxDecoration(
                  border: Border.all(color: theme.colorScheme.outlineVariant),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: SwitchListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                  title: AccessibleText(
                    loc?.translate('high_contrast') ?? 'High Contrast Mode',
                    baseFontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                  subtitle: AccessibleText(
                    loc?.translate('high_contrast_desc') ?? 'Increases text and button visibility',
                    baseFontSize: 16,
                  ),
                  value: _isHighContrast,
                  onChanged: (bool value) {
                    setState(() {
                      _isHighContrast = value;
                    });
                    _saveSettings();
                  },
                ),
              ),
              const SizedBox(height: 24),

              // Font Size Selector
              AccessibleText(
                loc?.translate('font_size') ?? 'Text Size',
                baseFontSize: 20,
                fontWeight: FontWeight.bold,
              ),
              const SizedBox(height: 12),
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(
                    value: 'medium',
                    label: Padding(
                      padding: EdgeInsets.symmetric(vertical: 12),
                      child: Text('Normal', style: TextStyle(fontSize: 16)),
                    ),
                  ),
                  ButtonSegment(
                    value: 'large',
                    label: Padding(
                      padding: EdgeInsets.symmetric(vertical: 12),
                      child: Text('Large', style: TextStyle(fontSize: 20)),
                    ),
                  ),
                  ButtonSegment(
                    value: 'extra_large',
                    label: Padding(
                      padding: EdgeInsets.symmetric(vertical: 12),
                      child: Text('Huge', style: TextStyle(fontSize: 24)),
                    ),
                  ),
                ],
                selected: {_selectedFontSize},
                onSelectionChanged: (Set<String> newSelection) {
                  setState(() {
                    _selectedFontSize = newSelection.first;
                  });
                  _saveSettings();
                },
              ),
              const SizedBox(height: 32),

              AccessibleText(
                loc?.translate('language_settings') ?? 'Language Settings',
                baseFontSize: 22,
                fontWeight: FontWeight.bold,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(height: 16),

              // Language Dropdown
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                decoration: BoxDecoration(
                  border: Border.all(color: theme.colorScheme.outlineVariant),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedLanguage,
                    isExpanded: true,
                    iconSize: 32,
                    style: TextStyle(fontSize: 22, color: theme.colorScheme.onSurface),
                    items: _languages.map((lang) {
                      return DropdownMenuItem<String>(
                        value: lang['code'],
                        child: Text(lang['name']!),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        setState(() {
                          _selectedLanguage = newValue;
                        });
                        _saveSettings();
                      }
                    },
                  ),
                ),
              ),
              const SizedBox(height: 48),

              // Sign Out Button
              AccessibleButton(
                label: loc?.translate('sign_out') ?? 'Sign Out',
                onPressed: _handleLogout,
                icon: Icons.logout_rounded,
                isPrimary: false,
              ),
            ],
          ),
        ),
      ),
    );
  }
}