import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import FadeCover from "../images/Fade/IMG_2153.png"
import schematic from "../images/Fade/FadeSchematic.svg"
import circuit from "../images/Fade/IMG_2150.jpeg"
import fadedLED from "../images/Fade/FadingLED.gif"

const Container = tw.div`relative`;
// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function Fade() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={FadeCover} alt="Arduino powered RGB LED that fades on button press"
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">Fade!</h3>
                    <h6>LEDs and Buttons</h6>

                    <div className="details" style={{marginTop: "50px"}}>
                        <div className="info">
                            <h6 tw="text-primary-500">Components</h6>
                            <div>Arduino</div>
                            <div>Button</div>
                            <div>LEDs</div>
                            <div>Resistors</div>
                        </div>
                        <div id="problemSpace" style={{paddingBottom: "50px"}}>
                            <h6 tw="text-primary-500">The Goal</h6>
                            <p> To create a schematic, circuit, and code that fades a LED. The project should use LEDs,
                                a button, a for-loop, digitalWrite(), digitalRead(), and analogWrite().
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">The Previous Project</h6>
                        <p> Although I didn't realize it then, my previous project,
                            <a href={links.blink} style={{color: "rgb(100, 21, 255)"}}> Blink</a>, had given me a head
                            start on this week's project since it incorporated a button. However, there was one thing
                            I couldn't figure out last time: how to make the LED turn on and off with the press of
                            button. Luckily, this week's class covered
                            <a href={links.debounceExample} style={{color: "rgb(100, 21, 255)"}}> Debounce </a> which
                            allows the turning off and on a LED with the press of a button. Now that I had learned how
                            to turn off and on a LED with the press of a button, I wanted to incorporate it into this
                            project — namely making a LED fade with the press of a button.
                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Creating the Schematic</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Since this week's project would be very similar to the previous one, I used Blink's
                                schematic as a starting point. I decided to keep the 10 kΩ resistor for the button since
                                that practically guaranteed I would have a current close to 0 amps (.0005A = 5V / 10 kΩ)
                                when the button isn't pressed to avoid having a
                                <a href={links.floatingPin} style={{color: "rgb(100, 21, 255)"}}> floating pin</a>.
                                Instead of using multiple LEDs this time around, I decided to use a RGB LED to create a
                                cool fading effect with multiple colors. The RGB LED still utilized a 330 Ω resistor,
                                which when using the Red and Blue diodes gave me a current of approximately 9.09mA
                                ([5V - 2V]/ 330 Ω ≈ 9.09 mA) and 5.45 mA ([5V - 3.2V]/ 330 Ω ≈ 5.45 mA) respectively,
                                using values from this
                                <a href={links.dataSheet} style={{color: "rgb(100, 21, 255)"}}> data sheet</a>. While I
                                realize that the optimal current for LEDs is around 20mA, I sided on the side of under
                                powering my LEDs so that I don't burn them out, since I tend to leave them on for long
                                periods of time while testing circuits and code.
                            </p>
                            <img id="SeaTransMoodBoard" src={schematic} alt="Schematic that connects a RGB LED and a button to an Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Like before, it was pretty straightforward on how to build the circuit once the
                                schematic was finished. Unfortunately, I dismantled my Blink circuit so that I could
                                follow along with some in-class examples so I couldn't use that as a starting point.
                                Though, it didn't take me too long to plug in the LEDs, the button, and the corresponding
                                wires to their correct positions when starting from scratch.
                            </p>
                            <img id="SeaTransColor" src={circuit} alt="Fully built circuit of RGB LED, resistors, button, and the Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                By far, this week was the most time I spent on programming the Arduino. I had switched
                                from the Arduino IDE over to using
                                <a href={links.debounceExample} style={{color: "rgb(100, 21, 255)"}}> Clion with
                                PlatformIO </a> since the Arduino IDE consistently kept crashing on me. This took a few
                                hours to configure correctly, but once it was set, I was ready to code. Adapting the
                                <a href={links.debounceExample} style={{color: "rgb(100, 21, 255)"}}> Debounce </a>
                                example also took a while since Debounce was mostly set up for turning on and off a LED
                                as opposed to fading it. My first few attempts at getting a button to activate a fade
                                didn't work so well since the LED would never turn off. However, after a late night
                                rubber duck programming session with a friend I finally realized that my fade occurred
                                in the wrong place. After moving my fade up, the circuit worked as intended. Below is
                                the full code for the Fade circuit (can also be found on
                                <a href={links.codeGithub} style={{color: "rgb(100, 21, 255)"}}> Github</a>):
                            </p>
                            <CopyBlock text={code} language="c" theme={monoBlue}/>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">The Result</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After a few moments to allow the Arduino IDE verify and upload the code (which seems to
                                take much longer on Clion than the Arduino IDE), it was now time to be faded.
                                With the press of the button...
                            </p>
                            <div style={styles.centerDiv}>
                                <img id="SeaTransIcons" src={fadedLED} alt="Gif of a fading LED after pressing the button" />
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
    blink: "/blink",
    debounceExample: "https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce",
    floatingPin: "https://www.reddit.com/r/arduino/comments/2wzbe2/why_do_i_have_to_use_a_220_ohm_resistor_on_a_push/covgqg8?utm_source=share&utm_medium=web2x&context=3",
    dataSheet: "https://www.sparkfun.com/datasheets/Components/YSL-R596CR3G4B5C-C10.pdf",
    clion: "https://docs.platformio.org/en/latest/integration/ide/clion.html",
    codeGithub: "https://github.com/Krocketeer/HCDE439-webpage/tree/master/ArduinoCode/Fade"
}

