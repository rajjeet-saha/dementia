import 'package:flutter/material.dart';

class CulturalBackground extends StatelessWidget {
  final Widget child;
  final String? imageAsset;
  final Alignment imageAlignment;
  final double imageOpacity;
  final double imageWidth;
  final double imageHeight;

  const CulturalBackground({
    super.key,
    required this.child,
    this.imageAsset,
    this.imageAlignment = Alignment.bottomRight,
    this.imageOpacity = 0.20,
    this.imageWidth = 250,
    this.imageHeight = 250,
  });

  @override
  Widget build(BuildContext context) {
    // Check if the app is currently in High Contrast Mode
    final isHighContrast = Theme.of(context).brightness == Brightness.dark;

    return Stack(
      children: [
        // 1. The Background Layer
        if (isHighContrast)
        // HIGH CONTRAST: Solid black background for maximum readability
          Container(color: Colors.black)
        else
        // STANDARD: The Soft Indian Flag Gradient
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFFFFF3E0), // Soft, muted Saffron
                  Color(0xFFFAFAFA), // Pure White
                  Color(0xFFE8F5E9), // Soft, muted Green
                ],
                stops: [0.0, 0.5, 1.0],
              ),
            ),
          ),

        // 2. The Cultural Image
        // (We hide this entirely in High Contrast mode to prevent visual clutter)
        if (imageAsset != null && !isHighContrast)
          Align(
            alignment: imageAlignment,
            child: Opacity(
              opacity: imageOpacity,
              child: Image.asset(
                'assets/images/$imageAsset',
                width: imageWidth,
                height: imageHeight,
                fit: BoxFit.contain,
              ),
            ),
          ),

        // 3. The Actual Screen Content
        SafeArea(
          bottom: false,
          child: child,
        ),
      ],
    );
  }
}