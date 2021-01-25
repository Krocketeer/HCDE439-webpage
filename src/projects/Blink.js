import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue, dracula, obsidian } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import BlinkCover from "../images/Blink/IMG_2129.png"
import schematic from "../images/Blink/circuit.svg"
import circuit from "../images/Blink/IMG_2129.jpeg"
import blinkingLEDs from "../images/Blink/Blinking.gif"

const Container = tw.div`relative`;
// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function Blink() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={BlinkCover} alt="Arduino controlled blinking LEDs with Button "
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">Blink!</h3>
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
                            <p> To create a schematic for at least 3 LEDs connected to an Arduino as a circuit on a
                                breadboard. The LEDs must be able to blink in a pattern.
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">In-Class Activities</h6>
                        <p> Since this was our first Arduino project, much of class time was spent going over some
                            examples of simple circuits we could build — namely the built-in examples of
                            <a href={links.blinkExample} style={{color: "rgb(100, 21, 255)"}}> Blink </a> and
                            <a href={links.buttonExample} style={{color: "rgb(100, 21, 255)"}}> Button</a>. The code and
                            schematics of these were relatively simple enough to follow along with which gave me a good
                            foundation with to go into the assignment.
                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Combining Blink and Button</h6>
                        <div style={styles.centerDiv50}>
                            <p> I ended up being able to create both the Blink and Button examples on two different half
                                breadboards as I had purchased a couple extra breadboards for a previous
                                <a href={links.jps} style={{color: "rgb(100, 21, 255)"}}> HCDE project</a>. Instead of
                                removing the components for each example, I thought it would be a great idea to combined
                                them both onto one breadboard as I wanted a way to still have both examples. With that
                                in mind, I drew up a schematic that would combine the two example projects, while
                                adapting it to fit the requirements for the first assignment.
                            </p>
                            <img id="SeaTransMoodBoard" src={schematic} alt="Schematic that connects 3 LEDs and a button to an Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                It was pretty straightforward on how to build the circuit once I had the schematic
                                created. I carefully pulled out the components from the in-class Blink circuit and
                                repositioned them so that they matched the schematic. Afterwards, did the same for the
                                in-class Button circuit except I put the components on the same breadboard that housed
                                Blink circuit. I then connected all the ground wires appropriately so that all the LEDs
                                and the button would be fully connected.

                            </p>
                            <img id="SeaTransColor" src={circuit} alt="Fully built circuit of 3 LEDs, resistors, button, and the Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After everything was plugged in, it was now time to program the code that would enable
                                the circuit to work properly. Using the in-class examples of Blink and Button, I compiled
                                the two and modified it to work properly with schematic. For the pattern of the LEDs, I
                                decided to have one LED turn on and off, followed by the other two, one after another.
                                This was done using <span style={{backgroundColor: "rgb(245, 245, 245)", fontFamily: "Monaco"}}>
                                    digitalWrite(pinNumber, LOW)
                                </span> and <span style={{backgroundColor: "rgb(245, 245, 245)", fontFamily: "Monaco"}}>
                                     digitalWrite(pinNumber, HIGH)
                                </span>.
                                {"\n"}Below is the full code for the Blink circuit:
                            </p>
                            <CopyBlock text={code} language="c" theme={monoBlue}/>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">The Result</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After a few moments to allow the Arduino IDE verify and upload the code, it was now time
                                to test it. With the press of the button...
                            </p>
                            <div style={styles.centerDiv}>
                                <img id="SeaTransIcons" src={blinkingLEDs} alt="Gif of LEDs blinking in successive order after pressing the button" />
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
    blinkExample: "https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink",
    buttonExample: "https://www.arduino.cc/en/Tutorial/BuiltInExamples/Button",
    jps: "https://www.kennyle.com/projects/JointPressureSleeve"
}

const lightboxOptions = {
    showDownloadButton: false,
}

const code = "/*\n" +
    " * Base code credit to contributors and developers of Blink on Arduino\n" +
    " * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink\n" +
    " */\n" +
    "\n" +
    "// Global Variables\n" +
    "const int buttonPin = 2;     // the number of the pushbutton pin\n" +
    "const int redLED = 12;       // pin of redLED\n" +
    "const int whiteLED = 10;     // pin of whiteLED\n" +
    "const int greenLED = 8;      // pin of greenLED\n" +
    "int buttonState = 0;         // variable for reading the pushbutton status\n" +
    "\n" +
    "void setup() {\n" +
    "  // initialize the pushbutton pin as an input:\n" +
    "  pinMode(buttonPin, INPUT);\n" +
    "\n" +
    "  // initialize each LED pin as an output:\n" +
    "  pinMode(redLED, OUTPUT);\n" +
    "  pinMode(whiteLED, OUTPUT);\n" +
    "  pinMode(greenLED, OUTPUT);\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "  // read the state of the pushbutton value:\n" +
    "  buttonState = digitalRead(buttonPin);\n" +
    "\n" +
    "  // If the button is pressed, execute the following code (succession of blinks)\n" +
    "  if (buttonState == HIGH) {\n" +
    "    //Turn on the redLED by making voltage HIGH\n" +
    "    digitalWrite(redLED, HIGH);\n" +
    "    \n" +
    "    // wait for .15 seconds\n" +
    "    delay(300); \n" +
    "    \n" +
    "    // turn off the redLED by making the voltage LOW \n" +
    "    digitalWrite(redLED, LOW);\n" +
    "    //Turn on the whiteLED\n" +
    "    digitalWrite(whiteLED, HIGH);\n" +
    "    \n" +
    "    // wait for .15 seconds\n" +
    "    delay(100);\n" +
    "\n" +
    "    //Turn off the whiteLED\n" +
    "    digitalWrite(whiteLED, LOW);\n" +
    "    //Turn on the greenLED\n" +
    "    digitalWrite(greenLED, HIGH);\n" +
    "\n" +
    "    // wait for .15 seconds\n" +
    "    delay(300);\n" +
    "\n" +
    "    //Turn on the greenLED\n" +
    "    digitalWrite(greenLED, LOW);\n" +
    "  } else {\n" +
    "    //Turn off all the LEDs if button is not pressed\n" +
    "    digitalWrite(redLED, LOW);\n" +
    "    digitalWrite(whiteLED, LOW);\n" +
    "    digitalWrite(greenLED, LOW);\n" +
    "  }\n" +
    "}"