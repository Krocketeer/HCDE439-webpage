/*
 * Kenny "Ackerson" Le
 * 2/11/21
 * Midterm
 * Description: Button activated LED with counter to display how many times
 * the button is pressed. Main code is based on Debounce example on Arduino
 * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce
*/

// Import statement to make Arduino work with Clion
#include <Arduino.h>
#include "MidtermButtonCode.h"

// Global variables
const int buttonPin = 8; // pin of push button
const int redLED = 11;   // pin of Red LED
int counter = 0;         // counter for how many times button is pushed

int ledState = HIGH;         // the current state of the output pin
int buttonState;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void MidtermButtonSetup() {
    // initialize each LED pin as an output
    pinMode(buttonPin, INPUT);
    pinMode(redLED, OUTPUT);

    // initialize serial monitor with baud 9600 for debugging
    Serial.begin(9600);
}
void MidtermButtonLoop() {
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
            // set the button state to the current reading
            buttonState = reading;

            // only toggle the LED if the new button state is HIGH
            if (buttonState == HIGH) {
                // reset State to LOW or false
                ledState = !ledState;

                // increment counter to reflect button has been pushed
                counter++;

                // Print button presses to serial monitor
                Serial.print("Number of button presses: ");
                Serial.println(counter);
            }
        }
    }

    // set the LED:
    digitalWrite(redLED, ledState);

    // save the reading. Next time through the loop, it'll be the lastButtonState:
    lastButtonState = reading;
}
