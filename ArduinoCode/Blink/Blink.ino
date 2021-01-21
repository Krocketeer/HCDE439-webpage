
// Global Variables
const int buttonPin = 2;     // the number of the pushbutton pin
const int redLED = 12;       // pin of redLED
const int whiteLED = 10;     // pin of whiteLED
const int greenLED = 8;      // pin of greenLED
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);

  // initialize each LED pin as an output:
  pinMode(redLED, OUTPUT);
  pinMode(whiteLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  // If the button is pressed, execute the following code (succession of blinks)
  if (buttonState == HIGH) {
    //Turn on the redLED by making voltage HIGH
    digitalWrite(redLED, HIGH);
    
    // wait for .15 seconds
    delay(300); 
    
    // turn off the redLED by making the voltage LOW 
    digitalWrite(redLED, LOW);
    //Turn on the whiteLED
    digitalWrite(whiteLED, HIGH);
    
    // wait for .15 seconds
    delay(100);

    //Turn off the whiteLED
    digitalWrite(whiteLED, LOW);
    //Turn on the greenLED
    digitalWrite(greenLED, HIGH);

    // wait for .15 seconds
    delay(300);

    //Turn on the greenLED
    digitalWrite(greenLED, LOW);
  } else {
    //Turn off all the LEDs if button is not pressed
    digitalWrite(redLED, LOW);
    digitalWrite(whiteLED, LOW);
    digitalWrite(greenLED, LOW);
  }
}
