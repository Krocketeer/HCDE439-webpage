// Import statement to make Arduino work with Clion
#include <Arduino.h>

// Global variables
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
            // set the button state to the current reading
            buttonState = reading;

            // only toggle the LED if the new button state is HIGH
            if (buttonState == HIGH) {
                // if ledState is HIGH or true
                if (ledState) {
                    // turn on blue LED by making voltage HIGH
                    digitalWrite(B, HIGH);
                    // turns blue LED to hot pink
                    // for loop that iterates from 0 to 255 increasing by 1
                    for (int i = 0; i < 256; i++) {
                        // print i to the serial monitor
                        Serial.println(i);
                        // writes analog value of i to red LED
                        analogWrite(R, i);
                        // delay for .1 seconds
                        delay(10);
                    }
                    // turns hot pink colored LED back to blue
                    // for loop that iterates from 255 to 0 decrementing by 1
                    for (int i = 255; i >= 0; i--) {
                        // print i to the serial monitor
                        Serial.println(i);
                        // writes analog value of i to red LED
                        analogWrite(R, i);
                        // delay for .1 seconds
                        delay(10);
                    }
                    // turn off LEDs by setting voltage to LOW
                    digitalWrite(R, LOW);
                    digitalWrite(B, LOW);
                    // reset State to LOW or false
                    ledState = !ledState;
                }
                else {
                    // if LED state is not high, turn blue LED off
                    digitalWrite(B, LOW);
                }
                // reset led State
                ledState = !ledState;
            }
        }
    }
    // save the reading. Next time through the loop, it'll be the lastButtonState:
    lastButtonState = reading;
}