/*
 * Kenny "Ackerson" Le
 * 3/2/21
 * Final Project: LightStripButtons
 * Description: Allows the control of a LED Light Bar with an Arduino and buttons
 * Credits: These resources were used as starters for this project
 *  - Debounce (https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce), Arduino
 */

// Import statement to allow Arduino to work with Clion
#include <Arduino.h>

// Global constants for LEDs and button pins
const int whiteLED = 12;
const int blueLED = 10;
const int whiteButtonPin = 4;
const int blueButtonPin = 2;
const int offButtonPin = 6;

int lastLED = 12;                   // variable to keep track which LED was turned on last
int ledState = HIGH;                // variable to track the current LED state
int onButton1State;                 // variable to track button1's state
int onButton2State;                 // variable to track
int lastButtonState = LOW;          // variable to track last power state of button 1
int lastButtonState2 = LOW;         // variable to track last power state of button 2
unsigned long lastDebounceTime = 0; // the last time the output pin was toggled
unsigned long debounceDelay = 50;   // debounce time delay tracker


void ButtonSetup() {
    // initialize each button pin as input
    pinMode(whiteButtonPin, INPUT);
    pinMode(blueButtonPin, INPUT);
    pinMode(offButtonPin, INPUT);

    // initialize each LED pin as output
    pinMode(whiteLED, OUTPUT);
    pinMode(blueLED, OUTPUT);

    // initialize each LED as off (using P-Channel transistors so HIGH means off)
    digitalWrite(whiteLED, HIGH);
    digitalWrite(blueLED, HIGH);
}

void ButtonLoop() {
    // Read the button pins
    int onButton1Reading = digitalRead(whiteButtonPin);
    int onButton2Reading = digitalRead(blueButtonPin);
    int offButtonReading = digitalRead(offButtonPin);

    // if state of button isn't the same as the previous button state
    if (onButton1Reading != lastButtonState || onButton2Reading != lastButtonState2) {
        // reset the debounce timer
        lastDebounceTime = millis();
    }

    /* Controls first on state -> Blue */
    // If time since lastDebounceTime is more than debounce delay
    if ((millis() - lastDebounceTime) > debounceDelay) {
        //If button state has changed
        if (onButton1Reading != onButton1State) {
            // set the button state to the current reading
            onButton1State = onButton1Reading;
            // only toggle the LED if the button state is HIGH
            if (onButton1State == HIGH) {
                // if the light bar is on and the last LED on was white
                if (ledState == LOW && lastLED == 12) {
                    // turn on blue and turn off white, set lastLED to blue
                    digitalWrite(blueLED, LOW);
                    digitalWrite(whiteLED, HIGH);
                    lastLED = 10;
                } else { // if light bar is off or if last LED was blue
                    // change the led state, set blue to the LED state, turn white off, and set lastLED to blue
                    ledState = !ledState;
                    digitalWrite(blueLED, ledState);
                    digitalWrite(whiteLED, HIGH);
                    lastLED = 10;
                }
            }
        }
    }

    /* Controls second on state -> White */
    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (onButton2Reading != onButton2State) {
            onButton2State = onButton2Reading;
            if (onButton2State == HIGH) {
                // if the light bar is on and the last LED on was blue
                if (ledState == LOW && lastLED == 10) {
                    // turn on white and turn off blue, set lastLED to white
                    digitalWrite(whiteLED, LOW);
                    digitalWrite(blueLED, HIGH);
                    lastLED = 12;
                } else { // if light bar is off or if last LED was white
                    // change the led state, set white to the LED state, turn blue off, and set lastLED to white
                    ledState = !ledState;
                    digitalWrite(whiteLED, ledState);
                    digitalWrite(blueLED, HIGH);
                    lastLED = 12;
                }
            }
        }
    }

    /* Controls off state */
    if ((millis() - lastDebounceTime) > debounceDelay) {
        // If off button is pressed, turn off all LEDs
        if (offButtonReading == HIGH) {
            digitalWrite(blueLED, HIGH);
            digitalWrite(whiteLED, HIGH);
            // if ledState is not off, set it to off
            if (!ledState) {
                ledState = !ledState;
            }
        }
    }

    // Save the readings for the last button states
    lastButtonState = onButton1Reading;
    lastButtonState2 = onButton2Reading;
}
