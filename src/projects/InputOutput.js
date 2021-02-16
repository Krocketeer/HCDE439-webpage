import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import InOutCover from "../images/InputOutput/IMG_2220.png"
import schematic from "../images/InputOutput/InputOutputSchematic.svg"
import circuit from "../images/InputOutput/IMG_2221.jpeg"
import inOutGif from "../images/InputOutput/InputOutputGif.gif"

const Container = tw.div`relative`;
// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function InputOutput() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={InOutCover}
                         alt="Arduino powered RGB LED that switches to a blinking light on photoresistor change"
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">Input Output!</h3>
                    <h6>LEDs and Variable Resistors</h6>

                    <div className="details" style={{marginTop: "50px"}}>
                        <div className="info">
                            <h6 tw="text-primary-500">Components</h6>
                            <div>Arduino</div>
                            <div>LEDs</div>
                            <div>Photoresistor</div>
                            <div>Resistors</div>
                        </div>
                        <div id="problemSpace" style={{paddingBottom: "50px"}}>
                            <h6 tw="text-primary-500">The Goal</h6>
                            <p> To create a schematic, circuit, and code that uses a sensor in a voltage divider
                                to change the state of an LED. The project should use LEDs, a sensor (photoresistor),
                                analogRead(), analogWrite(), the map function, and an if-statement.
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">A Foundational Trend</h6>
                        <p> When was I brainstorming what I could do for this assignment, I had last week's assignment
                            in front of me,
                            <a href={links.fade} style={{color: "rgb(100, 21, 255)"}}> Fade</a>, and I realized that
                            I could basically use that as a starting point for this week's project. Instead of a button
                            to control a LED, I would use a sensor to read in a measurement of some kind. Luckily,
                            my class had gone over an existing example on Arduino's website,
                            <a href={links.analogInOutputSerial} style={{color: "rgb(100, 21, 255)"}}> Analog In Output Serial </a>
                            , that utilized a photoresistor as a sensor. Like the previous assignment, equipped with an
                            existing project and an in class example as my foundation, I was off to implement this
                            week's project.
                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Creating the Schematic</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Since I decided to just replace the button with a photoresistor from the last project to
                                this one, the RGB LED setup stayed the same. Like before, the RGB LED utilized
                                a 330 Ω resistor which when using the Red and Green diodes gave me a current of
                                approximately 9.09mA ([5V - 2V]/ 330 Ω ≈ 9.09 mA) and 5.45 mA
                                ([5V - 3.2V]/ 330 Ω ≈ 5.45 mA) respectively when using values from this
                                <a href={links.LEDdataSheet} style={{color: "rgb(100, 21, 255)"}}> data sheet</a>. In
                                order to properly decide what fixed resistance I should use in conjunction with the
                                photoresistor, I first took some resistance measurements both in the light and in the
                                dark (covered with the sleeve of my black shirt). With the photoresistor in the light
                                (not covered), I got a resistance of approximately 1390 Ω; with the photoresistor in the
                                dark (covered), I got a resistance of approximately 200 kΩ. With these values in mind
                                and the fact that I have a light shining on my desk, I decided to use a 1 kΩ resistor
                                which would allow the Arduino to get a more precise voltage measurement between bright
                                (.0249V = [1 kΩ / [200 kΩ + 1 kΩ]] * 5V) and really bright
                                (2.09V = [1 kΩ / [1390 Ω + 1 kΩ]] * 5V).
                            </p>
                            <img id="SeaTransMoodBoard" src={schematic} alt="Schematic that connects a RGB LED and photoresistor to an Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                The circuit itself was simple enough to build. Since I already had the RGB LED from last
                                week's assignment on the bread board, all I had to do was take out the button and its
                                wires and replace it with a photoresistor. In addition, I decided to use the green diode
                                as opposed to the blue diode so after a quick swap of wires (to color code) everything
                                was ready to go.
                            </p>
                            <img id="SeaTransColor" src={circuit} alt="Fully built circuit of RGB LED, photoresistor & resistors, and the Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                After loading up the
                                <a href={links.analogInOutputSerial} style={{color: "rgb(100, 21, 255)"}}> Analog In Output Serial </a>
                                example and uploading it to my Arduino, I turned on the Serial Monitor to get a sense of
                                what values the photoresistor was reading. My sensor readings for both covered and
                                uncovered where jumpy but I was able to get a range of the minimum and maximum values.
                                With that, I constrained my sensor values to that range and then mapped it so that the
                                minimum and maximum value would equate to 0 and 255, respectively, since I wanted my the
                                red diode of the RGB LED to fade off and on. Afterwards, I used an if statement to cause
                                the red diode to fade if the sensor was covered (in the dark) but turn on the green
                                diode if the sensor was not covered (in the light). Brake statements were also included
                                to able to switch between red and green if the covering of the sensor was spontaneous.
                                Below is the full code for the InputOutput circuit (uncommented version can be found on
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
                                Without covering the sensor, the green LED shined bright; and with the covering of the
                                photoresistor...
                            </p>
                            <div style={styles.centerDiv}>
                                <img id="SeaTransIcons" src={inOutGif} alt="Gif of a fading LED after covering the photoresistor" />
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
    fade: "/fade",
    analogInOutputSerial: "https://www.arduino.cc/en/Tutorial/BuiltInExamples/AnalogInOutSerial",
    floatingPin: "https://www.reddit.com/r/arduino/comments/2wzbe2/why_do_i_have_to_use_a_220_ohm_resistor_on_a_push/covgqg8?utm_source=share&utm_medium=web2x&context=3",
    LEDdataSheet: "https://www.sparkfun.com/datasheets/Components/YSL-R596CR3G4B5C-C10.pdf",
    codeGithub: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/ArduinoCode/InputOutput/src/main.cpp"
}

