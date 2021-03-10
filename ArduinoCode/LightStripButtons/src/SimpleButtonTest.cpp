/*
 * Kenny "Ackerson" Le
 * 3/10/21
 * LightStripButtons
 * Description:
 */

#include <Arduino.h>
#include "SimpleButtonTest.h"

const int LED1 = 12;
const int LED2 = 10;
const int LED1ButtonPin = 2;
const int LED2ButtonPin = 4;
const int offButtonPin = 6;

int LED1State;
int LED2State;
int offState;

void SimpleButtonTestSetup() {
    pinMode(LED1ButtonPin, INPUT);
    pinMode(LED2ButtonPin, INPUT);
    pinMode(offButtonPin, INPUT);

    pinMode(LED1, OUTPUT);
    pinMode(LED2, OUTPUT);
}

void SimpleButtonTestLoop() {
    LED1State = digitalRead(LED1ButtonPin);
    LED2State = digitalRead(LED2ButtonPin);
    offState = digitalRead(offButtonPin);

    if (LED1State == HIGH) {
        digitalWrite(LED1, HIGH);
    } else {
        digitalWrite(LED1, LOW);
    }

    if (LED2State == HIGH) {
        digitalWrite(LED2, HIGH);
    } else {
        digitalWrite(LED2, LOW);
    }

    if (offState == HIGH) {
        digitalWrite(LED1, LOW);
        digitalWrite(LED2, LOW);
    }

    delay(100);
}