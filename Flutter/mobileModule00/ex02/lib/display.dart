import 'package:flutter/material.dart';

class CalcDisplay extends StatelessWidget {
  final String expression;
  final String result;
  const CalcDisplay(
      {super.key, required this.expression, required this.result});

  @override
  Widget build(BuildContext context) {
    return Expanded(
        flex: 1,
        child: Container(
          color: Colors.blueGrey.shade900,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              for (var line in [expression, result])
                Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                  Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Text(
                      line,
                      style: TextStyle(
                        color: Colors.blueGrey.shade400,
                        fontSize: 50,
                      ),
                    ),
                  ),
                ]),
            ],
          ),
        ));
  }
}
