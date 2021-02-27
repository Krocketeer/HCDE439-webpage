var serial; // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbserial-01677F32' //rename to the name of your port
var dataarray = []; //some data coming in over serial!
let xPos = 0;


function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  createCanvas(windowWidth, windowHeight);
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
        let datastring = serial.readLine(); // readin some serial
        let newarray;
        try {
            newarray = JSON.parse(datastring); // can we parse the serial
        }
            catch(err) {
              //console.log(err);
        }
        if (typeof(newarray) == 'object') {
            dataarray = newarray;
        }
        console.log("got back " + datastring);
    }
}

function graphData(newData) {
  // map the range of the input to the window height:
    let yPos = map(newData, 0, 1023, 0, height);
    // draw the line
    // line(xPos, height, xPos, height - yPos);

    ellipse(xPos, yPos, 50, 50);
    // at the edge of the screen, go back to the beginning:
    if (xPos >= width) {
        xPos = 0;
      // clear the screen by resetting the background:
        background(0x08, 0x16, 0x40);
    } else {
      // pass
    }
}

function draw() {
    // stroke('rgba(0,255,0,0.25)'); // green
    // graphData(dataarray[0]);
    //
    // stroke('rgba(0,80,255,0.5)'); // blue
    // graphData(dataarray[1]);
    // xPos++;

    stroke('rgba(0,80,255,0.5)'); // blue
    graphPosition(dataarray[0], dataarray[1]);
}

function graphPosition(xCoord, yCoord) {
    // make a queue of positions and map that
    let yPos = map(yCoord,0, 1023,0, height);
    let xPos = map(xCoord, 0, 1023,0, width);

    // setTimeout(() => {
    //     background(0x08, 0x16, 0x40);
    // }, 3000);
    background(0x08, 0x16, 0x40);
    ellipse(xPos, yPos, 50, 50);
}
