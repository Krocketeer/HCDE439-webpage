/*
 * Base code credit to contributors and developers of Debounce on Arduino
 * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce
 */

// Import statement to make Arduino work with Clion
#include <Arduino.h>

const int R = 11; // pin of Red LED
const int B = 9; // pin of Blue LED
const int buttonPin = 2; // the number of push button pin

int ledState = HIGH;         // the current state of the output pin
int buttonState;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {
    // initialize each LED pin as an output
    pinMode(R, OUTPUT);
    pinMode(B, OUTPUT);

    // initialize button pin as an input
    pinMode(buttonPin, INPUT);

    // initialize serial monitor with baud 9600 for debugging
    Serial.begin(9600);
}

void loop() {
    // read the state of the push button value
    int reading = digitalRead(buttonPin);

    // if the state of the push button isn't the same as the previous button state
    if (reading != lastButtonState) {
        // reset the debouncing timer
        lastDebounceTime = millis();
    }

    // if the time since the lastDebounceTime is more than the debounce delay of .05 seconds
    if ((millis() - lastDebounceTime) > debounceDelay) {
        // whatever the reading is at, it's been there for longer than the debounce
        // delay, so take it as the actual current state:

        // if the button state has changed:
        if (reading != buttonState) {
            buttonState = reading;

            // only toggle the LED if the new button state is HIGH
            if (buttonState == HIGH) {
                ledState = !ledState;
            }
        }
    }

    // This if statement will cause the light to stay on after one press
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
    } else {
        digitalWrite(B, LOW);
    }

    // The below if statement worked with
//    if (ledState) {
//        digitalWrite(B, HIGH);
//    } else {
//        digitalWrite(B, LOW);
//    }

    lastButtonState = reading;
}