import 'package:flutter/material.dart';

class AccessibleText extends StatelessWidget {
  final String text;
  final double baseFontSize;
  final FontWeight fontWeight;
  final Color? color;
  final TextAlign textAlign;
  final int? maxLines;

  const AccessibleText(
      this.text, {
        super.key,
        this.baseFontSize = 18.0,
        this.fontWeight = FontWeight.normal,
        this.color,
        this.textAlign = TextAlign.start,
        this.maxLines,
      });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Text(
      text,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: maxLines != null ? TextOverflow.ellipsis : null,
      style: TextStyle(
        fontSize: baseFontSize,
        fontWeight: fontWeight,
        color: color ?? theme.colorScheme.onSurface,
        height: 1.35,
      ),
    );
  }
}