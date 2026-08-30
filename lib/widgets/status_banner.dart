import 'package:flutter/material.dart';
import '../localization/app_localizations.dart';

class StatusBanner extends StatelessWidget {
  final bool isOnline;

  const StatusBanner({
    super.key,
    required this.isOnline,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context);
    final String message = isOnline
        ? (loc?.translate('online_status') ?? 'Connected to Cloud')
        : (loc?.translate('offline_status') ?? 'Working Offline');

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 16),
      color: isOnline ? const Color(0xFF14532D) : const Color(0xFF78350F),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            isOnline ? Icons.cloud_done_rounded : Icons.cloud_off_rounded,
            color: Colors.white,
            size: 20,
          ),
          const SizedBox(width: 8),
          Text(
            message,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}