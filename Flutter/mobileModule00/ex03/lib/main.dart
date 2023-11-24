import 'package:ex03/display.dart';
import 'package:flutter/material.dart';
import 'package:math_expressions/math_expressions.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

const buttons = [
  '7',
  '8',
  '9',
  'C',
  'AC',
  '4',
  '5',
  '6',
  '+',
  '-',
  '1',
  '2',
  '3',
  'x',
  '/',
  '0',
  '.',
  '00',
  '=',
  ''
];

const redButtons = ['C', 'AC'];
const whiteButtons = ['=', '+', '-', 'x', '/'];

class _MyAppState extends State<MyApp> {
  String expression = "0";
  String result = "0";

  calcResult() {
    setState(() {
      try {
        Parser p = Parser();
        Expression exp = p.parse(expression);
        ContextModel cm = ContextModel();
        double resultNumber = exp.evaluate(EvaluationType.REAL, cm);
        if (resultNumber == resultNumber.toInt()) {
          result = resultNumber.toInt().toString();
        } else {
          result = resultNumber.toString();
        }
      } catch (e) {
        result = 'Error';
      }
    });
  }

  handleButtonPressed(String button, BuildContext context) {
    setState(() {
      switch (button) {
        case 'C':
          expression = expression.length > 1
              ? expression.substring(0, expression.length - 1)
              : '0';
          break;
        case 'AC':
          expression = '0';
          result = '0';
          break;
        case '':
          break;
        case '=':
          calcResult();
          break;
        default:
          if (expression == '0') {
            expression = button;
          } else {
            expression += button;
          }
          break;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(
                centerTitle: true,
                backgroundColor: Colors.blueGrey.shade500,
                title: const Text('Calculator')),
            body: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                CalcDisplay(
                  key: UniqueKey(),
                  expression: expression,
                  result: result,
                ),
                Expanded(
                    flex: 1,
                    child: Container(
                        color: Colors.blueGrey.shade500,
                        child: Column(children: [
                          for (var row in [
                            buttons.sublist(0, 5),
                            buttons.sublist(5, 10),
                            buttons.sublist(10, 15),
                            buttons.sublist(15, 20)
                          ])
                            Expanded(
                                flex: 1,
                                child: Row(
                                  crossAxisAlignment:
                                      CrossAxisAlignment.stretch,
                                  children: [
                                    for (var button in row)
                                      Expanded(
                                          flex: 1,
                                          child: TextButton(
                                              child: Text(
                                                button,
                                                style: TextStyle(
                                                    color: redButtons
                                                            .contains(button)
                                                        ? Colors.red
                                                        : whiteButtons.contains(
                                                                button)
                                                            ? Colors.white
                                                            : Colors.black,
                                                    fontSize: 30),
                                              ),
                                              onPressed: () => {
                                                    handleButtonPressed(
                                                        button, context),
                                                    button != ''
                                                        ? debugPrint(button)
                                                        : null
                                                  }))
                                  ],
                                ))
                        ])))
              ],
            )));
  }
}
