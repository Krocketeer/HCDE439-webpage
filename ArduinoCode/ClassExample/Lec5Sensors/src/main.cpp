#include <Arduino.h>
const int G = 6;
const int analogInPin = A0;
//const int AnalogOutPin = 6;
int sensorValue = 0;
int outputValue = 0;
void setup() {
    Serial.begin(9600);
}

void loop() {
//    sensorValue = analogRead(analogInPin);
//    sensorValue = constrain(sensorValue, 20, 125);
    sensorValue = constrain(analogRead(analogInPin), 20, 125);
    outputValue = map(sensorValue, 20, 125, 0, 255);
    analogWrite(G, outputValue);

    // print the results to the Serial Monitor:
    Serial.print("sensor = ");
    Serial.print(sensorValue);
    Serial.print("\t output = ");
    Serial.println(outputValue);

    // wait 2 milliseconds before the next loop for the analog-to-digital
    // converter to settle after the last reading:
    delay(2);
}