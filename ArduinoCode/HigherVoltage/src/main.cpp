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

#include <Arduino.h>
#include <IRremote.h>

#define DECODE_NEC 1
int IR_RECEIVE_PIN = 2;

const int motorPin = 6;
const int greenLED = 9;
const int redLED = 10;

int motorRPM = 255;

boolean powerState = false;
boolean lastPowerState = false;

unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 750;    // the debounce time; increase if the output flickers

void setup() {
    pinMode(motorPin, OUTPUT);
    pinMode(greenLED, OUTPUT);
    pinMode(redLED, OUTPUT);

    Serial.begin(115200);
    IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK); // Start the receiver, enable feedback LED, take LED feedback pin from the internal boards definition

    Serial.print(F("Ready to receive IR signals at pin "));
    Serial.println(IR_RECEIVE_PIN);
}

void loop() {
    if (IrReceiver.decode()) {

        // Print a short summary of received data
        IrReceiver.printIRResultShort(&Serial);
        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {
            // We have an unknown protocol, print more info
            IrReceiver.printIRResultRawFormatted(&Serial, true);
        }
        Serial.println();
        IrReceiver.resume(); // Enable receiving of the next value

        switch (IrReceiver.decodedIRData.command) {
            case 0x45: Serial.println("Power button");
                if (powerState != lastPowerState) {
                    lastDebounceTime = millis();
                }

                if (millis() - lastDebounceTime > debounceDelay) {
                    powerState = !powerState;

                }
                lastPowerState = powerState;
                break;
            case 0x46: Serial.println("Volume +");
                if (motorRPM < 255) {
                    motorRPM += 17;
                }
                break;
            case 0x15: Serial.println("Volume -");
                if (motorRPM > 0) {
                    motorRPM -= 17;
                }
                break;
            default:
                Serial.println("Unrecognized Command");
        }
    }

    if (powerState) {
        analogWrite(motorPin, motorRPM);
        digitalWrite(greenLED, HIGH);
        digitalWrite(redLED, LOW);
    } else {
        analogWrite(motorPin, 0);
        digitalWrite(redLED, HIGH);
        digitalWrite(greenLED, LOW);
    }
}