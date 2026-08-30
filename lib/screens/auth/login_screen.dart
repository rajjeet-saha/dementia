import 'package:flutter/material.dart';
import '../../accessibility/accessibility_controller.dart';
import '../../localization/app_localizations.dart';
import '../../repositories/auth_repository.dart';
import '../../widgets/accessible_button.dart';
import '../../widgets/accessible_text.dart';
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
        password: _passwordController.text,
      );

      if (!mounted) return;

      if (user != null) {
        if (user.role == 'care_partner') {
          Navigator.pushReplacementNamed(context, AppRoutes.caregiverPortal);
        } else {
          Navigator.pushReplacementNamed(context, AppRoutes.home);
        }
      } else {
        setState(() {
          _errorMessage = AppLocalizations.of(context)!.translate('login_failed');
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _errorMessage = AppLocalizations.of(context)!.translate('login_error');
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
    final loc = AppLocalizations.of(context)!;
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(loc.translate('login_title')),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),
              Icon(
                Icons.account_circle,
                size: 100,
                color: theme.colorScheme.primary,
              ),
              const SizedBox(height: 40),

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
                    baseFontSize: 18,
                  ),
                ),

              TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  labelText: loc.translate('email_label'),
                  labelStyle: const TextStyle(fontSize: 20),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: BorderSide(color: theme.colorScheme.primary, width: 2),
                  ),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 24),
              TextField(
                controller: _passwordController,
                obscureText: true,
                style: const TextStyle(fontSize: 20),
                decoration: InputDecoration(
                  labelText: loc.translate('password_label'),
                  labelStyle: const TextStyle(fontSize: 20),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(16),
                    borderSide: BorderSide(color: theme.colorScheme.primary, width: 2),
                  ),
                  contentPadding: const EdgeInsets.all(20),
                ),
              ),
              const SizedBox(height: 40),

              if (_isLoading)
                const Center(
                  child: CircularProgressIndicator(strokeWidth: 4),
                )
              else
                AccessibleButton(
                  label: loc.translate('login_button'),
                  onPressed: _handleLogin,
                  icon: Icons.login_rounded,
                ),

              const SizedBox(height: 24),
              AccessibleButton(
                label: loc.translate('create_account_button'),
                isPrimary: false,
                onPressed: () {
                  Navigator.pushNamed(context, AppRoutes.signup);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}