import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../repositories/auth_repository.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';
import '../../app/routes.dart';

class SignupScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const SignupScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _phoneController = TextEditingController();
  final _authRepository = AuthRepository();

  bool _isLoading = false;
  String? _errorMessage;
  String _selectedRole = 'user';
  String _selectedLanguage = 'en';

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
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _handleSignup() async {
    if (_nameController.text.trim().isEmpty ||
        _emailController.text.trim().isEmpty ||
        _passwordController.text.isEmpty) {
      setState(() {
        _errorMessage = AppLocalizations.of(context)!.translate('fill_all_fields');
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final profile = await _authRepository.signUp(
        name: _nameController.text.trim(),
        email: _emailController.text.trim(),
        password: _passwordController.text,
        phoneNumber: _phoneController.text.trim(),
        role: _selectedRole,
        preferredLanguage: _selectedLanguage,
      );

      if (!mounted) return;

      // Update the global language state
      widget.accessibilityController.setLocale(Locale(_selectedLanguage));

      _showSuccessDialog(profile.publicUserId, profile.role);

    } catch (e) {
      if (!mounted) return;
      setState(() {
        _errorMessage = AppLocalizations.of(context)!.translate('signup_error');
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showSuccessDialog(String publicId, String role) {
    final loc = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        title: AccessibleText(
          loc.translate('account_created'),
          baseFontSize: 24,
          fontWeight: FontWeight.bold,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AccessibleText(loc.translate('your_id_is')),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              color: Theme.of(context).colorScheme.primaryContainer,
              child: SelectableText(
                publicId,
                style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: 2),
              ),
            ),
            const SizedBox(height: 12),
            AccessibleText(loc.translate('keep_id_safe')),
          ],
        ),
        actions: [
          AccessibleButton(
            label: loc.translate('continue_button'),
            onPressed: () {
              Navigator.of(ctx).pop();
              if (role == 'care_partner') {
                Navigator.pushReplacementNamed(context, AppRoutes.caregiverPortal);
              } else {
                Navigator.pushReplacementNamed(context, AppRoutes.home);
              }
            },
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.translate('signup_title')),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (_errorMessage != null)
                Container(
                  padding: const EdgeInsets.all(16),
                  margin: const EdgeInsets.only(bottom: 20),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.errorContainer,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: AccessibleText(
                    _errorMessage!,
                    color: theme.colorScheme.onErrorContainer,
                  ),
                ),

              TextField(
                controller: _nameController,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  labelText: loc.translate('full_name'),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  labelText: loc.translate('email_label'),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _passwordController,
                obscureText: true,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  labelText: loc.translate('password_label'),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _phoneController,
                keyboardType: TextInputType.phone,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  labelText: loc.translate('phone_optional'),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 30),

              AccessibleText(loc.translate('i_am_a'), baseFontSize: 20, fontWeight: FontWeight.bold),
              const SizedBox(height: 12),
              SegmentedButton<String>(
                segments: [
                  ButtonSegment(
                    value: 'user',
                    label: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Text(loc.translate('role_user'), style: const TextStyle(fontSize: 18)),
                    ),
                  ),
                  ButtonSegment(
                    value: 'care_partner',
                    label: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Text(loc.translate('role_caregiver'), style: const TextStyle(fontSize: 18)),
                    ),
                  ),
                ],
                selected: {_selectedRole},
                onSelectionChanged: (Set<String> newSelection) {
                  setState(() {
                    _selectedRole = newSelection.first;
                  });
                },
              ),
              const SizedBox(height: 30),

              AccessibleText(loc.translate('preferred_language'), baseFontSize: 20, fontWeight: FontWeight.bold),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  border: Border.all(color: theme.colorScheme.outline),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _selectedLanguage,
                    isExpanded: true,
                    iconSize: 32,
                    style: TextStyle(fontSize: 20, color: theme.colorScheme.onSurface),
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
                      }
                    },
                  ),
                ),
              ),
              const SizedBox(height: 40),

              if (_isLoading)
                const Center(child: CircularProgressIndicator(strokeWidth: 4))
              else
                AccessibleButton(
                  label: loc.translate('signup_button'),
                  onPressed: _handleSignup,
                  icon: Icons.person_add_rounded,
                ),
            ],
          ),
        ),
      ),
    );
  }
}