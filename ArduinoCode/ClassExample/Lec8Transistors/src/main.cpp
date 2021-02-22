/*
 * Fading
 * This example shows how to fade an LED using the analogWrite() function.
 * The circuit:
 * - LED attached from digital pin 9 to ground.
 * created 1 Nov 2008
 * by David A. Mellis
 * modified 30 Aug 2011
 * by Tom Igoe
 * This example code is in the public domain.
 * http://www.arduino.cc/en/Tutorial/Fading
 */

#include <Arduino.h>
#include "DCMotor.h"
#include "LEDFade.h"
#include "HBridgeDCMotor.h"

void setup() {
// write your initialization code here
    DCMotorSetup();
//    HBridgeDCMotorSetup();
}

void loop() {
    DCMotorLoop();
//    LEDFadeLoop();
//    HBridgeDCMotorLoop();
}