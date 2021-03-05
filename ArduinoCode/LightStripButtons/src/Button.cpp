/*
 * Kenny "Ackerson" Le
 * 3/2/21
 * LightStripButtons
 * Description:
 */
#include "Button.h"
#include <Arduino.h>

const int redLED = 12;
const int greenLED = 10;
const int blueLED = 8;
const int redButtonPin = 2;
const int blueButtonPin = 4;

int lastLED = 12;
int ledState = LOW;
int buttonState;
int buttonState2;
int lastButtonState = LOW;
int lastButtonState2 = LOW;
boolean swap = false;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;

void ledControl(int ledState);

void ButtonSetup() {
    pinMode(redButtonPin, INPUT);
    pinMode(redLED, OUTPUT);
    pinMode(greenLED, OUTPUT);
    pinMode(blueLED, OUTPUT);
    digitalWrite(redLED, LOW);
    Serial.begin(9600);
}

void ButtonLoop() {
    int reading = digitalRead(redButtonPin);
    int reading2 = digitalRead(blueButtonPin);
    if (reading != lastButtonState || reading2 != lastButtonState2) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == HIGH) {
                Serial.print("Current LED State: ");
                Serial.println(ledState);
                Serial.print("Last LED is: ");
                Serial.println(lastLED);

                if (ledState == HIGH && lastLED == 12) {
                    digitalWrite(blueLED, HIGH);
                    digitalWrite(redLED, LOW);
                    lastLED = 8;
                } else {
                    ledState = !ledState;
                    digitalWrite(blueLED, ledState);
                    digitalWrite(redLED, LOW);
                    lastLED = 8;
                }

                Serial.print("Changing LED State; State is now: ");
                Serial.println(ledState);
                Serial.print("Last LED is: ");
                Serial.println(lastLED);
            }
        }
    }
    /* If led state is off, turn on led for button clicked
     * if led state is on {
     * if the same button is pressed, turn led off
     * if it is other button, turn that led on instead
     * else turn the button off
     * }
     *
     * */

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading2 != buttonState2) {
            buttonState2 = reading2;
            if (buttonState2 == HIGH) {
                Serial.print("Current LED State: ");
                Serial.println(ledState);
                Serial.print("Last LED is: ");
                Serial.println(lastLED);

                if (ledState == HIGH && lastLED == 8) {
                    digitalWrite(redLED, HIGH);
                    digitalWrite(blueLED, LOW);
                    lastLED = 12;
                } else {
                    ledState = !ledState;
                    digitalWrite(redLED, ledState);
                    digitalWrite(blueLED, LOW);
                    lastLED = 12;
                }

                Serial.print("Changing LED State; State is now: ");
                Serial.println(ledState);
                Serial.print("Last LED is: ");
                Serial.println(lastLED);
            }
        }
    }
    lastButtonState = reading;
    lastButtonState2 = reading2;
}

void ledControl(int ledState) {

}