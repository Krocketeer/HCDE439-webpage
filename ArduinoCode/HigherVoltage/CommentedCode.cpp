/*
 * Kenny "Ackerson" Le
 * HCDE 439, Winter 2021
 * 2/21/21
 * Assignment 5: HigherVoltage!
 * Description: Allows the control of a DC Motor with a IR Sensor & Remote
 * Credits: These resources were used as starters for this project
 *  - IRRemote (https://github.com/z3t0/Arduino-IRremote), Armin Joachimsmeyer
 *  - Debounce (https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce), Arduino
 */

// Import statements for Arduino and IRremote to work with CLion
#include <Arduino.h>
#include <IRremote.h>

#define DECODE_NEC 1    // IrRemote protocol
int IR_RECEIVE_PIN = 2; // Pin of IR Sensor

const int motorPin = 6; // Pin of the DC Motor
const int greenLED = 9; // Pin of green diode of RGB LED
const int redLED = 10;  // Pin of red diode of RGB LED

int motorRPM = 255; // variable to keep track of RPM of DC Motor

boolean powerState = false;     // variable to track if power button is pressed
boolean lastPowerState = false; // variable to track the last power state

unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 750;    // the debounce time; increase if the output flickers

void setup() {
    // initialize each LED pin as an output
    pinMode(motorPin, OUTPUT);
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
                // If RPM is less than the max value
                if (motorRPM < 255) {
                    motorRPM += 17;
                }
                break;

            // Volume - button pressed
            case 0x15: Serial.println("Volume -");
                // If RPM is greater than the minimum value
                if (motorRPM > 0) {
                    motorRPM -= 17;
                }
                break;

            // If any other button is pressed, print to serial
            default:
                Serial.println("Unrecognized Command");
        }
    }

    // If power button is pressed turn on DC Motor
    if (powerState) {
        // Set DC Motor to motorRPM value
        analogWrite(motorPin, motorRPM);
        // Turn on the Green LED to indicate DC Motor is on
        digitalWrite(greenLED, HIGH);
        // Turn off Red LED
        digitalWrite(redLED, LOW);
    } else {
        // Set DC Motor to 0 to turn off
        analogWrite(motorPin, 0);
        // Turn on the Red LED to indicate DC Motor is off
        digitalWrite(redLED, HIGH);
        // Turn off Green LED
        digitalWrite(greenLED, LOW);
    }
}