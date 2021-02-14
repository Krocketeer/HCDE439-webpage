#include <Arduino.h>
#include "CapacitiveSensorCode.h"
#include <CapacitiveSensor.h>

// 1 megaOhm resistor between pins 4 & 2, pin 2 is sensor pin, add wire, metal thing
CapacitiveSensor cs_4_2 = CapacitiveSensor(4, 2);
const int LED = 6;

long sensorValue = 0;
long sensorMin = 30000;
long sensorMax = 0;

void CapacitiveSensorSetup() {
    // turn off auto calibrate on channel 1
    cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
    Serial.begin(9600);
    pinMode(LED, OUTPUT);

    digitalWrite(LED, HIGH);

    while (millis() < 5000) {
        sensorValue = cs_4_2.capacitiveSensor(30);

        // record the maximum sensor value
        if (sensorValue > sensorMax) {
            sensorMax = sensorValue;
        }
        // record the minimum sensor value
        if (sensorValue < sensorMin) {
            sensorMin = sensorValue;
        }
    }

    digitalWrite(LED, LOW);
}

void CapacitiveSensorLoop() {
//    long start = millis();
//    long total1 = cs_4_2.capacitiveSensor(30);

    sensorValue = cs_4_2.capacitiveSensor(30);

    Serial.print("My sensor value is between ");
    Serial.print(sensorMin);
    Serial.print(" and ");
    Serial.println(sensorMax);

    // print sensor output 1
    Serial.print("I'm reading: ");
    Serial.println(sensorValue);
    Serial.println();

    delay(100);

    sensorValue = map(sensorValue, sensorMin, sensorMax, 0, 255);
    sensorValue = constrain(sensorValue, 0 , 255);
    analogWrite(LED, sensorValue);

    // check on performance in milliseconds
//    Serial.print(millis() - start);
//    Serial.print("\t");
//
//    if (total1 > 1000) {
//        digitalWrite(LED, HIGH);
//    } else {
//        digitalWrite(LED, LOW);
//    }

}