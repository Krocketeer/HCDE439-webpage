#include <Arduino.h>
#include "ServoCode.h"
#include <Servo.h>
Servo myServo;  // create a servo object

void ServoSetup() {
    myServo.attach(9); // attaches the servo on pin 9 to the servo object
}

int i = 0;
void ServoLoop() {
    // set the servo position
    myServo.write(abs(180-i));
    i++;
    i %= 360;
//    myServo.write(0); //some angle between 0 and 180

    // wait for the servo to get there
    delay(15);

}