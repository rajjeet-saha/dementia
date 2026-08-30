import 'package:flutter_test/flutter_test.dart';
import 'package:redler/accessibility/accessibility_controller.dart';
import 'package:redler/app/app.dart';

void main() {
  testWidgets('App smoke test loads home screen', (WidgetTester tester) async {
    final accessibilityController = AccessibilityController();
    await tester.pumpWidget(Redler(accessibilityController: accessibilityController));
    expect(find.byType(Redler), findsOneWidget);
  });
}