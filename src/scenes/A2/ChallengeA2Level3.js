.on('pointerover', () => {
    leftPanelBg.fillColor = 0x001122; // Highlight when hovering
})
.on('pointerout', () => {
    if (!isScrolling) {
        leftPanelBg.fillColor = 0x000000; // Reset color when not hovering
    }
});

// 2. Middle Panel - Encrypted Message (positioned better)
const middlePanelBg = this.add.rectangle(0, -30, 250, 80, 0x000000, 0.8);
middlePanelBg.setStrokeStyle(2, 0x33cc99);

const middlePanelTitle = this.add.text(0, -80, 'ENCRYPTED MESSAGE', {
fontFamily: 'Arial, sans-serif',
fontSize: '20px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
middlePanelTitle.setOrigin(0.5);

const encryptedText = this.add.text(0, -30, this.encryptedMessage, {
fontFamily: 'Courier New, monospace',
fontSize: '22px',
color: '#ffaa33',
align: 'center',
fontStyle: 'bold'
});
encryptedText.setOrigin(0.5);

// 3. Right Panel - Decryption Input (enlarged and clear)
const rightPanelBg = this.add.rectangle(250, 40, 280, 340, 0x000000, 0.8);
rightPanelBg.setStrokeStyle(2, 0x33cc99);

const rightPanelTitle = this.add.text(250, -120, 'ENTER DECRYPTION KEY', {
fontFamily: 'Arial, sans-serif',
fontSize: '20px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
rightPanelTitle.setOrigin(0.5);

// Input box (larger and more obvious)
const inputBoxBg = this.add.rectangle(250, -70, 240, 50, 0x003322);
inputBoxBg.setStrokeStyle(3, 0x33cc99);
inputBoxBg.setInteractive({ useHandCursor: true });

// Visual feedback when clicking the input box
inputBoxBg.on('pointerover', () => {
inputBoxBg.fillColor = 0x004433; // Highlight on hover
});

inputBoxBg.on('pointerout', () => {
inputBoxBg.fillColor = 0x003322; // Reset on mouse out
});

inputBoxBg.on('pointerdown', () => {
inputBoxBg.fillColor = 0x005544; // Different color when clicked
inputBoxBg.setStrokeStyle(3, 0x66ffcc); // Highlight border when selected
});

// Placeholder for user input with clear indication it's editable
let inputText = '';
const inputTextDisplay = this.add.text(250, -70, inputText + '|', {
fontFamily: 'Courier New, monospace',
fontSize: '20px',
color: '#ffffff',
align: 'center'
});
inputTextDisplay.setOrigin(0.5);

// Add text to indicate input is expected
const inputHint = this.add.text(250, -40, "Click to activate keyboard input", {
fontFamily: 'Arial, sans-serif',
fontSize: '12px',
color: '#aaaaaa',
align: 'center'
});
inputHint.setOrigin(0.5);

// Create blinking cursor effect
const cursorTimer = this.time.addEvent({
delay: 500,
callback: () => {
    if (inputTextDisplay.text.endsWith('|')) {
        inputTextDisplay.setText(inputText);
    } else {
        inputTextDisplay.setText(inputText + '|');
    }
},
loop: true
});

// Decrypt button (larger and more prominent)
const decryptButton = this.add.rectangle(250, 0, 240, 50, 0x33cc99);
decryptButton.setInteractive({ useHandCursor: true });

const decryptText = this.add.text(250, 0, 'DECRYPT', {
fontFamily: 'Arial, sans-serif',
fontSize: '20px',
fontStyle: 'bold',
color: '#ffffff',
align: 'center'
});
decryptText.setOrigin(0.5);

// Decryption result area (larger and more distinct)
const resultBoxBg = this.add.rectangle(250, 70, 240, 80, 0x003322);
resultBoxBg.setStrokeStyle(2, 0x33cc99);

// Initial result text (empty)
const resultText = this.add.text(250, 70, 'Decryption result will appear here', {
fontFamily: 'Courier New, monospace',
fontSize: '14px',
color: '#999999',
align: 'center',
wordWrap: { width: 220 }
});
resultText.setOrigin(0.5);

// Hint text (made more visible)
const hintText = this.add.text(250, 140, 'Hint: Keys should never be in the source code.\nLook for something that seems like a secret!', {
fontFamily: 'Arial, sans-serif',
fontSize: '14px',
color: '#ffcc00',
align: 'center',
wordWrap: { width: 230 }
});
hintText.setOrigin(0.5);
hintText.setAlpha(1); // Always visible to help players

// Status message at the bottom (larger and clearer)
const statusText = this.add.text(0, 210, 'Find the secret key in the source code and enter it above', {
fontFamily: 'Arial, sans-serif',
fontSize: '18px',
color: '#ffffff',
align: 'center'
});
statusText.setOrigin(0.5);

// Add components to game container
gameContainer.add(gameBg);
gameContainer.add(gameTitle);
gameContainer.add(instructions);
gameContainer.add(leftPanelBg);
gameContainer.add(leftPanelTitle);
gameContainer.add(scrollHint);
gameContainer.add(codeText);
gameContainer.add(scrollBarBg);
gameContainer.add(scrollBarHandle);
gameContainer.add(middlePanelBg);
gameContainer.add(middlePanelTitle);
gameContainer.add(encryptedText);
gameContainer.add(rightPanelBg);
gameContainer.add(rightPanelTitle);
gameContainer.add(inputBoxBg);
gameContainer.add(inputTextDisplay);
gameContainer.add(inputHint);
gameContainer.add(decryptButton);
gameContainer.add(decryptText);
gameContainer.add(resultBoxBg);
gameContainer.add(resultText);
gameContainer.add(hintText);
gameContainer.add(statusText);

// Animation for game appearance
gameContainer.setAlpha(0);

this.tweens.add({
targets: successContainer,
alpha: 1,
scale: 1,
duration: 300,
ease: 'Power2'
});

// Continue button action
continueButton.on('pointerdown', () => {
this.tweens.add({
    targets: [successContainer, gameContainer],
    alpha: 0,
    scale: 0.8,
    duration: 300,
    ease: 'Power2',
    onComplete: () => {
        successContainer.destroy();
        gameContainer.destroy();
        this.showSuccessScreen();
    }
});
});

// Hover effects for button
continueButton.on('pointerover', () => {
continueButton.fillColor = 0x66eebb;
});

continueButton.on('pointerout', () => {
continueButton.fillColor = 0x33cc99;
});
}

showSuccessScreen() {
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 2;

// Create success container
const successContainer = this.add.container(centerX, centerY);

// Success background
const successBg = this.add.rectangle(0, 0, 650, 450, 0x001100, 0.95);
successBg.setStrokeStyle(3, 0x33cc99);

// Success header
const successHeader = this.add.text(0, -180, 'CHALLENGE COMPLETE!', {
fontFamily: 'Arial Black, Impact, sans-serif',
fontSize: '40px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
successHeader.setOrigin(0.5);

// Success message
const successTitle = this.add.text(0, -120, 'You discovered the dangers of hardcoded encryption keys!', {
fontFamily: 'Arial, sans-serif',
fontSize: '24px',
color: '#ffffff',
align: 'center'
});
successTitle.setOrigin(0.5);

// Explanation
const explanationTitle = this.add.text(0, -60, 'What you learned:', {
fontFamily: 'Arial, sans-serif',
fontSize: '22px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
explanationTitle.setOrigin(0.5);

const explanation = [
"• Improper key management can expose encrypted data!",
"",
"• Hardcoded keys in source code, logs, or public",
"  repositories can be stolen.",
"",
"• Always store keys in a secure key management system",
"  or environment variables!"
].join('\n');

const explanationText = this.add.text(0, 50, explanation, {
fontFamily: 'Arial, sans-serif',
fontSize: '18px',
color: '#ffffff',
align: 'center',
lineSpacing: 8
});
explanationText.setOrigin(0.5);

// Next level button
const nextButton = this.add.rectangle(0, 170, 250, 50, 0x33cc99);
nextButton.setInteractive({ useHandCursor: true });

const nextText = this.add.text(0, 170, 'NEXT LEVEL', {
fontFamily: 'Arial, sans-serif',
fontSize: '22px',
color: '#ffffff',
align: 'center'
});
nextText.setOrigin(0.5);

// Add components to container
successContainer.add(successBg);
successContainer.add(successHeader);
successContainer.add(successTitle);
successContainer.add(explanationTitle);
successContainer.add(explanationText);
successContainer.add(nextButton);
successContainer.add(nextText);

// Animation for success screen appearance
successContainer.setAlpha(0);

this.tweens.add({
targets: successContainer,
alpha: 1,
duration: 800,
ease: 'Power2'
});

// Next level button action
nextButton.on('pointerdown', () => {
this.cameras.main.fade(800, 0, 0, 0);
this.time.delayedCall(800, () => {
    this.scene.start('ChallengeA2Level4'); // Transition to Level 4
});
});

// Hover effects
nextButton.on('pointerover', () => {
nextButton.fillColor = 0x66eebb;
nextButton.scaleX = 1.05;
nextButton.scaleY = 1.05;
nextText.scaleX = 1.05;
nextText.scaleY = 1.05;
});

nextButton.on('pointerout', () => {
nextButton.fillColor = 0x33cc99;
nextButton.scaleX = 1;
nextButton.scaleY = 1;
nextText.scaleX = 1;
nextText.scaleY = 1;
});

// Victory particles with green tint
const particles = this.add.particles('button');

particles.createEmitter({
x: { min: 0, max: this.cameras.main.width },
y: -50,
speed: { min: 100, max: 200 },
angle: { min: 80, max: 100 },
scale: { start: 0.2, end: 0 },
lifespan: 4000,
quantity: 2,
frequency: 40,
tint: 0x33cc99,
blendMode: 'ADD'
});
}

update() {
// Game logic that runs on every frame
}
}
targets: gameContainer,
alpha: 1,
duration: 500,
ease: 'Power2'
});

// Setup keyboard input - only activate when input box is clicked
let keyboardActive = false;

inputBoxBg.on('pointerdown', () => {
keyboardActive = true;
inputHint.setText("Keyboard input active");
inputHint.setColor('#00ff66');
});

// Allow clicking elsewhere to deactivate keyboard
gameBg.setInteractive({ useHandCursor: false })
.on('pointerdown', (pointer) => {
    // Only deactivate if clicking outside input box
    const inputBoxBounds = inputBoxBg.getBounds();
    if (!Phaser.Geom.Rectangle.Contains(
        inputBoxBounds, pointer.x - centerX + inputBoxBounds.width/2, 
        pointer.y - centerY + inputBoxBounds.height/2)) {
        keyboardActive = false;
        inputHint.setText("Click to activate keyboard input");
        inputHint.setColor('#aaaaaa');
        inputBoxBg.setStrokeStyle(3, 0x33cc99); // Reset border
    }
});

this.input.keyboard.on('keydown', (event) => {
if (!keyboardActive) return;

// Handle backspace
if (event.keyCode === 8 && inputText.length > 0) {
    inputText = inputText.slice(0, -1);
    inputTextDisplay.setText(inputText + '|');
    return;
}

// Handle regular text input
if ((event.keyCode >= 48 && event.keyCode <= 90) ||  // Numbers and uppercase letters
    (event.keyCode >= 96 && event.keyCode <= 111) || // Numpad
    (event.keyCode >= 186 && event.keyCode <= 222) || // Special characters
    event.keyCode === 32) { // Space
    
    // Limit input length
    if (inputText.length < 25) {
        inputText += event.key;
        inputTextDisplay.setText(inputText + '|');
    }
}

// Handle Enter key
if (event.keyCode === 13) {
    checkDecryptionKey();
}
});

// Decrypt button action
decryptButton.on('pointerdown', () => {
checkDecryptionKey();
});

// Function to check if the entered key is correct
const checkDecryptionKey = () => {
if (inputText === this.secretKey) {
    // Success - show decrypted message
    resultText.setText(this.decryptedMessage);
    resultText.setColor('#00ff66');
    
    statusText.setText('You found the encryption key! But in the real world, attackers could use this to decrypt sensitive data!');
    statusText.setColor('#00ff66');
    
    this.decryptionSuccess = true;
    
    // Show success message after a delay
    this.time.delayedCall(2000, () => {
        this.showSuccessPopup(gameContainer);
    });
    
} else if (inputText.length > 0) {
    // Wrong key
    resultText.setText('Decryption failed! Wrong key.');
    resultText.setColor('#ff6666');
    
    statusText.setText('That key didn\'t work! Look for something suspicious in the source code!');
    statusText.setColor('#ff6666');
}
};

// Hover effects for button
decryptButton.on('pointerover', () => {
decryptButton.fillColor = 0x66eebb;
});

decryptButton.on('pointerout', () => {
decryptButton.fillColor = 0x33cc99;
});

// Provide a direct "reveal key" button if the player is really stuck
const revealButton = this.add.rectangle(250, 180, 240, 40, 0x663300);
revealButton.setInteractive({ useHandCursor: true });

const revealText = this.add.text(250, 180, 'REVEAL KEY (HINT)', {
fontFamily: 'Arial, sans-serif',
fontSize: '16px',
color: '#ffffff',
align: 'center'
});
revealText.setOrigin(0.5);

gameContainer.add(revealButton);
gameContainer.add(revealText);

revealButton.on('pointerdown', () => {
// Show the key but don't automatically decrypt
statusText.setText('The key is: ' + this.secretKey);
statusText.setColor('#ffcc00');
});

revealButton.on('pointerover', () => {
revealButton.fillColor = 0x995500;
});

revealButton.on('pointerout', () => {
revealButton.fillColor = 0x663300;
});
}

showSuccessPopup(gameContainer) {
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 2;

// Create success message container
const successContainer = this.add.container(centerX, centerY);

// Success message background
const successBg = this.add.rectangle(0, 0, 600, 350, 0x000000, 0.95);
successBg.setStrokeStyle(2, 0x33cc99);

// Success message title
const successTitle = this.add.text(0, -140, 'KEY FOUND!', {
fontFamily: 'Arial, sans-serif',
fontSize: '32px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
successTitle.setOrigin(0.5);

// Success message content
const content = [
"Well done! This is why hardcoded keys are dangerous—anyone",
"with access to the code can decrypt sensitive data!",
"",
"Always store encryption keys securely, using key vaults",
"or environment variables!"
].join('\n');

const successContent = this.add.text(0, 0, content, {
fontFamily: 'Arial, sans-serif',
fontSize: '18px',
color: '#ffffff',
align: 'center',
lineSpacing: 10
});
successContent.setOrigin(0.5);

// Continue button
const continueButton = this.add.rectangle(0, 130, 250, 50, 0x33cc99);
continueButton.setInteractive({ useHandCursor: true });

const continueText = this.add.text(0, 130, 'CONTINUE', {
fontFamily: 'Arial, sans-serif',
fontSize: '20px',
color: '#ffffff',
align: 'center'
});
continueText.setOrigin(0.5);

// Add components to the message container
successContainer.add(successBg);
successContainer.add(successTitle);
successContainer.add(successContent);
successContainer.add(continueButton);
successContainer.add(continueText);

// Fade out the game container
this.tweens.add({
targets: gameContainer,
alpha: 0.3,
duration: 300
});

// Animation for message appearance
successContainer.setAlpha(0);
successContainer.setScale(0.8);

this.tweens.add({class ChallengeA2Level3 extends Phaser.Scene {
constructor() {
super('ChallengeA2Level3');
this.currentStep = 0;

// Secret key that player needs to find
this.secretKey = "MySuperSecretKey123";

// Encrypted message that will be decrypted
this.encryptedMessage = "Ghs27Jsh1a9Mkl02";

// Decrypted message to show after success
this.decryptedMessage = "Bank Account: 1234-5678-9000";

// Source code containing the secret key - simplified version for better readability
this.sourceCode = `package com.webapp.security;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

/**
* Encryption utility for our webapp
* @author developer
*/
public class Encryption {
public static void main(String[] args) {
// Initialize encryption system
String secretKey = "MySuperSecretKey123"; // TODO: Store securely
String encryptedMessage = "Ghs27Jsh1a9Mkl02";

try {
String decrypted = decrypt(encryptedMessage, secretKey);
System.out.println("Decrypted: " + decrypted);
} catch (Exception e) {
e.printStackTrace();
}
}

/**
* Encrypts data using AES
*/
public static String encrypt(String data, String key) throws Exception {
SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "AES");
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, secretKey);
return Base64.getEncoder().encodeToString(cipher.doFinal(data.getBytes()));
}

/**
* Decrypts data using AES
*/
public static String decrypt(String data, String key) throws Exception {
SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "AES");
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.DECRYPT_MODE, secretKey);
return new String(cipher.doFinal(Base64.getDecoder().decode(data)));
}
}`;

// Track if the decryption was successful
this.decryptionSuccess = false;
}

preload() {
// Load any specific assets for this challenge
this.load.image('terminal_bg', 'assets/terminal_bg.png');
}

create() {
// Set up the challenge gameplay screen
this.createBackground();
this.createStartMessage();
}

createBackground() {
// Create a dark background with green tint
const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x002211);
bg.setOrigin(0, 0);

// Create a subtle grid pattern (darker than challenge select screen)
const gridSize = 40;
const graphics = this.add.graphics();
graphics.lineStyle(1, 0x003322, 0.2);

// Draw vertical lines
for(let x = 0; x < this.cameras.main.width; x += gridSize) {
graphics.moveTo(x, 0);
graphics.lineTo(x, this.cameras.main.height);
}

// Draw horizontal lines
for(let y = 0; y < this.cameras.main.height; y += gridSize) {
graphics.moveTo(0, y);
graphics.lineTo(this.cameras.main.width, y);
}

graphics.strokePath();
}

createStartMessage() {
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 4;

// Create the message with animation
const message = this.add.text(centerX, centerY, 'CHALLENGE A2: LEVEL 3', {
fontFamily: 'Courier New, monospace',
fontSize: '32px',
fontStyle: 'bold',
color: '#00ff66', // Hacker green
align: 'center'
});

message.setOrigin(0.5);
message.setAlpha(0);

// Animate the message appearance with a typewriter effect
this.tweens.add({
targets: message,
alpha: 1,
duration: 800,
ease: 'Power2',
onComplete: () => {
    // Add blinking cursor effect
    const cursor = this.add.text(message.x + message.width / 2 + 10, message.y, '_', {
        fontFamily: 'Courier New, monospace',
        fontSize: '32px',
        color: '#00ff66'
    });
    cursor.setOrigin(0.5);
    
    this.tweens.add({
        targets: cursor,
        alpha: 0,
        duration: 500,
        yoyo: true,
        repeat: 5,
        onComplete: () => {
            cursor.destroy();
            
            // Fade out the initial message to make room for the challenge interface
            this.time.delayedCall(1000, () => {
                this.tweens.add({
                    targets: message,
                    alpha: 0,
                    y: centerY - 50,
                    duration: 800,
                    ease: 'Power2'
                });
            });
        }
    });
}
});

// Add a subtitle that appears after the main message
const subtitle = this.add.text(centerX, centerY + 50, 'Key Chaos: The Lost Encryption Key', {
fontFamily: 'Courier New, monospace',
fontSize: '20px',
color: '#33cc99',
align: 'center'
});

subtitle.setOrigin(0.5);
subtitle.setAlpha(0);

this.tweens.add({
targets: subtitle,
alpha: 1,
duration: 800,
delay: 1200,
ease: 'Power2',
onComplete: () => {
    this.time.delayedCall(2000, () => {
        this.tweens.add({
            targets: subtitle,
            alpha: 0,
            y: centerY,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                this.showInstructionPopup();
            }
        });
    });
}
});
}

showInstructionPopup() {
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 2;

// Create popup container
const popupContainer = this.add.container(centerX, centerY);

// Tutorial popup background
const popupBg = this.add.rectangle(0, 0, 600, 350, 0x000000, 0.9);
popupBg.setStrokeStyle(2, 0x33cc99);

// Popup header
const popupHeader = this.add.text(0, -140, 'IMPROPER KEY MANAGEMENT', {
fontFamily: 'Arial, sans-serif',
fontSize: '28px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
popupHeader.setOrigin(0.5);

// Popup content
const content = [
"Encryption protects sensitive data, but if keys are exposed,",
"attackers can decrypt everything!",
"",
"Your goal: Find the encryption key hidden in the source code",
"and use it to decrypt the message!"
].join('\n');

const popupContent = this.add.text(0, 0, content, {
fontFamily: 'Arial, sans-serif',
fontSize: '18px',
color: '#ffffff',
align: 'center',
lineSpacing: 10
});
popupContent.setOrigin(0.5);

// Continue button
const buttonBg = this.add.rectangle(0, 130, 200, 50, 0x33cc99);
buttonBg.setInteractive({ useHandCursor: true });

const buttonText = this.add.text(0, 130, 'START', {
fontFamily: 'Arial, sans-serif',
fontSize: '20px',
color: '#ffffff',
align: 'center'
});
buttonText.setOrigin(0.5);

// Add components to the popup container
popupContainer.add(popupBg);
popupContainer.add(popupHeader);
popupContainer.add(popupContent);
popupContainer.add(buttonBg);
popupContainer.add(buttonText);

// Animation for popup appearance
popupContainer.setAlpha(0);
popupContainer.setScale(0.8);

this.tweens.add({
targets: popupContainer,
alpha: 1,
scale: 1,
duration: 300,
ease: 'Power2'
});

// Continue button action
buttonBg.on('pointerdown', () => {
this.tweens.add({
    targets: popupContainer,
    alpha: 0,
    scale: 0.8,
    duration: 300,
    ease: 'Power2',
    onComplete: () => {
        popupContainer.destroy();
        this.showKeyManagementGame();
    }
});
});

// Hover effects for button
buttonBg.on('pointerover', () => {
buttonBg.fillColor = 0x66eebb;
});

buttonBg.on('pointerout', () => {
buttonBg.fillColor = 0x33cc99;
});
}

showKeyManagementGame() {
const centerX = this.cameras.main.width / 2;
const centerY = this.cameras.main.height / 2;

// Create game container
const gameContainer = this.add.container(centerX, centerY);

// Game background
const gameBg = this.add.rectangle(0, 0, 750, 500, 0x001100, 0.9);
gameBg.setStrokeStyle(2, 0x33cc99);

// Game title
const gameTitle = this.add.text(0, -230, 'FIND THE SECRET ENCRYPTION KEY', {
fontFamily: 'Arial, sans-serif',
fontSize: '28px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
gameTitle.setOrigin(0.5);

// Instructions
const instructions = this.add.text(0, -190, 'Scan the source code to find the hardcoded encryption key', {
fontFamily: 'Arial, sans-serif',
fontSize: '18px',
color: '#ffffff',
align: 'center'
});
instructions.setOrigin(0.5);

// Create the three panels - first, reorganize the layout for better spacing

// 1. Left Panel - Source Code Viewer (make it bigger and clearly mark as scrollable)
const leftPanelBg = this.add.rectangle(-200, 0, 320, 370, 0x000000, 0.8);
leftPanelBg.setStrokeStyle(2, 0x33cc99);

const leftPanelTitle = this.add.text(-200, -170, 'SOURCE CODE', {
fontFamily: 'Arial, sans-serif',
fontSize: '20px',
fontStyle: 'bold',
color: '#33cc99',
align: 'center'
});
leftPanelTitle.setOrigin(0.5);

// Add scroll indicator
const scrollHint = this.add.text(-200, -145, '(CLICK AND DRAG TO SCROLL)', {
fontFamily: 'Arial, sans-serif',
fontSize: '12px',
color: '#ffcc00',
align: 'center'
});
scrollHint.setOrigin(0.5);

// Create scrollable source code with a clear scrollbar
const sourceCodeMask = this.add.graphics().fillStyle(0xffffff).fillRect(-360, -120, 320, 330);

// Source code text with monospace font - larger and with more spacing
const codeText = this.add.text(-350, -120, this.sourceCode, {
fontFamily: 'Courier New, monospace',
fontSize: '14px',
color: '#aaffcc',
align: 'left',
wordWrap: { width: 280 },
lineSpacing: 8
});

// Create mask for scrolling
codeText.setMask(new Phaser.Display.Masks.GeometryMask(this, sourceCodeMask));

// Create a visual scrollbar on the right side of the code panel
const scrollBarBg = this.add.rectangle(-55, 0, 10, 330, 0x333333);
const scrollBarHandle = this.add.rectangle(-55, -120, 10, 60, 0x33cc99);

// Scroll functionality variables
let isScrolling = false;
let startY = 0;
let scrollY = 0;

// Add scroll interaction with improved feedback
leftPanelBg.setInteractive({ useHandCursor: true })
.on('pointerdown', (pointer) => {
    leftPanelBg.fillColor = 0x001122; // Visual feedback when clicking
    isScrolling = true;
    startY = pointer.y;
})
.on('pointermove', (pointer) => {
    if (isScrolling) {
        const diff = pointer.y - startY;
        scrollY += diff;
        
        // Limit scrolling
        const maxScroll = -codeText.height + 330;
        scrollY = Phaser.Math.Clamp(scrollY, maxScroll, 0);
        
        codeText.y = -120 + scrollY;
        
        // Update scrollbar position
        const scrollRatio = scrollY / maxScroll;
        const scrollHandleY = -120 + (scrollRatio * 270);
        scrollBarHandle.y = scrollHandleY;
        
        startY = pointer.y;
    }
})
.on('pointerup', () => {
    leftPanelBg.fillColor = 0x000000; // Reset color when released
    isScrolling = false;
})
.on('pointerover', () => {
    leftPanelBg.fillColor = 0x001122; // Highlight when hovering
})
.on('pointerout', () => {
    if (!isScrolling) {
        leftPanelBg.fillColor = 0x000000; // Reset color when not hovering
    }
});

// 2. Middle Panel - Encrypted Message (positioned better)
const middlePanelBg = this.add.rectangle(0, -30, 250, 80, 0x000000, 0.8);
middlePanelBg.setStrokeStyle(2, 0x33cc99);

const middlePanelTitle = this.add.text(0, -80, 'ENCRYPTED MESSAGE', {
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#33cc99',
    align: 'center'
});
middlePanelTitle.setOrigin(0.5);

const encryptedText = this.add.text(0, -30, this.encryptedMessage, {
    fontFamily: 'Courier New, monospace',
    fontSize: '22px',
    color: '#ffaa33',
    align: 'center',
    fontStyle: 'bold'
});
encryptedText.setOrigin(0.5);

// 3. Right Panel - Decryption Input (enlarged and clear)
const rightPanelBg = this.add.rectangle(250, 40, 280, 340, 0x000000, 0.8);
rightPanelBg.setStrokeStyle(2, 0x33cc99);

const rightPanelTitle = this.add.text(250, -120, 'ENTER DECRYPTION KEY', {
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#33cc99',
    align: 'center'
});
rightPanelTitle.setOrigin(0.5);

// Input box (larger and more obvious)
const inputBoxBg = this.add.rectangle(250, -70, 240, 50, 0x003322);
inputBoxBg.setStrokeStyle(3, 0x33cc99);
inputBoxBg.setInteractive({ useHandCursor: true });

// Visual feedback when clicking the input box
inputBoxBg.on('pointerover', () => {
    inputBoxBg.fillColor = 0x004433; // Highlight on hover
});

inputBoxBg.on('pointerout', () => {
    inputBoxBg.fillColor = 0x003322; // Reset on mouse out
});

inputBoxBg.on('pointerdown', () => {
    inputBoxBg.fillColor = 0x005544; // Different color when clicked
    inputBoxBg.setStrokeStyle(3, 0x66ffcc); // Highlight border when selected
});

// Placeholder for user input with clear indication it's editable
let inputText = '';
const inputTextDisplay = this.add.text(250, -70, inputText + '|', {
    fontFamily: 'Courier New, monospace',
    fontSize: '20px',
    color: '#ffffff',
    align: 'center'
});
inputTextDisplay.setOrigin(0.5);

// Add text to indicate input is expected
const inputHint = this.add.text(250, -40, "Click to activate keyboard input", {
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    color: '#aaaaaa',
    align: 'center'
});
inputHint.setOrigin(0.5);

// Create blinking cursor effect
const cursorTimer = this.time.addEvent({
    delay: 500,
    callback: () => {
        if (inputTextDisplay.text.endsWith('|')) {
            inputTextDisplay.setText(inputText);
        } else {
            inputTextDisplay.setText(inputText + '|');
        }
    },
    loop: true
});

// Decrypt button (larger and more prominent)
const decryptButton = this.add.rectangle(250, 0, 240, 50, 0x33cc99);
decryptButton.setInteractive({ useHandCursor: true });

const decryptText = this.add.text(250, 0, 'DECRYPT', {
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    fontStyle: 'bold',
    color: '#ffffff',
    align: 'center'
});
decryptText.setOrigin(0.5);

// Decryption result area (larger and more distinct)
const resultBoxBg = this.add.rectangle(250, 70, 240, 80, 0x003322);
resultBoxBg.setStrokeStyle(2, 0x33cc99);

// Initial result text (empty)
const resultText = this.add.text(250, 70, 'Decryption result will appear here', {
    fontFamily: 'Courier New, monospace',
    fontSize: '14px',
    color: '#999999',
    align: 'center',
    wordWrap: { width: 220 }
});
resultText.setOrigin(0.5);

// Hint text (made more visible)
const hintText = this.add.text(250, 140, 'Hint: Keys should never be in the source code.\nLook for something that seems like a secret!', {
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#ffcc00',
    align: 'center',
    wordWrap: { width: 230 }
});
hintText.setOrigin(0.5);
hintText.setAlpha(1); // Always visible to help players

// Status message at the bottom (larger and clearer)
const statusText = this.add.text(0, 210, 'Find the secret key in the source code and enter it above', {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: '#ffffff',
    align: 'center'
});
statusText.setOrigin(0.5);

// Add components to game container
gameContainer.add(gameBg);
gameContainer.add(gameTitle);
gameContainer.add(instructions);
gameContainer.add(leftPanelBg);
gameContainer.add(leftPanelTitle);
gameContainer.add(scrollHint);
gameContainer.add(codeText);
gameContainer.add(scrollBarBg);
gameContainer.add(scrollBarHandle);
gameContainer.add(middlePanelBg);
gameContainer.add(middlePanelTitle);
gameContainer.add(encryptedText);
gameContainer.add(rightPanelBg);
gameContainer.add(rightPanelTitle);
gameContainer.add(inputBoxBg);
gameContainer.add(inputTextDisplay);
gameContainer.add(inputHint);
gameContainer.add(decryptButton);
gameContainer.add(decryptText);
gameContainer.add(resultBoxBg);
gameContainer.add(resultText);
gameContainer.add(hintText);
gameContainer.add(statusText);

// Animation for game appearance
gameContainer.setAlpha(0);

this.tweens.add({
    targets: gameContainer,
    alpha: 1,
    duration: 500,
    ease: 'Power2'
});

// Setup keyboard input - only activate when input box is clicked
let keyboardActive = false;

inputBoxBg.on('pointerdown', () => {
    keyboardActive = true;
    inputHint.setText("Keyboard input active");
    inputHint.setColor('#00ff66');
});

// Allow clicking elsewhere to deactivate keyboard
gameBg.setInteractive({ useHandCursor: false })
    .on('pointerdown', (pointer) => {
        // Only deactivate if clicking outside input box
        const inputBoxBounds = inputBoxBg.getBounds();
        if (!Phaser.Geom.Rectangle.Contains(
            inputBoxBounds, pointer.x - centerX + inputBoxBounds.width/2, 
            pointer.y - centerY + inputBoxBounds.height/2)) {
            keyboardActive = false;
            inputHint.setText("Click to activate keyboard input");
            inputHint.setColor('#aaaaaa');
            inputBoxBg.setStrokeStyle(3, 0x33cc99); // Reset border
        }
    });

this.input.keyboard.on('keydown', (event) => {
    if (!keyboardActive) return;
    
    // Handle backspace
    if (event.keyCode === 8 && inputText.length > 0) {
        inputText = inputText.slice(0, -1);
        inputTextDisplay.setText(inputText + '|');
        return;
    }
    
    // Handle regular text input
    if ((event.keyCode >= 48 && event.keyCode <= 90) ||  // Numbers and uppercase letters
        (event.keyCode >= 96 && event.keyCode <= 111) || // Numpad
        (event.keyCode >= 186 && event.keyCode <= 222) || // Special characters
        event.keyCode === 32) { // Space
        
        // Limit input length
        if (inputText.length < 25) {
            inputText += event.key;
            inputTextDisplay.setText(inputText + '|');
        }
    }
    
    // Handle Enter key
    if (event.keyCode === 13) {
        checkDecryptionKey();
    }
});