const lightboxOptions = {
    showDownloadButton: false,
}

const code = "/*\n" +
    " * Base code credit to contributors and developers of Debounce on Arduino\n" +
    " * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce\n" +
    " */\n" +
    "\n" +
    "// Import statement to make Arduino work with Clion\n" +
    "#include <Arduino.h>\n" +
    "\n" +
    "// Global variables\n" +
    "const int R = 11; // pin of Red LED\n" +
    "const int B = 9; // pin of Blue LED\n" +
    "const int buttonPin = 2; // the number of push button pin\n" +
    "\n" +
    "int ledState = HIGH;         // the current state of the output pin\n" +
    "int buttonState;             // the current reading from the input pin\n" +
    "int lastButtonState = LOW;   // the previous reading from the input pin\n" +
    "\n" +
    "// the following variables are unsigned longs because the time, measured in\n" +
    "// milliseconds, will quickly become a bigger number than can be stored in an int.\n" +
    "unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled\n" +
    "unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers\n" +
    "\n" +
    "void setup() {\n" +
    "    // initialize each LED pin as an output\n" +
    "    pinMode(R, OUTPUT);\n" +
    "    pinMode(B, OUTPUT);\n" +
    "\n" +
    "    // initialize button pin as an input\n" +
    "    pinMode(buttonPin, INPUT);\n" +
    "\n" +
    "    // initialize serial monitor with baud 9600 for debugging\n" +
    "    Serial.begin(9600);\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "    // read the state of the push button value\n" +
    "    int reading = digitalRead(buttonPin);\n" +
    "\n" +
    "    // if the state of the push button isn't the same as the previous button state\n" +
    "    if (reading != lastButtonState) {\n" +
    "        // reset the debouncing timer\n" +
    "        lastDebounceTime = millis();\n" +
    "    }\n" +
    "\n" +
    "    // if the time since the lastDebounceTime is more than the debounce delay of .05 seconds\n" +
    "    if ((millis() - lastDebounceTime) > debounceDelay) {\n" +
    "        // whatever the reading is at, it's been there for longer than the debounce\n" +
    "        // delay, so take it as the actual current state:\n" +
    "\n" +
    "        // if the button state has changed:\n" +
    "        if (reading != buttonState) {\n" +
    "            // set the button state to the current reading\n" +
    "            buttonState = reading;\n" +
    "\n" +
    "            // only toggle the LED if the new button state is HIGH\n" +
    "            if (buttonState == HIGH) {\n" +
    "                // if ledState is HIGH or true\n" +
    "                if (ledState) {\n" +
    "                    // turn on blue LED by making voltage HIGH\n" +
    "                    digitalWrite(B, HIGH);\n" +
    "                    // turns blue LED to hot pink\n" +
    "                    // for loop that iterates from 0 to 255 increasing by 1\n" +
    "                    for (int i = 0; i < 256; i++) {\n" +
    "                        // print i to the serial monitor\n" +
    "                        Serial.println(i);\n" +
    "                        // writes analog value of i to red LED\n" +
    "                        analogWrite(R, i);\n" +
    "                        // delay for .01 seconds\n" +
    "                        delay(10);\n" +
    "                    }\n" +
    "                    // turns hot pink colored LED back to blue\n" +
    "                    // for loop that iterates from 255 to 0 decrementing by 1\n" +
    "                    for (int i = 255; i >= 0; i--) {\n" +
    "                        // print i to the serial monitor\n" +
    "                        Serial.println(i);\n" +
    "                        // writes analog value of i to red LED\n" +
    "                        analogWrite(R, i);\n" +
    "                        // delay for .01 seconds\n" +
    "                        delay(10);\n" +
    "                    }\n" +
    "                    // turn off LEDs by setting voltage to LOW\n" +
    "                    digitalWrite(R, LOW);\n" +
    "                    digitalWrite(B, LOW);\n" +
    "                    // reset State to LOW or false\n" +
    "                    ledState = !ledState;\n" +
    "                } else {\n" +
    "                    // if LED state is not high, turn blue LED off\n" +
    "                    digitalWrite(B, LOW);\n" +
    "                }\n" +
    "                // reset led State\n" +
    "                ledState = !ledState;\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "    // save the reading. Next time through the loop, it'll be the lastButtonState:\n" +
    "    lastButtonState = reading;\n" +
    "}"