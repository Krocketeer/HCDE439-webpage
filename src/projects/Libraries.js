import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import LibrariesCover from "../images/Libraries/IMG_2255.png"
import schematic from "../images/Libraries/LibrarySchematic.svg"
import circuit from "../images/Libraries/IMG_2256.jpeg"
import libraryGif from "../images/Libraries/LibraryLong.gif"

const Container = tw.div`relative`;
// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function Libraries() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={LibrariesCover}
                         alt="Arduino powered RGB LED that is controlled by an IR Sensor and remote"
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">Libraries!</h3>
                    <h6>LEDs and IR Sensor</h6>

                    <div className="details" style={{marginTop: "50px"}}>
                        <div className="info">
                            <h6 tw="text-primary-500">Components</h6>
                            <div>Arduino</div>
                            <div>IR Sensor</div>
                            <div>LEDs</div>
                            <div>Resistors</div>
                        </div>
                        <div id="problemSpace" style={{paddingBottom: "50px"}}>
                            <h6 tw="text-primary-500">The Goal</h6>
                            <p> To create a schematic, circuit, and code that uses a part that requires a library and
                                includes both an input part and an output part.
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">More Complex Circuits</h6>
                        <p> At this point in the class, we were now six weeks into the quarter and after spending a good
                            bit of time getting a solid foundation for Arduino circuits, it was now time that we moved
                            on to the more fun stuff. During class, we were introduced to a number of libraries that
                            were available to Arduino which lets us control the various different components in our
                            Arduino starter kit. While we walked through some cool things like capacitive sensors and
                            servo motors, I was particularly intrigued by the IR Sensor. As someone who just spent the
                            past weekend helping my family set up a strip of LED lights in the living room that could be
                            controlled with a remote, I really wanted to see if I could recreate that with my Arduino.
                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Creating the Schematic</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                I ultimately decided to just utilize one RGB LED since I could control which diode
                                turned on with the remote control. Like my previous projects, the RGB set up did not
                                change at all since I had a dedicated homework breadboard and I only ever dismantled it
                                to work on the next project. The RGB LED utilized a 330 Ω resistor which when using the
                                Red and Green diodes gave me a current of approximately 9.09mA ([5V - 2V]/ 330 Ω ≈ 9.09
                                mA) and the Blue diode gave me a current of approximately 5.45 mA
                                ([5V - 3.2V]/ 330 Ω ≈ 5.45 mA) when using values from this
                                <a href={links.LEDdataSheet} style={{color: "rgb(100, 21, 255)"}}> data sheet</a>. That
                                was it, in terms of circuit values that I had to implement for this project. The only
                                thing left was to connect the IR Sensor to my Arduino through power, ground, and data
                                (S).
                            </p>
                            <img id="SeaTransMoodBoard" src={schematic} alt="Schematic that connects a RGB LED and an IR Sensor to an Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Since half the circuit was already built from the previous project, all I had to do was
                                take out the
                                <a href={links.inout} style={{color: "rgb(100, 21, 255)"}}> photoresistor
                                    and its corresponding resistor </a> and replace it with a IR Sensor. Though one
                                thing to note that was different from last week was that I had to shift the pins for
                                the RGB LED over since pin 11 on my Arduino gave me some odd behavior with analogWrite().
                                I eventually realized that pin 11 (and pin 3) are used by the IRRemote Library for its
                                timer function.
                            </p>
                            <img id="SeaTransColor" src={circuit} alt="Fully built circuit of RGB LED, IR Sensor and the Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Like many of my previous projects, I started the programming part by using some online
                                resources as a starter. I loaded up
                                <a href={links.IRExampleCode} style={{color: "rgb(100, 21, 255)"}}> an example
                                code for the IR Sensor </a> and spent a few minutes writing a Python script to convert
                                all of the IR Remote's values, collectively founded in class, into a switch format that
                                would allow me to specify what code would run when I pressed a specific button. I then
                                mapped the power button to turn off and on the LED but like in a previous project, the
                                IR Sensor would often read my button press as multiple presses. In order to calibrate
                                the sensor and made sure it read actual button presses instead of phantom ones, I
                                modified <a href={links.debounceExample} style={{color: "rgb(100, 21, 255)"}}> Arduino's
                                Debounce </a> to work with an IR sensor. Afterwards, I then went through and added
                                functionality for the LEDs to switch between each diode (color), adjust the brightness,
                                and even fade as well. This by far was the most complex program I created for this class
                                but I didn't feel that it was too complex since many of my previous projects had similar
                                functionalities to the ones I incorporated into this one. Below is the full code for
                                the Libraries circuit (uncommented version can be found on
                                <a href={links.codeGithub} style={{color: "rgb(100, 21, 255)"}}> Github</a>):
                            </p>
                            <CopyBlock text={code} language="c" theme={monoBlue}/>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">The Result</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Once the code was verified and uploaded to the Arduino. It was now time to test it out!
                                The gif shows the full functionality of the project: turning on and off the LED,
                                switching the LED colors, adjusting the brightness, and fading the LED. (If you don't
                                see the gif right away, give it a few moments since it's a big file!).
                            </p>
                            <div style={styles.centerDiv}>
                                <img id="SeaTransIcons" src={libraryGif} alt="Gif of a LED controlled by an IR Sensor" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SRLWrapper>
    </>
};

