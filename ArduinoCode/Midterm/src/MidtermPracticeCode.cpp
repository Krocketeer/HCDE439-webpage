/*
* Kenny "Ackerson" Le
* 2/6/21
* Midterm Practice
* Description:
*/

#include <Arduino.h>
#include "MidtermPracticeCode.h"

const int redLEDUno = 6;
const int redLEDDos = 9;
const int ablueLED = 12;

void MidtermPracticeSetup() {
    pinMode(redLEDUno, OUTPUT);
    pinMode(redLEDDos, OUTPUT);
    pinMode(ablueLED, OUTPUT);
}

void MidtermPracticeLoop() {
    digitalWrite(ablueLED, LOW);
    for (int i = 0; i < 256; i++) {
        analogWrite(redLEDUno, i);
        analogWrite(redLEDDos, i);
        delay(10);
    }
    delay(300);
    digitalWrite(ablueLED, HIGH);
    for (int i = 255; i >= 0; i--) {
        analogWrite(redLEDUno, i);
        analogWrite(redLEDDos, i);
        delay(10);
    }
    delay(300);
//    digitalWrite(redLEDUno, HIGH);
//    digitalWrite(redLEDDos, HIGH);
//    digitalWrite(ablueLED, HIGH);
}