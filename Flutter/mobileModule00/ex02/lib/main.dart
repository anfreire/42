import 'package:ex02/buttons.dart';
import 'package:ex02/display.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String expression = "0";
  String result = "0";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(centerTitle: true, backgroundColor: Colors.blueGrey.shade500 , title: const Text('Calculator')),
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                CalcDisplay(expression: expression, result: result),
                CalcButtons(expression: expression, result: result)
              ],
            )));
  }
}