const styles = {
    centerDiv25: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "25px"
    },
    centerDiv50: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "50px"
    },
    centerDiv: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

}

const links = {
    inout: "/inputoutput",
    LEDdataSheet: "https://www.sparkfun.com/datasheets/Components/YSL-R596CR3G4B5C-C10.pdf",
    IRExampleCode: "https://github.com/Arduino-IRremote/Arduino-IRremote/blob/master/examples/SimpleReceiver/SimpleReceiver.ino",
    debounceExample: "https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce",
    codeGithub: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/ArduinoCode/Libraries/src/main.cpp"
}

const lightboxOptions = {
    showDownloadButton: false,
}

const code = "/*\n" +
    " * Kenny \"Ackerson\" Le\n" +
    " * HCDE 439, Winter 2021\n" +
    " * 2/11/21\n" +
    " * Assignment 4: Libraries!\n" +
    " * Description: Allows the control of a LED with a IR Remote\n" +
    " * Credits: These resources were used as starters for this project\n" +
    " *  - IRRemote (https://github.com/z3t0/Arduino-IRremote), Armin Joachimsmeyer\n" +
    " *  - Debounce (https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce), Arduino\n" +
    " */\n" +
    "\n" +
    "// Import statements for Arduino and IRremote to work with CLion\n" +
    "#include <Arduino.h>\n" +
    "#include <IRremote.h>\n" +
    "\n" +
    "#define DECODE_NEC 1    // IrRemote protocol\n" +
    "int IR_RECEIVE_PIN = 2; // Pin of IR Sensor\n" +
    "\n" +
    "const int blueLED = 6;  // Pin of blue diode of RGB LED\n" +
    "const int greenLED = 9; // Pin of green diode of RGB LED\n" +
    "const int redLED = 10;  // Pin of red diode of RGB LED\n" +
    "\n" +
    "int lastLED = 10;       // variable to keep track of last LED turned on, default to redLED\n" +
    "int brightness = 255;   // variable to keep track of LED brightness\n" +
    "\n" +
    "boolean isFade = false;         // variable to track if LED fading\n" +
    "boolean powerState = false;     // variable to track if power button is pressed\n" +
    "boolean lastPowerState = false; // variable to track the last power state\n" +
    "\n" +
    "unsigned long lastDebounceTime = 0;   // the last time the output pin was toggled\n" +
    "unsigned long debounceDelay = 750;    // the debounce time; increase if the output flickers\n" +
    "\n" +
    "void setup() {\n" +
    "    // initialize each LED pin as an output\n" +
    "    pinMode(blueLED, OUTPUT);\n" +
    "    pinMode(greenLED, OUTPUT);\n" +
    "    pinMode(redLED, OUTPUT);\n" +
    "\n" +
    "    // initialize serial monitor with baud 115200\n" +
    "    Serial.begin(115200);\n" +
    "    // Start the receiver, enable feedback LED, take LED feedback pin from the internal boards definition\n" +
    "    IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);\n" +
    "\n" +
    "    Serial.print(F(\"Ready to receive IR signals at pin \"));\n" +
    "    Serial.println(IR_RECEIVE_PIN);\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "    // If IRSensor detects an IR signal\n" +
    "    if (IrReceiver.decode()) {\n" +
    "\n" +
    "        // Print a short summary of received data\n" +
    "        IrReceiver.printIRResultShort(&Serial);\n" +
    "        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {\n" +
    "            // We have an unknown protocol, print more info\n" +
    "            IrReceiver.printIRResultRawFormatted(&Serial, true);\n" +
    "        }\n" +
    "        Serial.println();\n" +
    "        // Enable receiving of the next value\n" +
    "        IrReceiver.resume();\n" +
    "\n" +
    "        // Switch case to determine what to do with IR signal received\n" +
    "        switch (IrReceiver.decodedIRData.command) {\n" +
    "            // Power button pressed\n" +
    "            case 0x45: Serial.println(\"Power button\");\n" +
    "                // Debounce in order to ensure predictability of power press\n" +
    "\n" +
    "                if (powerState != lastPowerState) {\n" +
    "                    // reset the debouncing timer\n" +
    "                    lastDebounceTime = millis();\n" +
    "                }\n" +
    "\n" +
    "                // If the time since last debounce is longer than the delay\n" +
    "                if (millis() - lastDebounceTime > debounceDelay) {\n" +
    "                    // Change state of power\n" +
    "                    powerState = !powerState;\n" +
    "                }\n" +
    "                // Update last power state to match current power state\n" +
    "                lastPowerState = powerState;\n" +
    "                break;\n" +
    "\n" +
    "            // Volume + button pressed\n" +
    "            case 0x46: Serial.println(\"Volume +\");\n" +
    "                // If brightness is less than the max value\n" +
    "                if (brightness < 255) {\n" +
    "                    brightness += 17;\n" +
    "                }\n" +
    "                break;\n" +
    "\n" +
    "            // Volume - button pressed\n" +
    "            case 0x15: Serial.println(\"Volume -\");\n" +
    "                // If brightness is greater than the minimum value\n" +
    "                if (brightness > 0) {\n" +
    "                    brightness -= 17;\n" +
    "                }\n" +
    "                break;\n" +
    "\n" +
    "            // Play button is pressed\n" +
    "            case 0x40: Serial.println(\"Play\");\n" +
    "                // Change the state of fade\n" +
    "                isFade = !isFade;\n" +
    "                break;\n" +
    "\n" +
    "            // Number 1 button pressed\n" +
    "            case 0x0C: Serial.println(\"1\");\n" +
    "                // Set lastLED to redLED\n" +
    "                lastLED = 10;\n" +
    "                break;\n" +
    "\n" +
    "            // Number 2 button pressed\n" +
    "            case 0x18: Serial.println(\"2\");\n" +
    "                // Set lastLED to greenLED\n" +
    "                lastLED = 9;\n" +
    "                break;\n" +
    "\n" +
    "            // Number 3 button pressed\n" +
    "            case 0x5E: Serial.println(\"3\");\n" +
    "                // Set lastLED to blueLED\n" +
    "                lastLED = 6;\n" +
    "                break;\n" +
    "            default:\n" +
    "                // If any other button is pressed, print to serial\n" +
    "                Serial.println(\"Unsupported button press\");\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    // If power button is pressed turn on LED\n" +
    "    if (powerState) {\n" +
    "        // Determine which LED to turn on based off last LED that was on\n" +
    "        switch (lastLED) {\n" +
    "            // If lastLED = 10, turn on redLED to brightness value and turn off all other LEDs\n" +
    "            case 10: analogWrite(redLED, brightness);\n" +
    "                analogWrite(blueLED, 0);\n" +
    "                analogWrite(greenLED, 0);\n" +
    "                break;\n" +
    "\n" +
    "            // If lastLED = 9, turn on greenLED to brightness value and turn off all other LEDs\n" +
    "            case 9: analogWrite(greenLED, brightness);\n" +
    "                analogWrite(blueLED, 0);\n" +
    "                analogWrite(redLED, 0);\n" +
    "                break;\n" +
    "\n" +
    "            // If lastLED = 6, turn on blueLED to brightness value and turn off all other LEDs\n" +
    "            case 6: analogWrite(blueLED, brightness);\n" +
    "                analogWrite(redLED, 0);\n" +
    "                analogWrite(greenLED, 0);\n" +
    "                break;\n" +
    "            // If lastLED is not one of the other values, print to serial that LED doesn't change color\n" +
    "            default:\n" +
    "                Serial.println(\"Error, LED doesn't switch color\");\n" +
    "                break;\n" +
    "        }\n" +
    "    } else {\n" +
    "        // If power button is pressed again, turn off all LEDs\n" +
    "        analogWrite(blueLED, 0);\n" +
    "        analogWrite(redLED, 0);\n" +
    "        analogWrite(greenLED, 0);\n" +
    "    }\n" +
    "\n" +
    "    // If fading is activated (by pressing play button)\n" +
    "    if (isFade) {\n" +
    "        // Turn off all LEDs in case they are on\n" +
    "        analogWrite(blueLED, 0);\n" +
    "        analogWrite(redLED, 0);\n" +
    "        analogWrite(greenLED, 0);\n" +
    "\n" +
    "        // For loop that iterates from 0 to 255\n" +
    "        for (int i = 0; i < 256; i++) {\n" +
    "            // Check if fading is turned off\n" +
    "            fadeStatus();\n" +
    "            // If fading is turned off, exit out of for loop early\n" +
    "            if (!isFade) {\n" +
    "                break;\n" +
    "            }\n" +
    "            // Writes analog value of i to LED\n" +
    "            analogWrite(lastLED, i);\n" +
    "            // delay for .01 seconds\n" +
    "            delay(10);\n" +
    "        }\n" +
    "\n" +
    "        // For loop that iterates from 255 to 0\n" +
    "        for (int i = 255; i >= 0; i--) {\n" +
    "            // Check if fading is turned off\n" +
    "            fadeStatus();\n" +
    "            // If fading is turned off, exit out of for loop early\n" +
    "            if (!isFade) {\n" +
    "                break;\n" +
    "            }\n" +
    "            // Writes analog value of i to LED\n" +
    "            analogWrite(lastLED, i);\n" +
    "            // delay for .01 seconds\n" +
    "            delay(10);\n" +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "// Supplemental method to check if fading is turned off\n" +
    "void fadeStatus() {\n" +
    "    // If IRSensor detects an IR signal\n" +
    "    if (IrReceiver.decode()) {\n" +
    "        // Print a short summary of received data\n" +
    "        IrReceiver.printIRResultShort(&Serial);\n" +
    "        if (IrReceiver.decodedIRData.protocol == UNKNOWN) {\n" +
    "            // We have an unknown protocol, print more info\n" +
    "            IrReceiver.printIRResultRawFormatted(&Serial, true);\n" +
    "        }\n" +
    "        Serial.println();\n" +
    "        IrReceiver.resume(); // Enable receiving of the next value\n" +
    "\n" +
    "        // Func/Stop button is pressed, set isFade to false to turn off fading\n" +
    "        if (IrReceiver.decodedIRData.command == 0x47) {\n" +
    "            isFade = false;\n" +
    "        }\n" +
    "    }\n" +
    "}"