/*
 * Kenny "Ackerson" Le
 * 2/18/21
 * Lec8Transistors
 * Description:
 */
#include <Arduino.h>
#include "LEDFade.h"

int ledPin = 9;    // LED connected to digital pin 9

void LEDFadeLoop() {
    // fade in from min to max in increments of 5 points:

    for (int fadeValue = 0; fadeValue <= 255; fadeValue += 5) {
        // sets the value (range from 0 to 255):
        analogWrite(ledPin, fadeValue);
        // wait for 30 milliseconds to see the dimming effect
        delay(30);
    }
    for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
        // sets the value (range from 0 to 255):
        analogWrite(ledPin, fadeValue);
        // wait for 30 milliseconds to see the dimming effect
        delay(30);
    }
}