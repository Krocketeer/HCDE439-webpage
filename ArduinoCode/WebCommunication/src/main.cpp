/*
 * Kenny "Ackerson" Le
 * 2/25/21
 * Assignment 6: Talking to the Web!
 * Description: Allows the control of a LED with a joystick
 * and a webpage using the P5.js library
 */

#include <Arduino.h>
const int VRx = A0;
const int VRy = A1;

const int redLED = 11;
const int greenLED = 9;
const int blueLED = 6;

void sendSerial();
void readSerial();
void controlLED(int byte);

void setup() {
    pinMode(redLED, OUTPUT);
    pinMode(greenLED, OUTPUT);
    pinMode(blueLED, OUTPUT);

    pinMode(VRx, INPUT);
    pinMode(VRy, INPUT);

    Serial.begin(9600);
    Serial.setTimeout(10);
}

void loop() {
    sendSerial();
    readSerial();
}

void sendSerial() {
    int xCoord = analogRead(VRx);
//    int yCoord = analogRead(VRy);
//    yCoord = map(yCoord, 0, 1023, 1023, 0);
    int yCoord = map(analogRead(VRy), 0, 1023, 1023, 0);

    Serial.print("[");
    Serial.print(xCoord);
    Serial.print(",");
    Serial.print(yCoord);
    Serial.println("]");
    delay(100);
}

void readSerial() {
    if (Serial.available() > 0) {
        int inByte = Serial.read();
        Serial.print("inByte value: ");
        Serial.println(inByte);
        controlLED(inByte);
    }
}

void controlLED(int byte) {
    switch (byte) {
        case 1: // purple LED on
            analogWrite(redLED, 127);
            analogWrite(greenLED, 0);
            analogWrite(blueLED, 127);
            break;
        case 2: // red LED on
            analogWrite(redLED, 255);
            analogWrite(greenLED, 0);
            analogWrite(blueLED, 0);
            break;
        case 3: // green LED on
            analogWrite(greenLED, 255);
            analogWrite(redLED, 0);
            analogWrite(blueLED, 0);
            break;
        case 4: // blue LED on
            analogWrite(blueLED, 255);
            analogWrite(greenLED, 0);
            analogWrite(redLED, 0);
            break;
        default:
            Serial.print("Error, unrecognized byte: ");
            Serial.println(byte);
            break;
    }
}
