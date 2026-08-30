import 'package:flutter/material.dart';

class AccessibleButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final IconData? icon;
  final bool isPrimary;

  const AccessibleButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.isPrimary = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    final bg = isPrimary
        ? theme.colorScheme.primary
        : theme.colorScheme.surface;
    final fg = isPrimary
        ? theme.colorScheme.onPrimary
        : theme.colorScheme.onSurface;

    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(minHeight: 72),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: bg,
          foregroundColor: fg,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: isPrimary
                ? BorderSide.none
                : BorderSide(color: theme.colorScheme.primary, width: 2),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        ),
        onPressed: onPressed,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 32),
              const SizedBox(width: 12),
            ],
            Text(
              label,
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: fg,
              ),
            ),
          ],
        ),
      ),
    );
  }
}