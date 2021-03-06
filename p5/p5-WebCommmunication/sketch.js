/*
 * Kenny "Ackerson" Le
 * 2/25/21
 * Assignment 6: Talking to the Web!
 * Description: Handles P5 side of communication with Arduino
 * Program allows the control of a LED with a joystick and a webpage using the P5.js library
 */

let serial; // variable to hold an instance of the serialport library
const portName = '/dev/tty.usbserial-01677F32' //rename to the name of your port
let dataArray = []; //some data coming in over serial!

function setup() {
    serial = new p5.SerialPort();              // make a new instance of the serialport library
    serial.on('list', printList);       // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing

    serial.list();                             // list the serial ports
    serial.open(portName);                     // open a serial port
    createCanvas(windowWidth, windowHeight);   // creates a canvas that's the size of the browser's width and height
    background(0x08, 0x16, 0x40);
}

// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (let i = 0; i < portList.length; i++) {
        // Display the list the console:
        print(i + " " + portList[i]);
    }
}

function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}

function serialEvent() {
    if (serial.available()) {
        let dataString = serial.readLine(); // read in some serial
        let newArray;
        try {
            newArray = JSON.parse(dataString); // can we parse the serial
        }
        catch(err) {
            console.log("Error received: " + err);
        }
        if (typeof(newArray) == 'object') {
            dataArray = newArray;
        }
        console.log("got back " + dataString);
    }
}

function draw() {
    stroke('rgba(0,80,255,0.5)'); // blue
    graphPosition(dataArray[0], dataArray[1]);
}

function graphPosition(xCoord, yCoord) {
    // make a queue of positions and map that
    let yPos = map(yCoord,0, 1023,0, height);
    let xPos = map(xCoord, 0, 1023,0, width);
    background(0x08, 0x16, 0x40);
    plotLightPositions();
    fill(255, 255, 255);
    ellipse(xPos, yPos, 100, 100);
    turnOnLED(xPos, yPos);
}

function plotLightPositions() {
    fill(255, 0, 255);
    ellipse(150, 150, 150, 150);
    fill(255, 0, 0);
    ellipse(width - 150, 150, 150, 150);
    fill(0, 255, 0);
    ellipse(150, height - 150, 150, 150);
    fill(0, 0, 255);
    ellipse(width - 150, height - 150, 150, 150);
}

function turnOnLED(xPos, yPos) {
    if (xPos <= 250 && xPos >= 50 && yPos <= 250 && yPos >= 50) {
        serial.write(1);
        console.log("You're in area 1")
    }

    // width - 150 + 100 = width - 50
    if (xPos <= width - 50 && xPos >= width - 250 && yPos <= 250 && yPos >= 50) {
        serial.write(2);
        console.log("You're in area 2")
    }

    if (xPos <= 250 && xPos >= 50 && yPos <= height - 50 && yPos >= height - 250) {
        serial.write(3);
        console.log("You're in area 3")
    }

    if (xPos <= width - 50 && xPos >= width - 250 && yPos <= height - 50 && yPos >= height - 250) {
        serial.write(4);
        console.log("You're in area 4")
    }

}