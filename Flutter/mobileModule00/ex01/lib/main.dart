import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

const text = ["A   simple text", "Hello World!"];

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int index = 0;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Container(
                padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 3),
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(Radius.circular(8)),
                  color: Colors.lime[900],
                ),
                child: Center(
                  child: Text(
                    text[index],
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 30,
                    ),
                  ),
                ),
              ),
            ]),
            OutlinedButton(
                style: const ButtonStyle(
                    shape: MaterialStatePropertyAll(RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(Radius.circular(20))))),
                onPressed: () =>
                    setState(() => {index += 1, index = index % 2}),
                child: const Text("Click me",
                    style: TextStyle(color: Colors.black)))
          ],
        ),
      ),
    );
  }
}
