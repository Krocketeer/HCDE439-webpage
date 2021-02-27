/*
 * Kenny "Ackerson" Le
 * 2/25/21
 * Lec10WebCommunication
 * Description:
 */

#include <Arduino.h>
int SW = 2;
int VRx = A0;
int VRy = A1;

void setup() {
    pinMode(VRx, INPUT);
    pinMode(VRy, INPUT);
    pinMode(SW, INPUT_PULLUP);
    Serial.begin(9600);
}

void loop() {
    int xCoord = analogRead(VRx);
    int yCoord = analogRead(VRy);
    int switch_state = digitalRead(2);
    Serial.print("[");
    Serial.print(xCoord);
    Serial.print(",");
    Serial.print(yCoord);
    Serial.println("]");
    Serial.println(switch_state);
    delay(100);
}