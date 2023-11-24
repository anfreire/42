import 'package:flutter/material.dart';

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

class CalcButtons extends StatefulWidget {
  final String expression;
  final String result;
  const CalcButtons(
      {super.key, required this.expression, required this.result});

  @override
  State<CalcButtons> createState() => _CalcButtonsState();
}

class _CalcButtonsState extends State<CalcButtons> {
  @override
  Widget build(BuildContext context) {
    return Expanded(
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
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        for (var button in row)
                          Expanded(
                              flex: 1,
                              child: TextButton(
                                  child: Text(
                                    button,
                                    style: TextStyle(
                                        color: redButtons.contains(button)
                                            ? Colors.red
                                            : whiteButtons.contains(button)
                                                ? Colors.white
                                                : Colors.black,
                                        fontSize: 30),
                                  ),
                                  onPressed: () => {
                                        button != '' ? debugPrint(button) : null
                                      }))
                      ],
                    ))
            ])));
  }
}
