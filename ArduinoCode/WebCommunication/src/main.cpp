/*
 * Kenny "Ackerson" Le
 * 2/25/21
 * Assignment 6: Talking to the Web!
 * Description:
 */

#include <Arduino.h>
int SW = 2;
int VRx = A0;
int VRy = A1;
int LED = 5;

void sendSerial();
void readSerial();

void setup() {
    pinMode(VRx, INPUT);
    pinMode(VRy, INPUT);
    pinMode(SW, INPUT_PULLUP);
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
    int switch_state = digitalRead(2);

    Serial.print("[");
    Serial.print(xCoord);
    Serial.print(",");
    Serial.print(yCoord);
    Serial.print(",");
    Serial.print(switch_state);
    Serial.println("]");
    delay(100);
}

void readSerial() {
    if (Serial.available() > 0) {
        int inByte = Serial.read();
        Serial.write(inByte);
        Serial.print("New Data from JS");
        Serial.println(inByte);
        analogWrite(LED, inByte);
    }
}

