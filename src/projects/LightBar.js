import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import LightBarCover from "../images/LightBar/IMG_2412.png"
import BasicCircuit from "../images/LightBar/IMG_2379.jpeg"
import schematic from "../images/LightBar/LightBarSchematic.svg"
import CombinedCircuitOverview from "../images/LightBar/IMG_2384.jpeg"
import CombinedCircuitSwitches from "../images/LightBar/IMG_2387.jpeg"
import CombinedCircuitLightBar from "../images/LightBar/IMG_2385.jpeg"
import Switches from "../images/LightBar/IMG_2415.jpeg"
import SwitchesSide from '../images/LightBar/IMG_2416.jpeg'
import ProjectBoxOverview from "../images/LightBar/IMG_2414.jpeg"
import ProjectBoxCircuit from "../images/LightBar/IMG_2413.jpeg"
import circuitTop from "../images/HigherVoltage/IMG_2279.jpeg";
import circuitBottom from "../images/HigherVoltage/IMG_2280.jpeg";
import circuit from "../images/HigherVoltage/IMG_2278.jpeg";

const Container = tw.div`relative`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function LightBar() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={LightBarCover}
                         alt="LED Light bar controlled by switches using an Arduino"
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">LED Light Bar</h3>
                    <h6>Physical Computing & Product Design</h6>

                    <div className="details" style={{marginTop: "50px"}}>
                        <div className="info">
                            <h6 tw="text-primary-500">Components</h6>
                            <div>Arduino</div>
                            <div>LED Light Bar</div>
                            <div>Resistors</div>
                            <div>Switches</div>
                            <div>Transistors</div>
                        </div>
                        <div id="problemSpace" style={{paddingBottom: "50px"}}>
                            <h6 tw="text-primary-500">The Goal</h6>
                            <p> To integrate the different skills learned through out the class into a physical project.
                                The project must take some input and connect that to some output using digital logic as
                                well as integrated into a prototype.
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">Finding Inspiration for my Project</h6>
                        <p> Around week 7 of the quarter, we were told to start thinking of ideas that we wanted to do
                            for our final project — incorporating Arduino into a physical product. Though, for some
                            reason I could not think of anything to do. I struggled with this for a few days, even
                            coming into class the following week where most people had already decided what their
                            project would be. I was sitting at my desk, on Zoom with my camera on when I realized that
                            my background was too dark for others to see my face. Not wanting to distract people, I
                            turned off my camera, walked over the the LED light bar I had directly behind me, to turn it
                            on. After noting how annoying it was for me to turn off my camera in order to get up and
                            turn on my light, I then realized that this could be my final project. Instead of being
                            required to turn off my camera and get up to turn on my lights, I could instead integrate
                            the Arduino into the light bar so that I could control the lights right from my desk. With
                            that in mind, I was ready to begin the final project.
                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Building a Basic Version</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                I knew there were going to be many components of the project that needed to be figured
                                out before building the full thing. I decided to start off by building a small version
                                of project by making a simple circuit that switched between two LEDs on the press of
                                two different [keyboard] switches (essentially buttons). It was pretty straight forward
                                on how to do this since I had done so before for various homework assignments. Because
                                of that I decided to take this opportunity to flesh out more of the code that would be
                                used in the final version and integrating a transistor since I would eventually need to
                                do so for the LED bar.
                            </p>
                            <div style={styles.centerDiv}>
                                <iframe className="DemoVideo"
                                        title="HCDE 439 Final Project Light Switch Testing"
                                        src="https://www.youtube.com/embed/4lGzdIIlexU"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                            </div>
                        </div>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Adding the LED Bar to the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After I got my switches to work as intended with the basic version (both circuit and
                                code wise), it was now time to incorporate the light bar into the Arduino itself.
                                Opening up the light bar's original switch, I desoldered the wires and then connected it
                                to my Arduino using two N-Channel MOSFIT transistors like I had for the smaller LED
                                light strip. However, it soon became very apparent that something was wrong since when
                                both transistors were connected, only the white LEDs of the light bar turned on and I
                                could not switch to the blue LEDs. I couldn't even turn off the light bar with both
                                transistors connected; I was only able to turn off and on one of the LED strips when one
                                transistor was connected. Stumped, I reached out to the course instructors for guidance.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Debugging Circuit Issues</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After a few days of not knowing why this was happening, I was informed that I needed
                                P-Channel MOSFET transistors since the light bar had common power instead of common ground
                                like most other circuits in the world. I eventually figured out this was because the way
                                the light bar was designed — the VCC of the power adaptor was connected to both
                                positive leads of the white and blue LED strips, hence common power. Once I had acquired
                                two P-Channel transistors (which was kind of an adventure to do since RadioShacks virtually
                                no longer exist), I hooked them up into the circuit and nothing happened. Strange.
                                Reaching out to course instructors for more assistance, I ended up working with my
                                professor for a little over two hours in order to get the transistors to work properly.
                                Using <a href={links.pChannelTutorial} style={{color: "rgb(100, 21, 255)"}}> this
                                tutorial </a> as a guide, we were successfully able to power the original LED light
                                strip (as a basic tester) with P-Channel transistors! This meant that everything was
                                ready to integrate with the actual light bar. Though, what was interesting was that we
                                connected the VCC of the power adapter into the 5V pin of the Arduino, which is
                                typically a no-go since that would fry the Arduino. However, since I was using P-Channel
                                transistors, the 5V and the VCC had to be connected but it was okay as long as I did not
                                connect their respective grounds together.
                            </p>
                            <img id="SeaTransColor" src={BasicCircuit}
                                 alt="Simple circuit of P-Channel transistor with LED light strip" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Creating the Schematic</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Using the same <a href={links.pChannelTutorial} style={{color: "rgb(100, 21, 255)"}}>
                                tutorial </a> and the basic circuit as a guide, I then created the schematic
                                for my light bar. Each button is connected with a 10 kΩ resistor since that practically
                                guarantees I would have a current close to 0 amps (.0005A = 5V / 10 kΩ) when each button
                                isn't pressed to avoid having a
                                <a href={links.floatingPin} style={{color: "rgb(100, 21, 255)"}}> floating pin</a>. 10
                                kΩ resistors were also added between the Gate terminal and the VCC to ensure that each
                                transistor remained off when it's supposed to be off, like the buttons. In addition,
                                100Ω resistors were connected between the Gate and each digital output pin of the
                                respective transistor since transistors have a small internal capacitance that would
                                damage the Arduino if left alone. No additional resistors were needed for the LED light
                                bar since they were built into the light bar itself.
                            </p>
                            <img id="SeaTransColor" src={schematic}
                                 alt="Schematic that connects a light bar to an Arduino using two transistors" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                With both the basic circuit and the switches ready, I then set out to combine them so
                                that they would work together. It was pretty straightforward doing so since I built each
                                of them on separate breadboards and only needed a few wires to connect them together.
                            </p>
                            {/*<img id="SeaTransColor" src={circuit}*/}
                            {/*     alt="Fully built circuit of RGB LED, Joystick and Arduino" />*/}
                            <div id="CombinedCircuitImages">
                                <img className="CombinedCircuit" src={CombinedCircuitOverview} alt="Overview of combined switches and LED light bar"/>
                                <img className="CombinedCircuit" src={CombinedCircuitSwitches} alt="Connection of switches to Arduino"/>
                                <img className="CombinedCircuit" src={CombinedCircuitLightBar} alt="Connection of LED light bar to Arduino"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                I coded the switches, using
                                <a href={links.debounceExample} style={{color: "rgb(100, 21, 255)"}}> Debounce </a>
                                as the starter code, so that one switch would turn off both LEDs, another switch would
                                turn on one LED, and the last switch would turn on the other LED. If you pressed the
                                same switch while the LED was on, the LED would turn off. If LED A was on and you
                                pressed the switch for LED B, then LED B would turn on. While I had fleshed out the
                                majority of this code earlier on when I was testing out the switches with the RGB LED
                                and the LED light strip, something wasn't working quite right with the light bar
                                attached. When everything was connected and powered on the first time, the light bar
                                turned on when it was originally coded to be off. In addition, when I tried to switch
                                between which LED was on, I would need to press the button twice before it swapped
                                correctly. This was then that I realized since I had used a P-Channel transistor,
                                using <span style={{backgroundColor: "rgb(245, 245, 245)", fontFamily: "Monaco"}}>
                                    digitalWrite(pinNumber, HIGH)
                                </span> meant the light bar turns off and
                                using <span style={{backgroundColor: "rgb(245, 245, 245)", fontFamily: "Monaco"}}>
                                    digitalWrite(pinNumber, LOW)
                                </span> meant the light bar turns on. After swapping all
                                my <span style={{backgroundColor: "rgb(245, 245, 245)", fontFamily: "Monaco"}}>
                                    HIGH
                                </span> and <span style={{backgroundColor: "rgb(245, 245, 245)", fontFamily: "Monaco"}}>
                                    LOW
                                </span> states, everything worked perfectly as intended. Below is the full code for the
                                Arduino circuit (uncommented version of the Arduino code can be found on
                                <a href={links.gitArduino} style={{color: "rgb(100, 21, 255)"}}> Github</a>):
                            </p>
                            <CopyBlock text={code} language="c" theme={monoBlue}/>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Prototype</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Once the circuit was working properly, it was now time to integrate it into a product.
                                The first part was finding something to house the arduino and the bread board in. I
                                immediately thought of boxes and was lucky enough to find an old sunglasses box that
                                could fit everything (even luckier was that the box was black which made it more sleek).
                                Using a box cutter, I cut out slots for the USB wire of the Arduino, the AC adapter,
                                and the wires that connected to the switches. Once that was done, it was now for the
                                tedious part of soldering hookup wire to the switches and to the light bar so that
                                everything could fit together. Now this wasn't my first time soldering, and the fact
                                that I soldered a couple of other things this quarter made this process go by a lot
                                faster. That being said, the most annoying part was having to deal with 6 wires, at 22
                                feet each, since I needed a way to have the switches stay on my desk but connect to the
                                Arduino behind me. I ended up breaking a few of the switches as I was sorting through
                                the tangled mess of wires which forced me to resolder new switches the wires a few
                                times. Finally, after what was a tedious six hour process, I was able to tape the wires
                                around my door frame, hook everything up to the Arduino, and connect it all to power.
                            </p>
                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div className="BaseCampPersonaLayout">
                                    <img className="BaseCampPersona" src={Switches} alt="Housing for the switches: X turns off everything, W controls White LEDs, B controls Blue LEDs, and F for F's in the chat"/>
                                    <img className="BaseCampPersona" src={SwitchesSide} alt="Side view of housing for switches" />
                                </div>
                                <div className="BaseCampPersonaLayout">
                                    <img className="BaseCampPersona" src={ProjectBoxOverview} alt="Arduino and breadboard housed in a sunglasses box"/>
                                    <img className="BaseCampPersona" src={ProjectBoxCircuit} alt="Closer view of the circuit on the Arduino in the box"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">The Result</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After everything was connected, I now had a fully functional way to control my LED light
                                that I could control from my desk! While it took many hours of work to accomplish, it
                                was finally finished and I can now attend Zoom meetings with good lighting, all without
                                having to leave my desk.
                            </p>
                            <div style={styles.centerDiv}>
                                <iframe className="DemoVideo"
                                        title="HCDE 439 Final Project Light Switch Testing"
                                        src="https://www.youtube.com/embed/R7wibHRGSE4"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
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
    pChannelTutorial: "https://circuitjournal.com/how-to-use-a-p-channel-mosfet-with-an-arduino",
    floatingPin: "https://www.reddit.com/r/arduino/comments/2wzbe2/why_do_i_have_to_use_a_220_ohm_resistor_on_a_push/covgqg8?utm_source=share&utm_medium=web2x&context=3",
    gitArduino: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/ArduinoCode/LightStripButtons/src/Button.cpp",
    debounceExample: "https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce",
    codeGithub: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/ArduinoCode/Libraries/src/main.cpp"
}

