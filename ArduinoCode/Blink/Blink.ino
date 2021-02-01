/*
 * Base code credit to contributors and developers of Blink on Arduino
 * https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
 */

const int buttonPin = 2;
const int redLED = 12;
const int whiteLED = 10;
const int greenLED = 8;
int buttonState = 0;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(redLED, OUTPUT);
  pinMode(whiteLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
    digitalWrite(redLED, HIGH);
    delay(300);
    
    digitalWrite(redLED, LOW);
    digitalWrite(whiteLED, HIGH);
    delay(100);

    digitalWrite(whiteLED, LOW);
    digitalWrite(greenLED, HIGH);
    delay(300);

    digitalWrite(greenLED, LOW);
  } else {
    digitalWrite(redLED, LOW);
    digitalWrite(whiteLED, LOW);
    digitalWrite(greenLED, LOW);
  }
}