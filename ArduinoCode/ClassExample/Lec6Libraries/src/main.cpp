#include <Arduino.h>
#include "IRRemoteCode.h"
#include "CapacitiveSensorCode.h"
#include "ServoCode.h"

void setup() {
    IRRemoteSetup();
//    CapacitiveSensorSetup();
//    ServoSetup();
}

void loop() {
    IRRemoteLoop();
//    CapacitiveSensorLoop();
//    ServoLoop();
}