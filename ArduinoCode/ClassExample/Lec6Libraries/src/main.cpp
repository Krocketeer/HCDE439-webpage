/*
 * SimpleReceiver.cpp
 *
 * Demonstrates receiving NEC IR codes with IRrecv
 *
 *  Copyright (C) 2020-2021  Armin Joachimsmeyer
 *  armin.joachimsmeyer@gmail.com
 *
 *  This file is part of Arduino-IRremote https://github.com/z3t0/Arduino-IRremote.
 *
 *  MIT License
 */

/*
 * Specify which protocol(s) should be used for decoding.
 * If no protocol is defined, all protocols are active.
 */
#include <Arduino.h>
#include <IRremote.h>
#include <CapacitiveSensor.h>
//#define DECODE_NEC          1
//
//int IR_RECEIVE_PIN = 11;
//
//void setup() {
//    Serial.begin(115200);
//    // Just to know which program is running on my Arduino
//    Serial.println(F("START " __FILE__ " from " __DATE__ "\r\nUsing library version " VERSION_IRREMOTE));
//
//    IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK); // Start the receiver, enable feedback LED, take LED feedback pin from the internal boards definition
//
//    Serial.print(F("Ready to receive IR signals at pin "));
//    Serial.println(IR_RECEIVE_PIN);
//}
//
//void loop() {
//    /*
//     * Check if received data is available and if yes, try to decode it.
//     * Decoded result is in the IrReceiver.decodedIRData structure.
//     */
//    if (IrReceiver.decode()) {
//
//        // Print a short summary of received data
//        IrReceiver.printIRResultShort(&Serial);
//        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {
//            // We have an unknown protocol, print more info
//            IrReceiver.printIRResultRawFormatted(&Serial, true);
//        }
//        Serial.println();
//        IrReceiver.resume(); // Enable receiving of the next value
//
//        /*
//         * Finally check the received data and perform actions according to the received commands
//         */
////        if (IrReceiver.decodedIRData.command == 0x10) {
////            // do something
////        } else if (IrReceiver.decodedIRData.command == 0x11) {
////            // do something else
////        } else if (IrReceiver.decodedIRData.command == 0x45) {
////            Serial.println("You pressed the power button");
////        }
//
//        switch (IrReceiver.decodedIRData.command) {
//            case 0x45: Serial.println("Power button");
//                break;
//            case 0x46: Serial.println("Volume +");
//                break;
//            case 0x15: Serial.println("Volume -");
//                break;
//            case 0x47: Serial.println("Func/Stop");
//                break;
//            case 0x44: Serial.println("Rewind");
//                break;
//            case 0x40: Serial.println("Play");
//                break;
//            case 0x43: Serial.println("Fast Forward");
//                break;
//            case 0x09: Serial.println("Up");
//                break;
//            case 0x07: Serial.println("Down");
//                break;
//            case 0x19: Serial.println("EQ");
//                break;
//            case 0x0D: Serial.println("ST/REPT");
//                break;
//            case 0x16: Serial.println("0");
//                break;
//            case 0x0C: Serial.println("1");
//                break;
//            case 0x18: Serial.println("2");
//                break;
//            case 0x5E: Serial.println("3");
//                break;
//            case 0x08: Serial.println("4");
//                break;
//            case 0x1C: Serial.println("5");
//                break;
//            case 0x5A: Serial.println("6");
//                break;
//            case 0x42: Serial.println("7");
//                break;
//            case 0x52: Serial.println("8");
//                break;
//            case 0x4A: Serial.println("9");
//                break;
//        }
//    }
//}

/* ----------------------------------------------------------------------------------------------------- */

// 1 megaOhm resistor between pins 4 & 2, pin 2 is sensor pin, add wire, metal thing
CapacitiveSensor cs_4_2 = CapacitiveSensor(4, 2);

void setup() {
    // turn off auto calibrate on channel 1
    cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);
    Serial.begin(9600);
}

void loop() {
    long start = millis();
    long total1 = cs_4_2.capacitiveSensor(30);

    // check on performance in milliseconds
    Serial.print(millis() - start);
    Serial.print("\t");

    // print sensor output 1
    Serial.println(total1);
    delay(10);
}