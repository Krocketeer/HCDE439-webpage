/*
 * Kenny "Ackerson" Le
 * 2/25/21
 * Assignment 6: Talking to the Web!
 * Description: Handles Arduino side of communication with P5
 * Allows the control of a LED with a joystick and a webpage using the P5.js library
 */

// Import statement to make Arduino work with Clion
#include <Arduino.h>
const int VRx = A0;      // Pin of X-axis control for joystick
const int VRy = A1;      // Pin of X-axis control for joystick

const int redLED = 11;   // Pin of red diode of RGB LED
const int greenLED = 9;  // Pin of green diode of RGB LED
const int blueLED = 6;   // Pin of blue diode of RGB LED

// Function declarations
void sendSerial();
void readSerial();
void controlLED(int byte);

void setup() {
    // initialize each LED pin as an output
    pinMode(redLED, OUTPUT);
    pinMode(greenLED, OUTPUT);
    pinMode(blueLED, OUTPUT);

    // initialize each joystick pin as an input
    pinMode(VRx, INPUT);
    pinMode(VRy, INPUT);

    // initialize serial monitor with baud 9600
    Serial.begin(9600);
    // waits .01 seconds max for serial data before timeout
    Serial.setTimeout(10);
}

void loop() {
    // calls the following functions to loop over
    sendSerial();
    readSerial();
}

// sends information from the joystick over serial to P5
void sendSerial() {
    // X and Y Coordinates of the joystick
    int xCoord = analogRead(VRx);
    // inverses the direction of up and down for the joystick
    int yCoord = map(analogRead(VRy), 0, 1023, 1023, 0);

    // Prints the coordinates to serial monitor in the format of [xCoord, yCoord]
    Serial.print("[");
    Serial.print(xCoord);
    Serial.print(",");
    Serial.print(yCoord);
    Serial.println("]");

    // delays 0.1 seconds
    delay(100);
}

// receives information from P5 to serial
void readSerial() {
    // If there is serial information available
    if (Serial.available() > 0) {
        // read the serial information
        int inByte = Serial.read();
        // Print serial information
        Serial.print("inByte value: ");
        Serial.println(inByte);

        // calls function to control LED based on serial information read in
        controlLED(inByte);
    }
}

// function to control LEDs
void controlLED(int byte) {
    // Switch case to determine what to do with byte
    switch (byte) {
        case 1: // Turns RGB LED purple
            analogWrite(redLED, 127);
            analogWrite(greenLED, 0);
            analogWrite(blueLED, 127);
            break;
        case 2: // Turns RGB LED red
            analogWrite(redLED, 255);
            analogWrite(greenLED, 0);
            analogWrite(blueLED, 0);
            break;
        case 3: // Turns RGB LED green
            analogWrite(greenLED, 255);
            analogWrite(redLED, 0);
            analogWrite(blueLED, 0);
            break;
        case 4: // turns RGB led blue
            analogWrite(blueLED, 255);
            analogWrite(greenLED, 0);
            analogWrite(redLED, 0);
            break;
        default:
            // If any other byte is read in, print byte to Serial Monitor
            Serial.print("Error, unrecognized byte: ");
            Serial.println(byte);
            break;
    }
}
