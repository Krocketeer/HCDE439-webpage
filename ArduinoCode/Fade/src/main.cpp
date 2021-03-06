/*
 * Base code credit to contributors and developers of Debounce on Arduino
 * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce
 */

#include <Arduino.h>

const int R = 11;
const int B = 9;
const int buttonPin = 2;

int ledState = HIGH;
int buttonState;
int lastButtonState = LOW;

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {
    pinMode(R, OUTPUT);
    pinMode(B, OUTPUT);
    pinMode(buttonPin, INPUT);

    Serial.begin(9600);
}

void loop() {
    int reading = digitalRead(buttonPin);
    if (reading != lastButtonState) {
        // reset the debouncing timer
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        // whatever the reading is at, it's been there for longer than the debounce
        // delay, so take it as the actual current state:

        if (reading != buttonState) {
            // set the button state to the current reading
            buttonState = reading;

            if (buttonState == HIGH) {
                if (ledState) {
                    digitalWrite(B, HIGH);
                    for (int i = 0; i < 256; i++) {
                        Serial.println(i);
                        analogWrite(R, i);
                        delay(10);
                    }
                    for (int i = 255; i >= 0; i--) {
                        Serial.println(i);
                        analogWrite(R, i);
                        delay(10);
                    }
                    digitalWrite(R, LOW);
                    digitalWrite(B, LOW);
                    ledState = !ledState;
                } else {
                    digitalWrite(B, LOW);
                }
                ledState = !ledState;
            }
        }
    }
    // save the reading. Next time through the loop, it'll be the lastButtonState:
    lastButtonState = reading;
}