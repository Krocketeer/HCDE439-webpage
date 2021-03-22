import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { css } from "styled-components/macro";
import { CopyBlock, monoBlue } from "react-code-blocks"

import { SRLWrapper } from "simple-react-lightbox"
import ScrollArrow from "../components/ScrollArrow";

import WebComCover from "../images/WebCom/IMG_2295.png"

import schematic from "../images/WebCom/WebCommunicationSchematic.svg"
import circuit from "../images/WebCom/IMG_2294.jpeg"
import WebComGif from "../images/WebCom/JoyStickLED.gif"
import libraryGif from "../images/Libraries/LibraryLong.gif"

const Container = tw.div`relative`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 top-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;
const SvgDotPattern = tw(SvgDecoratorBlob1)`
    absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24
`;

export default function WebCom() {
    return <>
        <Container>
            <DecoratorBlob1 style={{top: "23rem"}} />
            <SvgDotPattern />
        </Container>
        <SRLWrapper options={lightboxOptions}>
            <ScrollArrow />
            <div className="pageLayout">
                <div className="pageCover">
                    <img src={WebComCover}
                         alt="Arduino powered RGB LED that is controlled by a joystick via interacting with a webpage"
                         style={{width: "100%", height: "100%", cursor: "zoom-in"}} />
                </div>
                <div className="pageHeader">
                    <h3 tw="text-primary-500">Talking to the Web!</h3>
                    <h6>Serial and JavaScript</h6>

                    <div className="details" style={{marginTop: "50px"}}>
                        <div className="info">
                            <h6 tw="text-primary-500">Components</h6>
                            <div>Arduino</div>
                            <div>Joystick</div>
                            <div>LEDs</div>
                            <div>Resistors</div>
                        </div>
                        <div id="problemSpace" style={{paddingBottom: "50px"}}>
                            <h6 tw="text-primary-500">The Goal</h6>
                            <p> To create a webpage with p5.js that interacts with the Arudino. The webpage and the
                                Arduino must update as things happen with its counterpart. The project should use a two
                                input devices and an output from the Arduino.
                            </p>
                        </div>
                    </div>
                    <div id="goal" style={{paddingBottom: "50px"}}>
                        <h6 tw="text-primary-500">Interactivity</h6>
                        <p> After going through the heavy, complex circuits from last project, it was now time to learn
                            how we can let the Arduino interact with the computer. In particular, we would be using
                            <a href={links.p5} style={{color: "rgb(100, 21, 255)"}}> p5.js</a>,
                            a Javascript library, to be able to send and receive data between the Arduino and a webpage.
                            It was nice already knowing a bit of JavaScript from my previous React experience,
                            but working with p5.js and Arduino was a real pain. A lot of my frustration and confusion
                            stemmed from the fact that if something wasn't working properly I would have to check the
                            Arduino code, the JavaScript code, the Serial Monitor, and the physical connections as
                            opposed to just checking the Arduino code and the physical connections. Nevertheless, once
                            I got everything setup, it was pretty cool to see that I could connect the two and introduce
                            some interactivity with my circuit. Building on the example shown in class and some of
                            previous projects, I wanted a way to control LED lights with p5.

                        </p>
                    </div>
                    <div id="moodBoard">
                        <h6 tw="text-primary-500">Creating the Schematic</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                As with previous projects, I still utilized the one RGB LED with a 330 Ω resistor which
                                when using the Red and Green diodes gave me a current of approximately 9.09mA
                                ([5V - 2V]/ 330 Ω ≈ 9.09 mA) and the Blue diode gave me a current of approximately 5.45
                                mA ([5V - 3.2V]/ 330 Ω ≈ 5.45 mA) when using values from this
                                <a href={links.LEDdataSheet} style={{color: "rgb(100, 21, 255)"}}> data sheet</a>. Once
                                that was wired up, I then turned my attention to the joystick. It was pretty straight
                                forward on how to connect the joystick to the Arduino after referencing an
                                <a href={links.LEDdataSheet} style={{color: "rgb(100, 21, 255)"}}> Arduino project
                                    hub tutorial</a>. I decided to not use the switch (the click) on the joy stick
                                because of how finicky it was to operate the joystick as it is from my in class testing.
                            </p>
                            <img id="SeaTransMoodBoard" src={schematic}
                                 alt="Schematic that connects a RGB LED and a joystick to an Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Building the Circuit</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Like many of my previous projects, half the circuit was already built (the RGB LED)
                                since I had a dedicated homework project breadboard that I only ever touched for
                                assignments. Though one thing I did different was color code my wires and reorganize
                                them for a cleaner circuit. Afterwards, I connected the joystick to the Arduino. I opted
                                to not plug the joystick directly into the breadboard because of how awkward it would
                                be to operate it if it was in a fixed vertical position.
                            </p>
                            <img id="SeaTransColor" src={circuit}
                                 alt="Fully built circuit of RGB LED, Joystick and Arduino" />
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">Programming the Arduino</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                While both the Arduino and the JavaScript parts of the code weren't too complex by
                                themselves, it took a bit for me to figure out how information would be communicated
                                between the two of them as I ended up missing that part of class due to oversleeping
                                (staying up the night before to work on final projects). Once I eventually figured that
                                out, the harder part came was indicating when the RGB LED should change colors. In React,
                                you would usually have events to handle interactions like with a key press or a mouse
                                click. However, since I would be using a joystick to interact, I wasn't too sure how
                                that could be accomplished. After spending a few hours tinkering on it, I eventually
                                realized that I could create conditionals with the X and Y coordinates of the joystick.
                                If the joystick's marker passed a certain area, then I could trigger something to
                                happen! With that in mind, I create four areas that the joystick's marker could go to in
                                order to change the LED color. Below is both the code for the Arduino circuit and the
                                corresponding p5 webpage (uncommented version of the
                                <a href={links.gitArduino} style={{color: "rgb(100, 21, 255)"}}> Arduino code</a> and
                                the <a href={links.gitP5} style={{color: "rgb(100, 21, 255)"}}> p5 webpage</a> can
                                be found on Github):
                            </p>
                            <CopyBlock text={code} language="c" theme={monoBlue}/>
                            <div style={{paddingBottom: "25px"}} />
                            <CopyBlock text={codeJS} language="JavaScript" theme={monoBlue}/>
                        </div>
                    </div>
                    <div>
                        <h6 tw="text-primary-500">The Result</h6>
                        <div style={styles.centerDiv50}>
                            <p style={{paddingBottom: "25px"}}>
                                Once the code was verified and uploaded to the Arduino. It was now time to test it out!
                                The gif shows the full functionality of the project: using the joystick to change what
                                color the RGB LED shows using the webpage as the interface.
                            </p>
                            {/*<div style={styles.centerDiv}>*/}
                            {/*    <img id="SeaTransIcons" src={WebComGif} alt="Gif of a LED controlled by a Joystick" />*/}
                            {/*</div>*/}
                            <div style={styles.centerDiv}>
                                <iframe className="DemoVideo"
                                        title="Web Communication Project Demo"
                                        src="https://www.youtube.com/embed/8hGkB0OFcCM"
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
    p5: "https://p5js.org/libraries/",
    joystick: "https://create.arduino.cc/projecthub/MisterBotBreak/how-to-use-a-joystick-with-serial-monitor-1f04f0",
    gitArduino: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/ArduinoCode/WebCommunication/src/main.cpp",
    gitP5: "https://github.com/Krocketeer/HCDE439-webpage/blob/master/p5/p5-WebCommmunication/sketch.js",
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
    " * 2/25/21\n" +
    " * Assignment 6: Talking to the Web!\n" +
    " * Description: Handles Arduino side of communication with P5\n" +
    " * Allows the control of a LED with a joystick and a webpage using the P5.js library\n" +
    " */\n" +
    "\n" +
    "// Import statement to make Arduino work with Clion\n" +
    "#include <Arduino.h>\n" +
    "const int VRx = A0;      // Pin of X-axis control for joystick\n" +
    "const int VRy = A1;      // Pin of X-axis control for joystick\n" +
    "\n" +
    "const int redLED = 11;   // Pin of red diode of RGB LED\n" +
    "const int greenLED = 9;  // Pin of green diode of RGB LED\n" +
    "const int blueLED = 6;   // Pin of blue diode of RGB LED\n" +
    "\n" +
    "// Function declarations\n" +
    "void sendSerial();\n" +
    "void readSerial();\n" +
    "void controlLED(int byte);\n" +
    "\n" +
    "void setup() {\n" +
    "    // initialize each LED pin as an output\n" +
    "    pinMode(redLED, OUTPUT);\n" +
    "    pinMode(greenLED, OUTPUT);\n" +
    "    pinMode(blueLED, OUTPUT);\n" +
    "\n" +
    "    // initialize each joystick pin as an input\n" +
    "    pinMode(VRx, INPUT);\n" +
    "    pinMode(VRy, INPUT);\n" +
    "\n" +
    "    // initialize serial monitor with baud 9600\n" +
    "    Serial.begin(9600);\n" +
    "    // waits .01 seconds max for serial data before timeout\n" +
    "    Serial.setTimeout(10);\n" +
    "}\n" +
    "\n" +
    "void loop() {\n" +
    "    // calls the following functions to loop over\n" +
    "    sendSerial();\n" +
    "    readSerial();\n" +
    "}\n" +
    "\n" +
    "// sends information from the joystick over serial to P5\n" +
    "void sendSerial() {\n" +
    "    // X and Y Coordinates of the joystick\n" +
    "    int xCoord = analogRead(VRx);\n" +
    "    // inverses the direction of up and down for the joystick\n" +
    "    int yCoord = map(analogRead(VRy), 0, 1023, 1023, 0);\n" +
    "\n" +
    "    // Prints the coordinates to serial monitor in the format of [xCoord, yCoord]\n" +
    "    Serial.print(\"[\");\n" +
    "    Serial.print(xCoord);\n" +
    "    Serial.print(\",\");\n" +
    "    Serial.print(yCoord);\n" +
    "    Serial.println(\"]\");\n" +
    "\n" +
    "    // delays 0.1 seconds\n" +
    "    delay(100);\n" +
    "}\n" +
    "\n" +
    "// receives information from P5 to serial\n" +
    "void readSerial() {\n" +
    "    // If there is serial information available\n" +
    "    if (Serial.available() > 0) {\n" +
    "        // read the serial information\n" +
    "        int inByte = Serial.read();\n" +
    "        // Print serial information\n" +
    "        Serial.print(\"inByte value: \");\n" +
    "        Serial.println(inByte);\n" +
    "\n" +
    "        // calls function to control LED based on serial information read in\n" +
    "        controlLED(inByte);\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "// function to control LEDs\n" +
    "void controlLED(int byte) {\n" +
    "    // Switch case to determine what to do with byte\n" +
    "    switch (byte) {\n" +
    "        case 1: // Turns RGB LED purple\n" +
    "            analogWrite(redLED, 127);\n" +
    "            analogWrite(greenLED, 0);\n" +
    "            analogWrite(blueLED, 127);\n" +
    "            break;\n" +
    "        case 2: // Turns RGB LED red\n" +
    "            analogWrite(redLED, 255);\n" +
    "            analogWrite(greenLED, 0);\n" +
    "            analogWrite(blueLED, 0);\n" +
    "            break;\n" +
    "        case 3: // Turns RGB LED green\n" +
    "            analogWrite(greenLED, 255);\n" +
    "            analogWrite(redLED, 0);\n" +
    "            analogWrite(blueLED, 0);\n" +
    "            break;\n" +
    "        case 4: // turns RGB led blue\n" +
    "            analogWrite(blueLED, 255);\n" +
    "            analogWrite(greenLED, 0);\n" +
    "            analogWrite(redLED, 0);\n" +
    "            break;\n" +
    "        default:\n" +
    "            // If any other byte is read in, print byte to Serial Monitor\n" +
    "            Serial.print(\"Error, unrecognized byte: \");\n" +
    "            Serial.println(byte);\n" +
    "            break;\n" +
    "    }\n" +
    "}\n"

const codeJS = "let serial; // variable to hold an instance of the serialport library\n" +
    "let dataArray = []; // some data coming in over serial!\n" +
    "const portName = '/dev/tty.usbserial-01677F32' // port name\n" +
    "\n" +
    "function setup() {\n" +
    "    serial = new p5.SerialPort();              // make a new instance of the serialport library\n" +
    "    serial.on('list', printList);       // set a callback function for the serialport list event\n" +
    "    serial.on('connected', serverConnected); // callback for connecting to the server\n" +
    "    serial.on('open', portOpen);        // callback for the port opening\n" +
    "    serial.on('data', serialEvent);     // callback for when new data arrives\n" +
    "    serial.on('error', serialError);    // callback for errors\n" +
    "    serial.on('close', portClose);      // callback for the port closing\n" +
    "\n" +
    "    serial.list();                             // list the serial ports\n" +
    "    serial.open(portName);                     // open a serial port\n" +
    "    createCanvas(windowWidth, windowHeight);   // creates a canvas that's the size of the browser's width and height\n" +
    "    background(0x08, 0x16, 0x40);              // set the background to navy blue\n" +
    "}\n" +
    "\n" +
    "// get the list of ports:\n" +
    "function printList(portList) {\n" +
    "    // portList is an array of serial port names\n" +
    "    for (let i = 0; i < portList.length; i++) {\n" +
    "        // Display the list the console:\n" +
    "        print(i + \" \" + portList[i]);\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "// prints server is connected\n" +
    "function serverConnected() {\n" +
    "    print('connected to server.');\n" +
    "}\n" +
    "\n" +
    "// prints serial port is opened\n" +
    "function portOpen() {\n" +
    "    print('the serial port opened.')\n" +
    "}\n" +
    "\n" +
    "// prints there's an error with serial port\n" +
    "function serialError(err) {\n" +
    "    print('Something went wrong with the serial port. ' + err);\n" +
    "}\n" +
    "\n" +
    "// prints serial port is closed\n" +
    "function portClose() {\n" +
    "    print('The serial port closed.');\n" +
    "}\n" +
    "\n" +
    "// Receives serial information from Arduino and converts to JSON\n" +
    "function serialEvent() {\n" +
    "    if (serial.available()) {\n" +
    "        let dataString = serial.readLine(); // read in some serial\n" +
    "        let newArray;\n" +
    "        try {\n" +
    "            newArray = JSON.parse(dataString); // can we parse the serial\n" +
    "        }\n" +
    "        catch(err) {\n" +
    "            console.log(\"Error received: \" + err);\n" +
    "        }\n" +
    "        if (typeof(newArray) == 'object') {\n" +
    "            dataArray = newArray;\n" +
    "        }\n" +
    "        console.log(\"got back \" + dataString);\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "// Displays information on the page\n" +
    "function draw() {\n" +
    "    stroke('rgba(0,80,255,0.5)'); // blue\n" +
    "    graphPosition(dataArray[0], dataArray[1]);\n" +
    "}\n" +
    "\n" +
    "// Graphs the X and Y coordinates of the joystick's position\n" +
    "function graphPosition(xCoord, yCoord) {\n" +
    "    // Limits the X and Y Coords to 0 and 1023\n" +
    "    let yPos = map(yCoord,0, 1023,0, height);\n" +
    "    let xPos = map(xCoord, 0, 1023,0, width);\n" +
    "\n" +
    "    // Set background to Navy Blue\n" +
    "    background(0x08, 0x16, 0x40);\n" +
    "\n" +
    "    // Draw 4 ellipses, one in each corner\n" +
    "    plotLightPositions();\n" +
    "\n" +
    "    // Creates a white circle that corresponds to the joystick's position\n" +
    "    fill(255, 255, 255);\n" +
    "    ellipse(xPos, yPos, 100, 100);\n" +
    "\n" +
    "    // Determines what LED to turn on based on the joystick's position\n" +
    "    turnOnLED(xPos, yPos);\n" +
    "}\n" +
    "\n" +
    "// Draw 4 ellipses, one in each corner for Purple, Red, Green, and Blue\n" +
    "function plotLightPositions() {\n" +
    "    // Top Left - Purple\n" +
    "    fill(255, 0, 255);\n" +
    "    ellipse(150, 150, 150, 150);\n" +
    "\n" +
    "    // Top Right - Red\n" +
    "    fill(255, 0, 0);\n" +
    "    ellipse(width - 150, 150, 150, 150);\n" +
    "\n" +
    "    // Bottom Left — Green\n" +
    "    fill(0, 255, 0);\n" +
    "    ellipse(150, height - 150, 150, 150);\n" +
    "\n" +
    "    // Bottom Right — Blue\n" +
    "    fill(0, 0, 255);\n" +
    "    ellipse(width - 150, height - 150, 150, 150);\n" +
    "}\n" +
    "\n" +
    "// Determines what LED to turn on based on the joystick's position\n" +
    "function turnOnLED(xPos, yPos) {\n" +
    "    // If joystick ellipse is in top left corner, send int 1 over serial to Arduino\n" +
    "    if (xPos <= 250 && xPos >= 50 && yPos <= 250 && yPos >= 50) {\n" +
    "        serial.write(1);\n" +
    "        console.log(\"You're in area 1\")\n" +
    "    }\n" +
    "\n" +
    "    // If joystick ellipse is in top right corner, send int 2 over serial to Arduino\n" +
    "    if (xPos <= width - 50 && xPos >= width - 250 && yPos <= 250 && yPos >= 50) {\n" +
    "        serial.write(2);\n" +
    "        console.log(\"You're in area 2\")\n" +
    "    }\n" +
    "\n" +
    "    // If joystick ellipse is in bottom left corner, send int 3 over serial to Arduino\n" +
    "    if (xPos <= 250 && xPos >= 50 && yPos <= height - 50 && yPos >= height - 250) {\n" +
    "        serial.write(3);\n" +
    "        console.log(\"You're in area 3\")\n" +
    "    }\n" +
    "\n" +
    "    // If joystick ellipse is in bottom right corner, send int 4 over serial to Arduino\n" +
    "    if (xPos <= width - 50 && xPos >= width - 250 && yPos <= height - 50 && yPos >= height - 250) {\n" +
    "        serial.write(4);\n" +
    "        console.log(\"You're in area 4\")\n" +
    "    }\n" +
    "\n" +
    "}"