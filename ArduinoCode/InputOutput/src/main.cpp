/*
 * Base code credit to contributors and developers of Analog In, Out Serial on Arduino
 * https://www.arduino.cc/en/Tutorial/BuiltInExamples/AnalogInOutSerial
 */

#include <Arduino.h>
const int G = 9;
const int R = 11;
const int analogInPin = A0;
int sensorValue = 0;
int outputValue = 0;

void setup() {
    pinMode(R, OUTPUT);
    pinMode(G, OUTPUT);
    Serial.begin(9600);
}

void loop() {
//    sensorValue = analogRead(analogInPin);
//    sensorValue = constrain(sensorValue, 20, 125);
    sensorValue = constrain(analogRead(analogInPin), 20, 125);
    outputValue = map(sensorValue, 20, 125, 0, 255);
    if (sensorValue > 20) {
        Serial.print("Green LED On");
        analogWrite(G, outputValue);
        digitalWrite(R, LOW);
    } else {
        digitalWrite(G, LOW);
        for (int i = 0; i < 256; i+= 5) {
            Serial.println("Red LED On");
            sensorValue = constrain(analogRead(analogInPin), 20, 125);
            if (sensorValue > 20) {
                break;
            }
            analogWrite(R, i);
            delay(10);
        }
        for (int i = 255; i >= 0; i-= 5) {
            Serial.println("Red LED On");
            sensorValue = constrain(analogRead(analogInPin), 20, 125);
            if (sensorValue > 20) {
                break;
            }
            analogWrite(R, i);
            delay(10);
        }
    }

    // print the results to the Serial Monitor:
    Serial.print("\t sensor = ");
    Serial.print(sensorValue);
    Serial.print("\t output = ");
    Serial.println(outputValue);

    // wait 2 milliseconds before the next loop for the analog-to-digital
    // converter to settle after the last reading:
    delay(2);
}