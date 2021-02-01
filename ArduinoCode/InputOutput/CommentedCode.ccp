/*
 * Base code credit to contributors and developers of Analog In, Out Serial on Arduino
 * https://www.arduino.cc/en/Tutorial/BuiltInExamples/AnalogInOutSerial
 */

#include "../../../../../../../.platformio/packages/framework-arduino-avr/cores/arduino/Arduino.h"
const int G = 9; // pin of Green LED
const int R = 11; // pin of Red LED
const int analogInPin = A0; // pin for Analog Input
int sensorValue = 0; // value read from photo resistor
int outputValue = 0; //value output to the PWM (analog out)

void setup() {
    // initialize each LED pin as an output
    pinMode(R, OUTPUT);
    pinMode(G, OUTPUT);

    // initialize serial monitor with baud 9600 for debugging
    Serial.begin(9600);
}

void loop() {
    // reads in value from analog input pin and limits it to a value between 20 and 125
    sensorValue = constrain(analogRead(analogInPin), 20, 125);
    // maps output value to the range of the sensor value (from 20 to 125)
    outputValue = map(sensorValue, 20, 125, 0, 255);

    // if sensor value is greater than 20
    if (sensorValue > 20) {
        // print that Green LED is on
        Serial.print("Green LED On");
        // writes analog value of output to the green LED
        analogWrite(G, outputValue);
        // turns off Red LED by setting voltage to LOW
        digitalWrite(R, LOW);
    } else {
        // turns off Green LED by setting voltage to LOW
        digitalWrite(G, LOW);

        // Fades Red LED from off to on
        // for loop that iterates from 0 to 255 increasing by 5
        for (int i = 0; i < 256; i+= 5) {
            // print that Red LED is on
            Serial.println("Red LED On");

            // read in sensor value again to break out of for loop if value changes
            // in this case, finger uncovers the photo resistor
            sensorValue = constrain(analogRead(analogInPin), 20, 125);
            if (sensorValue > 20) {
                break;
            }

            // writes analog value of i to red LED
            analogWrite(R, i);
            // delay for .01 seconds
            delay(10);
        }

        // Fades Red LED from on to off
        // for loop that iterates from 255 to 0 decrementing by 5
        for (int i = 255; i >= 0; i-= 5) {
            // print that Red LED is on
            Serial.println("Red LED On");

            // read in sensor value again to break out of for loop if value changes
            // in this case, finger uncovers the photo resistor
            sensorValue = constrain(analogRead(analogInPin), 20, 125);
            if (sensorValue > 20) {
                break;
            }

            // writes analog value of i to red LED
            analogWrite(R, i);
            // delay for .01 seconds
            delay(10);
        }
    }

    // print the results to the Serial Monitor:
    Serial.print("sensor = ");
    Serial.print(sensorValue);
    Serial.print("\t output = ");
    Serial.println(outputValue);

    // wait 2 milliseconds before the next loop for the analog-to-digital
    // converter to settle after the last reading:
    delay(2);
}