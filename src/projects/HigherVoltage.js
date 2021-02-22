import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import HighVCover from "../images/HigherVoltage/IMG_2283.png"

import schematic from "../images/HigherVoltage/HigherVoltageSchematic.svg"
import circuit from "../images/HigherVoltage/IMG_2278.jpeg"
import circuitTop from "../images/HigherVoltage/IMG_2279.jpeg"
import circuitBottom from "../images/HigherVoltage/IMG_2280.jpeg"
import highVoltGif from "../images/HigherVoltage/HighVoltGifLong.gif"

const Container = tw.div`relative`;
// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function HigherVoltage() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={HighVCover}
                         alt="Arduino powered RGB LED & DC Motor that is controlled by an IR Sensor and remote"
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">Higher Voltage & Transistors!</h3>
                    <h6>Transistors & External Power</h6>

                    <div className="details" style={{marginTop: "50px"}}>
                        <div className="info">
                            <h6 tw="text-primary-500">Components</h6>
                            <div>Arduino</div>
                            <div>DC Motor</div>
                            <div>IR Sensor</div>
                            <div>LEDs</div>
                            <div>Resistors</div>
                            <div>Transistor</div>
                        </div>
                        <div id="problemSpace" style={{paddingBottom: "50px"}}>
                            <h6 tw="text-primary-500">The Goal</h6>
                            <p> To create a schematic, circuit, and code that uses a transistor to control load power
                                separate from logic power and an input sensor to control a high-load output device.
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">The Danger Zone</h6>
                        <p> After taking a midterm to show our competence with basic circuits, we were finally allowed
                            to move on to circuits and parts that needed more than 5V to operate — the danger zone as
                            my professor likes to put it. During class we learned about transistors and its applications
                            in amplifying current to power various parts such as LED Strip Lights and DC Motors. While
                            I knew how dangerous electricity could be, I didn't pay too much attention to my circuit
                            until I burnt through a wire and almost started a fire because my capacitor was pointed in
                            the wrong direction. Despite experiencing a little danger from being in ~The Danger Zone~ I
                            was excited to be working with these higher voltage parts. After getting the DC Motor to
                            work correctly, I had an idea for the assignment: use the IR Sensor from last week and the
                            DC Motor to create a mini fan. The main inspiration of this came from me wanting to swap out
                            the switches in my mechanical keyboard but also not wanting to breathe in toxic solder fumes.
                            Although the lead in solder does indeed make it tastier, I wasn't ready to start inhaling
                            those fumes... yet.
                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Creating the Schematic</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Since this project would be directly building off last week's project, the IR Sensor
                                and RGB LED stayed the same. The RGB LED utilized a 330 Ω resistor which when using the
                                Red and Green diodes gave me a current of approximately 9.09mA ([5V - 2V]/ 330 Ω ≈ 9.09
                                mA) and when using values from this
                                <a href={links.LEDdataSheet} style={{color: "rgb(100, 21, 255)"}}> data sheet</a>.
                                Turning my attention to the DC Motor, I used a MOSFET transistor with a flyback diode in
                                order to prevent sudden voltage spikes that could cause damage. Then I connected two 330
                                Ω resistors in parallel with the DC Motor in order to achieve a current of 36.4 mA
                                ([12V - 6V] / 165 Ω ≈ 36.4 mA, using a power converter rated at 12V). While I knew the
                                ideal current for the DC Motor was 90 mA (from this
                                <a href={links.DCMotorDataSheet} style={{color: "rgb(100, 21, 255)"}}> data sheet</a>), I
                                opted to reduce the current by a third because operating the DC Motor at 90 mA made me
                                feel a little too uncomfortable when I did it in testing.
                            </p>
                            <img id="SeaTransMoodBoard" src={schematic} alt="Schematic that connects a RGB LED and an IR Sensor to an Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Since I was building off of last week's project, the RGB Led and the IR Sensor remained
                                the same. The only thing to add was the transistor, appropriate diodes and resistors,
                                and the DC Motor itself. When I went to go test everything to see if my connections were
                                working correctly, I saw that once the DC Motor turned on my IR Sensor would become
                                unresponsive. That was strange since I couldn't see anything that was inherently wrong
                                with my circuit. It wasn't until I booted up the Serial Monitor that I saw that once the
                                DC Motor turned on, the IR Sensor itself was reading unknown information. After some
                                googling I realized that
                                <a href={links.DCMotorNoise} style={{color: "rgb(100, 21, 255)"}}> DC Motors are known
                                    to create noise</a> which will interfere with the IR Sensor. A common way to filter out
                                this noise would be to connect a capacitor to the DC Motor, except that my Arduino kit
                                did not have a capacitor in it. Not wanting to give up and have to do a different
                                project idea (partly because I've been waiting for over a week to solder new switches
                                into my keyboard), I spent some more time on Google to see if I could find another way
                                to reduce the interference. What I eventually stumbled on was that if I connected the
                                IR Sensor and the DC Motor to separate power or ground lines, the noise would be reduced
                                enough for them to both work in tandem. Lucky enough, I had some extra half breadboards
                                and so after putting the IR Sensor on a different bread board, everything worked perfectly!
                            </p>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div className="BaseCampPersonaLayout">
                                    <img className="BaseCampPersona" src={circuitTop} alt="Top half of circuit showing RGB Led and transistor components" />
                                    <img className="BaseCampPersona" src={circuitBottom} alt="Bottom half of circuit showing IR Sensor" />
                                </div>
                                <img id="SeaTransColor" src={circuit} alt="Fully built circuit of RGB LED, IR Sensor, DC Motor and the Arduino" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Since this project was directly built off the last, I imported last week's code and went
                                to make some modifications to eliminate parts that were no longer needed. Namely, I took
                                out the fading since the goal of this project wasn't to fade a LED. Ultimately, I only
                                ended up adding a few lines of code to operate the DC Motor by pressing the power button.
                                For more in depth explanation into the base code, please look at last week's project
                                <a href={links.libraries} style={{color: "rgb(100, 21, 255)"}}> Libaries! </a>.
                                Below is the full code for the Higher Voltage circuit (uncommented version can be found
                                on <a href={links.codeGithub} style={{color: "rgb(100, 21, 255)"}}> Github</a>):
                            </p>
                            <CopyBlock text={code} language="c" theme={monoBlue}/>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">The Result</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Once the code was verified and uploaded to the Arduino. It was now time to see it all
                                come together (thankfully no almost fires happened this time)! The gif shows turning on
                                and off the DC Motor as well as adjusting its RPM.
                            </p>
                            <div style={styles.centerDiv}>
                                <img id="SeaTransIcons" src={highVoltGif} alt="Gif of a LED controlled by an IR Sensor" />
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
    DCMotorDataSheet: "https://www.arduino.cc/documents/datasheets/DCmotor.PDF",
    DCMotorNoise: "https://electronics.stackexchange.com/questions/460042/why-does-my-ir-receiver-spit-out-random-codes-when-my-motor-is-on",
    libraries: "/libraries",
    codeGithub: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/ArduinoCode/HigherVoltage/src/main.cpp"
}