const lightboxOptions = {
    showDownloadButton: false,
}

const code = "/*\n" +
    " * Base code credit to contributors and developers of Analog In, Out Serial on Arduino\n" +
    " * https://www.arduino.cc/en/Tutorial/BuiltInExamples/AnalogInOutSerial\n" +
    " */\n" +
    "\n" +
    "#include \"Arduino.h\"\n" +
    "const int G = 9; // pin of Green LED\n" +
    "const int R = 11; // pin of Red LED\n" +
    "const int analogInPin = A0; // pin for Analog Input\n" +
    "int sensorValue = 0; // value read from photo resistor\n" +
    "int outputValue = 0; //value output to the PWM (analog out)\n" +
    "\n" +
    "void setup() {\n" +
    "    // initialize each LED pin as an output\n" +
    "    pinMode(R, OUTPUT);\n" +
    "    pinMode(G, OUTPUT);\n" +
    "\n" +
    "    // initialize serial monitor with baud 9600 for debugging\n" +
    "    Serial.begin(9600);\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "    // reads in value from analog input pin and limits it to a value between 20 and 125\n" +
    "    sensorValue = constrain(analogRead(analogInPin), 20, 125);\n" +
    "    // maps output value to the range of the sensor value (from 20 to 125)\n" +
    "    outputValue = map(sensorValue, 20, 125, 0, 255);\n" +
    "\n" +
    "    // if sensor value is greater than 20\n" +
    "    if (sensorValue > 20) {\n" +
    "        // print that Green LED is on\n" +
    "        Serial.print(\"Green LED On\");\n" +
    "        // writes analog value of output to the green LED\n" +
    "        analogWrite(G, outputValue);\n" +
    "        // turns off Red LED by setting voltage to LOW\n" +
    "        digitalWrite(R, LOW);\n" +
    "    } else {\n" +
    "        // turns off Green LED by setting voltage to LOW\n" +
    "        digitalWrite(G, LOW);\n" +
    "\n" +
    "        // Fades Red LED from off to on\n" +
    "        // for loop that iterates from 0 to 255 increasing by 5\n" +
    "        for (int i = 0; i < 256; i+= 5) {\n" +
    "            // print that Red LED is on\n" +
    "            Serial.println(\"Red LED On\");\n" +
    "\n" +
    "            // read in sensor value again to break out of for loop if value changes\n" +
    "            // in this case, finger uncovers the photo resistor\n" +
    "            sensorValue = constrain(analogRead(analogInPin), 20, 125);\n" +
    "            if (sensorValue > 20) {\n" +
    "                break;\n" +
    "            }\n" +
    "\n" +
    "            // writes analog value of i to red LED\n" +
    "            analogWrite(R, i);\n" +
    "            // delay for .01 seconds\n" +
    "            delay(10);\n" +
    "        }\n" +
    "\n" +
    "        // Fades Red LED from on to off\n" +
    "        // for loop that iterates from 255 to 0 decrementing by 5\n" +
    "        for (int i = 255; i >= 0; i-= 5) {\n" +
    "            // print that Red LED is on\n" +
    "            Serial.println(\"Red LED On\");\n" +
    "\n" +
    "            // read in sensor value again to break out of for loop if value changes\n" +
    "            // in this case, finger uncovers the photo resistor\n" +
    "            sensorValue = constrain(analogRead(analogInPin), 20, 125);\n" +
    "            if (sensorValue > 20) {\n" +
    "                break;\n" +
    "            }\n" +
    "\n" +
    "            // writes analog value of i to red LED\n" +
    "            analogWrite(R, i);\n" +
    "            // delay for .01 seconds\n" +
    "            delay(10);\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    // print the results to the Serial Monitor:\n" +
    "    Serial.print(\"sensor = \");\n" +
    "    Serial.print(sensorValue);\n" +
    "    Serial.print(\"\\t output = \");\n" +
    "    Serial.println(outputValue);\n" +
    "\n" +
    "    // wait 2 milliseconds before the next loop for the analog-to-digital\n" +
    "    // converter to settle after the last reading:\n" +
    "    delay(2);\n" +
    "}"