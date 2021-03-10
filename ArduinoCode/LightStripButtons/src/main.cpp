/*
 * Kenny "Ackerson" Le
 * 3/2/21
 * LightStripButtons
 * Description:
 */

#include <Arduino.h>
#include "Button.h"
#include "SimpleButtonTest.h"

const int LED = 10;

void BlinkSetup();
void BlinkLoop();

void setup() {
    ButtonSetup();
//    BlinkSetup();
//    SimpleButtonTestSetup();
}

void loop() {
    ButtonLoop();
//    BlinkLoop();
//    SimpleButtonTestLoop();
}

void BlinkSetup() {
    pinMode(LED, OUTPUT);
}

void BlinkLoop() {
    digitalWrite(LED, HIGH);
    delay(1000);
    digitalWrite(LED, LOW);
    delay(1000);
}