const lightboxOptions = {
    showDownloadButton: false,
}

const code = "/*\n" +
    " * Kenny \"Ackerson\" Le\n" +
    " * HCDE 439, Winter 2021\n" +
    " * 2/21/21\n" +
    " * Assignment 5: HigherVoltage!\n" +
    " * Description: Allows the control of DC Motor with a IR Sensor & Remote\n" +
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
    "const int motorPin = 6; // Pin of the DC Motor\n" +
    "const int greenLED = 9; // Pin of green diode of RGB LED\n" +
    "const int redLED = 10;  // Pin of red diode of RGB LED\n" +
    "\n" +
    "int motorRPM = 255; // variable to keep track of RPM of DC Motor\n" +
    "\n" +
    "boolean powerState = false;     // variable to track if power button is pressed\n" +
    "boolean lastPowerState = false; // variable to track the last power state\n" +
    "\n" +
    "unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled\n" +
    "unsigned long debounceDelay = 750;    // the debounce time; increase if the output flickers\n" +
    "\n" +
    "void setup() {\n" +
    "    // initialize each LED pin as an output\n" +
    "    pinMode(motorPin, OUTPUT);\n" +
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
    "                // If RPM is less than the max value\n" +
    "                if (motorRPM < 255) {\n" +
    "                    motorRPM += 17;\n" +
    "                }\n" +
    "                break;\n" +
    "\n" +
    "            // Volume - button pressed\n" +
    "            case 0x15: Serial.println(\"Volume -\");\n" +
    "                // If RPM is greater than the minimum value\n" +
    "                if (motorRPM > 0) {\n" +
    "                    motorRPM -= 17;\n" +
    "                }\n" +
    "                break;\n" +
    "\n" +
    "            // If any other button is pressed, print to serial\n" +
    "            default:\n" +
    "                Serial.println(\"Unrecognized Command\");\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    // If power button is pressed turn on DC Motor\n" +
    "    if (powerState) {\n" +
    "        // Set DC Motor to motorRPM value\n" +
    "        analogWrite(motorPin, motorRPM);\n" +
    "        // Turn on the Green LED to indicate DC Motor is on\n" +
    "        digitalWrite(greenLED, HIGH);\n" +
    "        // Turn off Red LED\n" +
    "        digitalWrite(redLED, LOW);\n" +
    "    } else {\n" +
    "        // Set DC Motor to 0 to turn off\n" +
    "        analogWrite(motorPin, 0);\n" +
    "        // Turn on the Red LED to indicate DC Motor is off\n" +
    "        digitalWrite(redLED, HIGH);\n" +
    "        // Turn off Green LED\n" +
    "        digitalWrite(greenLED, LOW);\n" +
    "    }\n" +
    "}"