let serial; // variable to hold an instance of the serialport library
let dataArray = []; // some data coming in over serial!
const portName = '/dev/tty.usbserial-01677F32' // port name

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
    background(0x08, 0x16, 0x40);              // set the background to navy blue
}

// get the list of ports:
function printList(portList) {
    // portList is an array of serial port names
    for (let i = 0; i < portList.length; i++) {
        // Display the list the console:
        print(i + " " + portList[i]);
    }
}

// prints server is connected
function serverConnected() {
    print('connected to server.');
}

// prints serial port is opened
function portOpen() {
    print('the serial port opened.')
}

// prints there's an error with serial port
function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

// prints serial port is closed
function portClose() {
    print('The serial port closed.');
}

// Receives serial information from Arduino and converts to JSON
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

// Displays information on the page
function draw() {
    stroke('rgba(0,80,255,0.5)'); // blue
    graphPosition(dataArray[0], dataArray[1]);
}

// Graphs the X and Y coordinates of the joystick's position
function graphPosition(xCoord, yCoord) {
    // Limits the X and Y Coords to 0 and 1023
    let yPos = map(yCoord,0, 1023,0, height);
    let xPos = map(xCoord, 0, 1023,0, width);

    // Set background to Navy Blue
    background(0x08, 0x16, 0x40);

    // Draw 4 ellipses, one in each corner
    plotLightPositions();

    // Creates a white circle that corresponds to the joystick's position
    fill(255, 255, 255);
    ellipse(xPos, yPos, 100, 100);

    // Determines what LED to turn on based on the joystick's position
    turnOnLED(xPos, yPos);
}

// Draw 4 ellipses, one in each corner for Purple, Red, Green, and Blue
function plotLightPositions() {
    // Top Left - Purple
    fill(255, 0, 255);
    ellipse(150, 150, 150, 150);

    // Top Right - Red
    fill(255, 0, 0);
    ellipse(width - 150, 150, 150, 150);

    // Bottom Left — Green
    fill(0, 255, 0);
    ellipse(150, height - 150, 150, 150);

    // Bottom Right — Blue
    fill(0, 0, 255);
    ellipse(width - 150, height - 150, 150, 150);
}

// Determines what LED to turn on based on the joystick's position
function turnOnLED(xPos, yPos) {
    // If joystick ellipse is in top left corner, send int 1 over serial to Arduino
    if (xPos <= 250 && xPos >= 50 && yPos <= 250 && yPos >= 50) {
        serial.write(1);
        console.log("You're in area 1")
    }

    // If joystick ellipse is in top right corner, send int 2 over serial to Arduino
    if (xPos <= width - 50 && xPos >= width - 250 && yPos <= 250 && yPos >= 50) {
        serial.write(2);
        console.log("You're in area 2")
    }

    // If joystick ellipse is in bottom left corner, send int 3 over serial to Arduino
    if (xPos <= 250 && xPos >= 50 && yPos <= height - 50 && yPos >= height - 250) {
        serial.write(3);
        console.log("You're in area 3")
    }

    // If joystick ellipse is in bottom right corner, send int 4 over serial to Arduino
    if (xPos <= width - 50 && xPos >= width - 250 && yPos <= height - 50 && yPos >= height - 250) {
        serial.write(4);
        console.log("You're in area 4")
    }

}