/*
 * Kenny "Ackerson" Le
 * 2/18/21
 * Lec8Transistors
 * Description:
 */
#include <Arduino.h>
#include "HBridgeDCMotor.h"

int OneA = 9;
int TwoA = 7;

void HBridgeDCMotorSetup() {
    pinMode(OneA, OUTPUT);
    pinMode(TwoA, OUTPUT);
}

void HBridgeDCMotorLoop() {
    digitalWrite(OneA, LOW);
    digitalWrite(TwoA, HIGH);
}