#include <Arduino.h>
const int G = 9;
const int R = 11;
const int B = 10;
const int analogInPin = A0;
//const int AnalogOutPin = 6;
int sensorValue = 0;
int outputValue = 0;

void setup() {
    pinMode(R, OUTPUT);
    pinMode(G, OUTPUT);
    pinMode(B, OUTPUT);
    Serial.begin(9600);
}

void loop() {
//    sensorValue = analogRead(analogInPin);
//    sensorValue = constrain(sensorValue, 20, 125);
    sensorValue = constrain(analogRead(analogInPin), 20, 125);
    outputValue = map(sensorValue, 20, 125, 0, 255);
//    analogWrite(G, outputValue);
    if (sensorValue > 20) {
        analogWrite(G, outputValue);
        digitalWrite(R, LOW);
//        digitalWrite(B, LOW);
    } else {
        digitalWrite(G, LOW);
//        digitalWrite(B, HIGH);
        for (int i = 0; i < 256; i+= 5) {
            analogWrite(R, i);
            delay(10);
        }
        for (int i = 255; i >= 0; i-= 5) {
            analogWrite(R, i);
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