const lightboxOptions = {
    showDownloadButton: false,
}

const code = "/*\n" +
    " * Kenny \"Ackerson\" Le\n" +
    " * 3/2/21\n" +
    " * Final Project: LightStripButtons\n" +
    " * Description: Allows the control of a LED Light Bar with an Arduino and buttons\n" +
    " * Credits: These resources were used as starters for this project\n" +
    " *  - Debounce (https://www.arduino.cc/en/Tutorial/BuiltInExamples/Debounce), Arduino\n" +
    " */\n" +
    "\n" +
    "// Import statement to allow Arduino to work with Clion\n" +
    "#include <Arduino.h>\n" +
    "\n" +
    "// Global constants for LEDs and button pins\n" +
    "const int whiteLED = 12;\n" +
    "const int blueLED = 10;\n" +
    "const int whiteButtonPin = 4;\n" +
    "const int blueButtonPin = 2;\n" +
    "const int offButtonPin = 6;\n" +
    "\n" +
    "int lastLED = 12;                   // variable to keep track which LED was turned on last\n" +
    "int ledState = HIGH;                // variable to track the current LED state\n" +
    "int onButton1State;                 // variable to track button1's state\n" +
    "int onButton2State;                 // variable to track\n" +
    "int lastButtonState = LOW;          // variable to track last power state of button 1\n" +
    "int lastButtonState2 = LOW;         // variable to track last power state of button 2\n" +
    "unsigned long lastDebounceTime = 0; // the last time the output pin was toggled\n" +
    "unsigned long debounceDelay = 50;   // debounce time delay tracker\n" +
    "\n" +
    "\n" +
    "void ButtonSetup() {\n" +
    "    // initialize each button pin as input\n" +
    "    pinMode(whiteButtonPin, INPUT);\n" +
    "    pinMode(blueButtonPin, INPUT);\n" +
    "    pinMode(offButtonPin, INPUT);\n" +
    "\n" +
    "    // initialize each LED pin as output\n" +
    "    pinMode(whiteLED, OUTPUT);\n" +
    "    pinMode(blueLED, OUTPUT);\n" +
    "\n" +
    "    // initialize each LED as off (using P-Channel transistors so HIGH means off)\n" +
    "    digitalWrite(whiteLED, HIGH);\n" +
    "    digitalWrite(blueLED, HIGH);\n" +
    "}\n" +
    "\n" +
    "void ButtonLoop() {\n" +
    "    // Read the button pins\n" +
    "    int onButton1Reading = digitalRead(whiteButtonPin);\n" +
    "    int onButton2Reading = digitalRead(blueButtonPin);\n" +
    "    int offButtonReading = digitalRead(offButtonPin);\n" +
    "\n" +
    "    // if state of button isn't the same as the previous button state\n" +
    "    if (onButton1Reading != lastButtonState || onButton2Reading != lastButtonState2) {\n" +
    "        // reset the debounce timer\n" +
    "        lastDebounceTime = millis();\n" +
    "    }\n" +
    "\n" +
    "    /* Controls first on state -> Blue */\n" +
    "    // If time since lastDebounceTime is more than debounce delay\n" +
    "    if ((millis() - lastDebounceTime) > debounceDelay) {\n" +
    "        //If button state has changed\n" +
    "        if (onButton1Reading != onButton1State) {\n" +
    "            // set the button state to the current reading\n" +
    "            onButton1State = onButton1Reading;\n" +
    "            // only toggle the LED if the button state is HIGH\n" +
    "            if (onButton1State == HIGH) {\n" +
    "                // if the light bar is on and the last LED on was white\n" +
    "                if (ledState == LOW && lastLED == 12) {\n" +
    "                    // turn on blue and turn off white, set lastLED to blue\n" +
    "                    digitalWrite(blueLED, LOW);\n" +
    "                    digitalWrite(whiteLED, HIGH);\n" +
    "                    lastLED = 10;\n" +
    "                } else { // if light bar is off or if last LED was blue\n" +
    "                    // change the led state, set blue to the LED state, turn white off, and set lastLED to blue\n" +
    "                    ledState = !ledState;\n" +
    "                    digitalWrite(blueLED, ledState);\n" +
    "                    digitalWrite(whiteLED, HIGH);\n" +
    "                    lastLED = 10;\n" +
    "                }\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    /* Controls second on state -> White */\n" +
    "    if ((millis() - lastDebounceTime) > debounceDelay) {\n" +
    "        if (onButton2Reading != onButton2State) {\n" +
    "            onButton2State = onButton2Reading;\n" +
    "            if (onButton2State == HIGH) {\n" +
    "                // if the light bar is on and the last LED on was blue\n" +
    "                if (ledState == LOW && lastLED == 10) {\n" +
    "                    // turn on white and turn off blue, set lastLED to white\n" +
    "                    digitalWrite(whiteLED, LOW);\n" +
    "                    digitalWrite(blueLED, HIGH);\n" +
    "                    lastLED = 12;\n" +
    "                } else { // if light bar is off or if last LED was white\n" +
    "                    // change the led state, set white to the LED state, turn blue off, and set lastLED to white\n" +
    "                    ledState = !ledState;\n" +
    "                    digitalWrite(whiteLED, ledState);\n" +
    "                    digitalWrite(blueLED, HIGH);\n" +
    "                    lastLED = 12;\n" +
    "                }\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    /* Controls off state */\n" +
    "    if ((millis() - lastDebounceTime) > debounceDelay) {\n" +
    "        // If off button is pressed, turn off all LEDs\n" +
    "        if (offButtonReading == HIGH) {\n" +
    "            digitalWrite(blueLED, HIGH);\n" +
    "            digitalWrite(whiteLED, HIGH);\n" +
    "            // if ledState is not off, set it to off\n" +
    "            if (!ledState) {\n" +
    "                ledState = !ledState;\n" +
    "            }\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    // Save the readings for the last button states\n" +
    "    lastButtonState = onButton1Reading;\n" +
    "    lastButtonState2 = onButton2Reading;\n" +
    "}\n"