import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../repositories/auth_repository.dart';
import '../../widgets/accessible_text.dart';
import '../../widgets/cultural_background.dart';
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

  String _selectedRole = 'user';
  String _selectedLanguage = 'en';
  bool _isLoading = false;
  String? _errorMessage;

  final AuthRepository _authRepository = AuthRepository();

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
    if (_nameController.text.isEmpty || _emailController.text.isEmpty || _passwordController.text.isEmpty) {
      setState(() {
        _errorMessage = AppLocalizations.of(context)?.translate('fill_all_fields') ?? 'Please fill all required fields';
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final user = await _authRepository.signUp(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
        name: _nameController.text.trim(),
        role: _selectedRole,
        preferredLanguage: _selectedLanguage,
        phoneNumber: _phoneController.text.trim(),
      );

      if (user != null && mounted) {
        _showSuccessDialog(user.publicUserId);
      }
    } catch (e) {
      setState(() {
        _errorMessage = AppLocalizations.of(context)?.translate('signup_error') ?? 'Signup failed. Please try again.';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showSuccessDialog(String publicUserId) {
    final loc = AppLocalizations.of(context);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFFFAFAFA),
        title: AccessibleText(
          loc?.translate('account_created') ?? 'Account Created!',
          fontWeight: FontWeight.bold,
          color: const Color(0xFF138808), // Success Green
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AccessibleText(loc?.translate('your_id_is') ?? 'Your unique ID is:'),
            const SizedBox(height: 16),
            SelectableText(
              publicUserId,
              style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Color(0xFF303F9F)),
            ),
            const SizedBox(height: 16),
            AccessibleText(
              loc?.translate('keep_id_safe') ?? 'Please keep this safe. Your Care Partner will need it.',
              baseFontSize: 16,
              textAlign: TextAlign.center,
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              if (_selectedRole == 'caregiver') {
                Navigator.pushReplacementNamed(context, AppRoutes.caregiverPortal);
              } else {
                Navigator.pushReplacementNamed(context, AppRoutes.home);
              }
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFFF9933), // Saffron
              foregroundColor: Colors.white,
            ),
            child: Text(loc?.translate('continue_button') ?? 'Continue', style: const TextStyle(fontSize: 18)),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(loc?.translate('signup_title') ?? 'Create Account', style: TextStyle(color: theme.colorScheme.primary, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: theme.colorScheme.primary),
      ),
      body: CulturalBackground(
        imageAsset: 'lotus.png',
        imageAlignment: Alignment.bottomCenter,
        imageOpacity: 0.25,
        imageWidth: 280,
        imageHeight: 280,
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 80),
                TextField(
                  controller: _nameController,
                  style: const TextStyle(fontSize: 20),
                  decoration: InputDecoration(
                    labelText: loc?.translate('full_name') ?? 'Full Name',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.9),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: const TextStyle(fontSize: 20),
                  decoration: InputDecoration(
                    labelText: loc?.translate('email_label') ?? 'Email Address',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.9),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  style: const TextStyle(fontSize: 20),
                  decoration: InputDecoration(
                    labelText: loc?.translate('password_label') ?? 'Password',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.9),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  style: const TextStyle(fontSize: 20),
                  decoration: InputDecoration(
                    labelText: loc?.translate('phone_optional') ?? 'Phone Number (Optional)',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.9),
                  ),
                ),
                const SizedBox(height: 24),

                AccessibleText(
                  loc?.translate('i_am_a') ?? 'I am a...',
                  baseFontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: theme.colorScheme.primary,
                ),
                const SizedBox(height: 8),
                SegmentedButton<String>(
                  segments: [
                    ButtonSegment(
                        value: 'user',
                        label: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          child: Text(loc?.translate('role_user') ?? 'User', style: const TextStyle(fontSize: 18)),
                        )
                    ),
                    ButtonSegment(
                        value: 'caregiver',
                        label: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          child: Text(loc?.translate('role_caregiver') ?? 'Care Partner', style: const TextStyle(fontSize: 18)),
                        )
                    ),
                  ],
                  selected: {_selectedRole},
                  onSelectionChanged: (Set<String> newSelection) {
                    setState(() {
                      _selectedRole = newSelection.first;
                    });
                  },
                ),

                const SizedBox(height: 24),
                AccessibleText(
                  loc?.translate('preferred_language') ?? 'Preferred Language',
                  baseFontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: theme.colorScheme.primary,
                ),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.9),
                    border: Border.all(color: Colors.grey.shade400),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedLanguage,
                      isExpanded: true,
                      style: const TextStyle(fontSize: 20, color: Colors.black87),
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
                          widget.accessibilityController.changeLocale(newValue);
                        }
                      },
                    ),
                  ),
                ),

                if (_errorMessage != null) ...[
                  const SizedBox(height: 16),
                  AccessibleText(
                    _errorMessage!,
                    color: Colors.red.shade800,
                    baseFontSize: 16,
                    fontWeight: FontWeight.bold,
                    textAlign: TextAlign.center,
                  ),
                ],
                const SizedBox(height: 32),

                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ElevatedButton(
                  onPressed: _handleSignup,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFF9933), // Indian Saffron
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 4,
                  ),
                  child: Text(
                    loc?.translate('signup_button') ?? 'Sign Up',
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ),
      ),
    );
  }
}