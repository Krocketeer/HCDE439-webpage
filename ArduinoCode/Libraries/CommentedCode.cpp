/*
 * Kenny "Ackerson" Le
 * HCDE 439, Winter 2021
 * 2/11/21
 * Assignment 4: Libraries!
 * Description: Allows the control of a LED with a IR Remote
 * Credits: These resources were used as starters for this project
 *  - IRRemote (https://github.com/z3t0/Arduino-IRremote), Armin Joachimsmeyer
 *  - Debounce (https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce), Arduino
 */

// Import statements for Arduino and IRremote to work with CLion
#include <Arduino.h>
#include <IRremote.h>
#include "CommentedCode.h"

#define DECODE_NEC 1    // IrRemote protocol
int IR_RECEIVE_PIN = 2; // Pin of IR Sensor

const int blueLED = 6;  // Pin of blue diode of RGB LED
const int greenLED = 9; // Pin of green diode of RGB LED
const int redLED = 10;  // Pin of red diode of RGB LED

int lastLED = 10;       // variable to keep track of last LED turned on, default to redLED
int brightness = 255;   // variable to keep track of LED brightness

boolean isFade = false;         // variable to track if LED fading
boolean powerState = false;     // variable to track if power button is pressed
boolean lastPowerState = false; // variable to track the last power state

unsigned long lastDebounceTime = 0;   // the last time the output pin was toggled
unsigned long debounceDelay = 750;    // the debounce time; increase if the output flickers

void setup() {
    // initialize each LED pin as an output
    pinMode(blueLED, OUTPUT);
    pinMode(greenLED, OUTPUT);
    pinMode(redLED, OUTPUT);

    // initialize serial monitor with baud 115200
    Serial.begin(115200);
    // Start the receiver, enable feedback LED, take LED feedback pin from the internal boards definition
    IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);

    Serial.print(F("Ready to receive IR signals at pin "));
    Serial.println(IR_RECEIVE_PIN);
}

void loop() {
    // If IRSensor detects an IR signal
    if (IrReceiver.decode()) {

        // Print a short summary of received data
        IrReceiver.printIRResultShort(&Serial);
        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {
            // We have an unknown protocol, print more info
            IrReceiver.printIRResultRawFormatted(&Serial, true);
        }
        Serial.println();
        // Enable receiving of the next value
        IrReceiver.resume();

        // Switch case to determine what to do with IR signal received
        switch (IrReceiver.decodedIRData.command) {
            // Power button pressed
            case 0x45: Serial.println("Power button");
                // Debounce in order to ensure predictability of power press

                if (powerState != lastPowerState) {
                    // reset the debouncing timer
                    lastDebounceTime = millis();
                }

                // If the time since last debounce is longer than the delay
                if (millis() - lastDebounceTime > debounceDelay) {
                    // Change state of power
                    powerState = !powerState;
                }
                // Update last power state to match current power state
                lastPowerState = powerState;
                break;

            // Volume + button pressed
            case 0x46: Serial.println("Volume +");
                // If brightness is less than the max value
                if (brightness < 255) {
                    brightness += 17;
                }
                break;

            // Volume - button pressed
            case 0x15: Serial.println("Volume -");
                // If brightness is greater than the minimum value
                if (brightness > 0) {
                    brightness -= 17;
                }
                break;

            // Play button is pressed
            case 0x40: Serial.println("Play");
                // Change the state of fade
                isFade = !isFade;
                break;

            // Number 1 button pressed
            case 0x0C: Serial.println("1");
                // Set lastLED to redLED
                lastLED = 10;
                break;

            // Number 2 button pressed
            case 0x18: Serial.println("2");
                // Set lastLED to greenLED
                lastLED = 9;
                break;

            // Number 3 button pressed
            case 0x5E: Serial.println("3");
                // Set lastLED to blueLED
                lastLED = 6;
                break;
            default:
                // If any other button is pressed, print to serial
                Serial.println("Unsupported button press");
        }
    }

    // If power button is pressed turn on LED
    if (powerState) {
        // Determine which LED to turn on based off last LED that was on
        switch (lastLED) {
            // If lastLED = 10, turn on redLED to brightness value and turn off all other LEDs
            case 10: analogWrite(redLED, brightness);
                analogWrite(blueLED, 0);
                analogWrite(greenLED, 0);
                break;

            // If lastLED = 9, turn on greenLED to brightness value and turn off all other LEDs
            case 9: analogWrite(greenLED, brightness);
                analogWrite(blueLED, 0);
                analogWrite(redLED, 0);
                break;

            // If lastLED = 6, turn on blueLED to brightness value and turn off all other LEDs
            case 6: analogWrite(blueLED, brightness);
                analogWrite(redLED, 0);
                analogWrite(greenLED, 0);
                break;
            // If lastLED is not one of the other values, print to serial that LED doesn't change color
            default:
                Serial.println("Error, LED doesn't switch color");
                break;
        }
    } else {
        // If power button is pressed again, turn off all LEDs
        analogWrite(blueLED, 0);
        analogWrite(redLED, 0);
        analogWrite(greenLED, 0);
    }

    // If fading is activated (by pressing play button)
    if (isFade) {
        // Turn off all LEDs in case they are on
        analogWrite(blueLED, 0);
        analogWrite(redLED, 0);
        analogWrite(greenLED, 0);

        // For loop that iterates from 0 to 255
        for (int i = 0; i < 256; i++) {
            // Check if fading is turned off
            fadeStatus();
            // If fading is turned off, exit out of for loop early
            if (!isFade) {
                break;
            }
            // Writes analog value of i to LED
            analogWrite(lastLED, i);
            // delay for .01 seconds
            delay(10);
        }

        // For loop that iterates from 255 to 0
        for (int i = 255; i >= 0; i--) {
            // Check if fading is turned off
            fadeStatus();
            // If fading is turned off, exit out of for loop early
            if (!isFade) {
                break;
            }
            // Writes analog value of i to LED
            analogWrite(lastLED, i);
            // delay for .01 seconds
            delay(10);
        }
    }
}

// Supplemental method to check if fading is turned off
void fadeStatus() {
    // If IRSensor detects an IR signal
    if (IrReceiver.decode()) {
        // Print a short summary of received data
        IrReceiver.printIRResultShort(&Serial);
        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {
            // We have an unknown protocol, print more info
            IrReceiver.printIRResultRawFormatted(&Serial, true);
        }
        Serial.println();
        IrReceiver.resume(); // Enable receiving of the next value

        // Func/Stop button is pressed, set isFade to false to turn off fading
        if (IrReceiver.decodedIRData.command == 0x47) {
            isFade = false;
        }
    }
}