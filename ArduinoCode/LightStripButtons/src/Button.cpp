/*
 * Kenny "Ackerson" Le
 * 3/2/21
 * Final Project: LightStripButtons
 * Description: Allows the control of a LED Light Bar with an Arduino and buttons
 * Credits: These resources were used as starters for this project
 *  - Debounce (https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce), Arduino
 */

#include "Button.h"
#include <Arduino.h>

const int whiteLED = 12;
const int blueLED = 10;
const int whiteButtonPin = 4;
const int blueButtonPin = 2;
const int offButtonPin = 6;

int lastLED = 12;
int ledState = HIGH;
int onButton1State;
int onButton2State;
int lastButtonState = LOW;
int lastButtonState2 = LOW;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;


void ButtonSetup() {
    pinMode(whiteButtonPin, INPUT);
    pinMode(blueButtonPin, INPUT);
    pinMode(offButtonPin, INPUT);

    pinMode(whiteLED, OUTPUT);
    pinMode(blueLED, OUTPUT);

    digitalWrite(whiteLED, HIGH);
    digitalWrite(blueLED, HIGH);
    Serial.begin(9600);
}

void ButtonLoop() {
    int onButton1Reading = digitalRead(whiteButtonPin);
    int onButton2Reading = digitalRead(blueButtonPin);
    int offButtonReading = digitalRead(offButtonPin);

    if (onButton1Reading != lastButtonState || onButton2Reading != lastButtonState2) {
        lastDebounceTime = millis();
    }
    // Controls first on state -> Blue
    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (onButton1Reading != onButton1State) {
            onButton1State = onButton1Reading;
            if (onButton1State == HIGH) {
                if (ledState == LOW && lastLED == 12) {
                    digitalWrite(blueLED, LOW);
                    digitalWrite(whiteLED, HIGH);
                    lastLED = 10;
                } else {
                    ledState = !ledState;
                    digitalWrite(blueLED, ledState);
                    digitalWrite(whiteLED, HIGH);
                    lastLED = 10;
                }
            }
        }
    }

    // Controls second on state -> White
    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (onButton2Reading != onButton2State) {
            onButton2State = onButton2Reading;
            if (onButton2State == HIGH) {
                if (ledState == LOW && lastLED == 10) {
                    digitalWrite(whiteLED, LOW);
                    digitalWrite(blueLED, HIGH);
                    lastLED = 12;
                } else {
                    ledState = !ledState;
                    digitalWrite(whiteLED, ledState);
                    digitalWrite(blueLED, HIGH);
                    lastLED = 12;
                }
            }
        }
    }

    // Controls off state
    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (offButtonReading == HIGH) {
            digitalWrite(blueLED, HIGH);
            digitalWrite(whiteLED, HIGH);

            if (!ledState) {
                ledState = !ledState;
            }
        }
    }

    lastButtonState = onButton1Reading;
    lastButtonState2 = onButton2Reading;
}
