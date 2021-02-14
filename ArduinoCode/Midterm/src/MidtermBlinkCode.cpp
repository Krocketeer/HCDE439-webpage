/*
 * Kenny "Ackerson" Le
 * 2/11/21
 * Midterm
 * Description: Allows the blinking of 3 LEDs where LED 1 blinks
 * twice as fast as LED 2 and LED 2 blinks twice as fast as LED 3
 */
#include <Arduino.h>
#include "MidtermBlinkCode.h"

// Global Variables
const int redLED = 11;   // pin of redLED
const int greenLED = 10; // pin of greenLED
const int blueLED = 9;   // pin of blueLED

void MidtermBlinkSetup() {
    // initialize each LED pin as an output:
    pinMode(redLED, OUTPUT);
    pinMode(greenLED, OUTPUT);
    pinMode(blueLED, OUTPUT);
}

/*
* Red LED gets turned on and off 8 times in loop
* Green LED gets turned on and off 4 times in loop
* Blue LED gets turned on and off 2 times in loop
* Set up this way so that Green blinks twice as fast
* as Blue and Red blinks twice as fast as Green
* Achieves twice as fast since there's a delay of .1
* seconds between each turn on and turn off
*/
void MidtermBlinkLoop() {
    digitalWrite(blueLED, HIGH);
    digitalWrite(redLED, HIGH);
    delay(100);

    digitalWrite(redLED, LOW);
    digitalWrite(greenLED, HIGH);
    delay(100);

    digitalWrite(redLED, HIGH);
    delay(100);

    digitalWrite(redLED, LOW);
    digitalWrite(greenLED, LOW);
    delay(100);

    digitalWrite(redLED, HIGH);
    delay(100);

    digitalWrite(redLED, LOW);
    digitalWrite(greenLED, HIGH);
    delay(100);

    digitalWrite(redLED, HIGH);
    delay(100);

    digitalWrite(redLED, LOW);
    digitalWrite(greenLED, LOW);
    delay(100);

    digitalWrite(blueLED, LOW);
    delay(100);
}