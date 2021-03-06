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

#include <Arduino.h>
#include <IRremote.h>

#define DECODE_NEC 1
int IR_RECEIVE_PIN = 2;

const int blueLED = 6;
const int greenLED = 9;
const int redLED = 10;

int lastLED = 10;
int brightness = 255;

boolean isFade = false;
boolean powerState = false;
boolean lastPowerState = false;

unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 750;    // the debounce time; increase if the output flickers


void fadeStatus();

void setup() {
    pinMode(blueLED, OUTPUT);
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
                if (brightness < 255) {
                    brightness += 17;
                }
                break;
            case 0x15: Serial.println("Volume -");
                if (brightness > 0) {
                    brightness -= 17;
                }
                break;
            case 0x40: Serial.println("Play");
                isFade = !isFade;
                break;
            case 0x0C: Serial.println("1");
                lastLED = 10;
                break;
            case 0x18: Serial.println("2");
                lastLED = 9;
                break;
            case 0x5E: Serial.println("3");
                lastLED = 6;
                break;
        }
    }

    if (powerState) {
        switch (lastLED) {
            case 10: analogWrite(redLED, brightness);
                analogWrite(blueLED, 0);
                analogWrite(greenLED, 0);
                break;
            case 9: analogWrite(greenLED, brightness);
                analogWrite(blueLED, 0);
                analogWrite(redLED, 0);
                break;
            case 6: analogWrite(blueLED, brightness);
                analogWrite(redLED, 0);
                analogWrite(greenLED, 0);
                break;
            default:
                Serial.println("Error, LED doesn't switch color");
                break;
        }
    } else {
        analogWrite(blueLED, 0);
        analogWrite(redLED, 0);
        analogWrite(greenLED, 0);
    }

    if (isFade) {
        analogWrite(blueLED, 0);
        analogWrite(redLED, 0);
        analogWrite(greenLED, 0);
        for (int i = 0; i < 256; i++) {
            fadeStatus();
            if (!isFade) {
                break;
            }
            analogWrite(lastLED, i);
            delay(10);
        }
        for (int i = 255; i >= 0; i--) {
            fadeStatus();
            if (!isFade) {
                break;
            }
            analogWrite(lastLED, i);
            delay(10);
        }
    }
}

void fadeStatus() {
    if (IrReceiver.decode()) {
        // Print a short summary of received data
        IrReceiver.printIRResultShort(&Serial);
        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {
            // We have an unknown protocol, print more info
            IrReceiver.printIRResultRawFormatted(&Serial, true);
        }
        Serial.println();
        IrReceiver.resume(); // Enable receiving of the next value

        // Press of the Func/Stop button
        if (IrReceiver.decodedIRData.command == 0x47) {
            isFade = false;
        }
    }
}