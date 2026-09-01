import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../repositories/auth_repository.dart';
import '../../widgets/accessible_text.dart';
import '../../widgets/cultural_background.dart';
import '../../app/routes.dart';

class LoginScreen extends StatefulWidget {
  final AccessibilityController accessibilityController;

  const LoginScreen({
    super.key,
    required this.accessibilityController,
  });

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _authRepository = AuthRepository();
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final user = await _authRepository.signIn(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );

      if (user != null && mounted) {
        if (user.role == 'caregiver') {
          Navigator.pushReplacementNamed(context, AppRoutes.caregiverPortal);
        } else {
          Navigator.pushReplacementNamed(context, AppRoutes.home);
        }
      } else {
        setState(() {
          _errorMessage = AppLocalizations.of(context)?.translate('login_failed') ?? 'Login failed';
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = AppLocalizations.of(context)?.translate('login_error') ?? 'An error occurred';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        automaticallyImplyLeading: false, // Prevents the phantom back button
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.contrast_rounded),
            color: theme.colorScheme.primary,
            onPressed: () => widget.accessibilityController.toggleHighContrast(
                !widget.accessibilityController.isHighContrast),
          ),
        ],
      ),
      body: CulturalBackground(
        imageAsset: 'lotus.png',
        imageAlignment: Alignment.bottomCenter,
        imageOpacity: 0.35,
        imageWidth: 280,
        imageHeight: 280,
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Icon(
                  Icons.volunteer_activism_rounded,
                  size: 80,
                  color: const Color(0xFFFF9933).withValues(alpha: 0.9), // Softened Saffron
                ),
                const SizedBox(height: 24),
                AccessibleText(
                  loc?.translate('app_title') ?? 'Redler',
                  baseFontSize: 36,
                  fontWeight: FontWeight.w900,
                  textAlign: TextAlign.center,
                  color: theme.colorScheme.primary,
                ),
                const SizedBox(height: 8),
                AccessibleText(
                  loc?.translate('login_title') ?? 'Welcome Back',
                  baseFontSize: 24,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 48),
                TextField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: const TextStyle(fontSize: 20),
                  decoration: InputDecoration(
                    labelText: loc?.translate('email_label') ?? 'Email Address',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.9),
                  ),
                ),
                const SizedBox(height: 20),
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  style: const TextStyle(fontSize: 20),
                  decoration: InputDecoration(
                    labelText: loc?.translate('password_label') ?? 'Password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.9),
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

                // Primary Action: Translucent Saffron Button with Shadow
                _isLoading
                    ? const Center(child: CircularProgressIndicator())
                    : ElevatedButton(
                  onPressed: _handleLogin,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFF9933).withValues(alpha: 0.85),
                    foregroundColor: Colors.white,
                    shadowColor: const Color(0xFFFF9933).withValues(alpha: 0.5),
                    elevation: 8, // Soft glowing shadow
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: Text(
                    loc?.translate('login_button') ?? 'Log In',
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                  ),
                ),

                const SizedBox(height: 16),

                // Secondary Action: Translucent Green Button with Shadow
                ElevatedButton(
                  onPressed: () => Navigator.pushNamed(context, AppRoutes.signup),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF138808).withValues(alpha: 0.85),
                    foregroundColor: Colors.white,
                    shadowColor: const Color(0xFF138808).withValues(alpha: 0.5),
                    elevation: 8, // Soft glowing shadow
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: Text(
                    loc?.translate('create_account_button') ?? 'Create New Account',
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}