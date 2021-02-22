/*
 * Kenny "Ackerson" Le
 * 2/18/21
 * Lec8Transistors
 * Description:
 */
#include <Arduino.h>
#include "DCMotor.h"

int motorPin = 9;

void DCMotorSetup() {
    pinMode(motorPin, OUTPUT);
}

void DCMotorLoop() {
    analogWrite(motorPin, 250);
}