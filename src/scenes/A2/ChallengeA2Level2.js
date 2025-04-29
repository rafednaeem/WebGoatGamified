class ChallengeA2Level2 extends Phaser.Scene {
    constructor() {
        super('ChallengeA2Level2');
        this.currentStep = 0;
        
        // Define the plaintext passwords and their hashes
        this.plaintextPasswords = [
            'password123',
            'p@ssw0rd',
            'admin2024',
            'admin!2024',
            'secure2024',
            'letmein',
            '123456'
        ];
        
        // MD5 hashes of the passwords
        this.hashedPasswords = [
            '5f4dcc3b5aa765d61d8327deb882cf99',
            'e99a18c428cb38d5f260853678922e03',
            '21232f297a57a5a743894a0e4a801fc3', // Collision with the next one
            '21232f297a57a5a743894a0e4a801fc3', // Collision with the previous one
            '7c6a180b36896a0a8c02787eeafb0e4c',
            '0d107d09f5bbe40cade3de5c71e9e9b7',
            'e10adc3949ba59abbe56e057f20f883e'
        ];
        
        // Track which passwords are selected by the player
        this.selectedPasswords = [];
        this.collisionFound = false;
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
        const message = this.add.text(centerX, centerY, 'CHALLENGE A2: LEVEL 2', {
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
        const subtitle = this.add.text(centerX, centerY + 50, 'Hash Clash: The Weak Algorithm', {
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
        const popupBg = this.add.rectangle(0, 0, 500, 300, 0x000000, 0.9);
        popupBg.setStrokeStyle(2, 0x33cc99);
        
        // Popup header
        const popupHeader = this.add.text(0, -120, 'WEAK HASHING', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        popupHeader.setOrigin(0.5);
        
        // Popup content
        const content = [
            "Hashing is used to store passwords securely.",
            "",
            "Weak hashing algorithms allow attackers to crack",
            "passwords quickly.",
            "",
            "Your goal: Compare hashed passwords and find a collision!"
        ].join('\n');
        
        const popupContent = this.add.text(0, 0, content, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 5
        });
        popupContent.setOrigin(0.5);
        
        // Continue button
        const buttonBg = this.add.rectangle(0, 110, 150, 40, 0x33cc99);
        buttonBg.setInteractive({ useHandCursor: true });
        
        const buttonText = this.add.text(0, 110, 'START', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
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
                    this.showHashComparisonGame();
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
    
    showHashComparisonGame() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Create game container
        const gameContainer = this.add.container(centerX, centerY);
        
        // Game background
        const gameBg = this.add.rectangle(0, 0, 750, 450, 0x001100, 0.9);
        gameBg.setStrokeStyle(2, 0x33cc99);
        
        // Game title
        const gameTitle = this.add.text(0, -200, 'FIND THE HASH COLLISION', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        gameTitle.setOrigin(0.5);
        
        // Instructions
        const instructions = this.add.text(0, -165, 'Select two passwords that generate the same hash value', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        instructions.setOrigin(0.5);
        
        // Add hash algorithm indication
        const algorithmText = this.add.text(0, -140, 'Using MD5 Hashing Algorithm', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#ffcc00',
            align: 'center'
        });
        algorithmText.setOrigin(0.5);
        
        // Divider line
        const dividerLine = this.add.graphics();
        dividerLine.lineStyle(2, 0x33cc99, 0.7);
        dividerLine.lineBetween(0, -120, 700, -120);
        
        // Section headers
        const leftHeader = this.add.text(-300, -100, 'PLAINTEXT PASSWORDS', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        leftHeader.setOrigin(0.5);
        
        const rightHeader = this.add.text(300, -100, 'HASHED VALUES (MD5)', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        rightHeader.setOrigin(0.5);
        
        // Add components to the game container
        gameContainer.add(gameBg);
        gameContainer.add(gameTitle);
        gameContainer.add(instructions);
        gameContainer.add(algorithmText);
        gameContainer.add(dividerLine);
        gameContainer.add(leftHeader);
        gameContainer.add(rightHeader);
        
        // Create password buttons
        this.createPasswordButtons(gameContainer);
        
        // Animation for game appearance
        gameContainer.setAlpha(0);
        
        this.tweens.add({
            targets: gameContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });
    }
    
    createPasswordButtons(gameContainer) {
        const leftStartY = -60;
        const rightStartY = -60;
        const spacing = 50;
        const leftX = -300;
        const rightX = 300;
        
        // Status message at the bottom
        const statusText = this.add.text(0, 170, 'Select two passwords that have matching hashes', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        statusText.setOrigin(0.5);
        gameContainer.add(statusText);
        
        // Create plaintext password buttons
        for (let i = 0; i < this.plaintextPasswords.length; i++) {
            const y = leftStartY + (i * spacing);
            const plainButton = this.add.rectangle(leftX, y, 350, 40, 0x003322);
            plainButton.setStrokeStyle(1, 0x33cc99);
            plainButton.setInteractive({ useHandCursor: true });
            
            const plainText = this.add.text(leftX, y, this.plaintextPasswords[i], {
                fontFamily: 'Courier New, monospace',
                fontSize: '16px',
                color: '#ffffff',
                align: 'center'
            });
            plainText.setOrigin(0.5);
            
            // Store reference to the button and index in the plaintext variable
            plainButton.passwordIndex = i;
            plainButton.isPlaintext = true;
            
            gameContainer.add(plainButton);
            gameContainer.add(plainText);
            
            // Handle selection
            plainButton.on('pointerdown', () => {
                this.handlePasswordSelection(plainButton, gameContainer, statusText);
            });
            
            // Hover effects
            plainButton.on('pointerover', () => {
                plainButton.fillColor = 0x006633;
            });
            
            plainButton.on('pointerout', () => {
                if (!plainButton.isSelected) {
                    plainButton.fillColor = 0x003322;
                }
            });
        }
        
        // Create hashed password displays
        for (let i = 0; i < this.hashedPasswords.length; i++) {
            const y = rightStartY + (i * spacing);
            const hashBg = this.add.rectangle(rightX, y, 350, 40, 0x002211);
            hashBg.setStrokeStyle(1, 0x336655);
            
            const hashText = this.add.text(rightX, y, this.hashedPasswords[i], {
                fontFamily: 'Courier New, monospace',
                fontSize: '14px',
                color: '#33cc99',
                align: 'center'
            });
            hashText.setOrigin(0.5);
            
            gameContainer.add(hashBg);
            gameContainer.add(hashText);
        }
    }
    
    handlePasswordSelection(button, gameContainer, statusText) {
        // Check if collision is already found
        if (this.collisionFound) {
            return;
        }
        
        // If this button is already selected, deselect it
        if (button.isSelected) {
            button.isSelected = false;
            button.fillColor = 0x003322;
            this.selectedPasswords = this.selectedPasswords.filter(index => index !== button.passwordIndex);
            statusText.setText('Select two passwords that have matching hashes');
            return;
        }
        
        // Can only select up to 2 passwords
        if (this.selectedPasswords.length >= 2) {
            // Deselect the first selected password
            const firstSelectedIndex = this.selectedPasswords.shift();
            
            // Find the button with this index and deselect it
            gameContainer.list.forEach(item => {
                if (item.type === 'Rectangle' && 
                    item.isPlaintext && 
                    item.passwordIndex === firstSelectedIndex) {
                    
                    item.isSelected = false;
                    item.fillColor = 0x003322;
                }
            });
        }
        
        // Select this button
        button.isSelected = true;
        button.fillColor = 0x00aa66;
        this.selectedPasswords.push(button.passwordIndex);
        
        // Check if we have 2 selected passwords now
        if (this.selectedPasswords.length === 2) {
            this.checkForCollision(gameContainer, statusText);
        }
    }
    
    checkForCollision(gameContainer, statusText) {
        const index1 = this.selectedPasswords[0];
        const index2 = this.selectedPasswords[1];
        
        // Check if the hashes match
        if (this.hashedPasswords[index1] === this.hashedPasswords[index2] && index1 !== index2) {
            // Found a collision
            this.collisionFound = true;
            
            // Update status text to show success
            statusText.setText('You found a hash collision!');
            statusText.setColor('#00ff66');
            
            // Highlight the matching hashes
            this.highlightMatchingHashes(gameContainer, index1, index2);
            
            // Show success message after a short delay
            this.time.delayedCall(1500, () => {
                this.showCollisionSuccessMessage(gameContainer);
            });
            
        } else {
            // No collision
            statusText.setText('Try again! Not all hashes are unique.');
            statusText.setColor('#ff6666');
        }
    }
    
    highlightMatchingHashes(gameContainer, index1, index2) {
        // Find the hash displays for the selected passwords and highlight them
        const rightX = 300;
        const rightStartY = -60;
        const spacing = 50;
        
        // Highlight the hash backgrounds
        const y1 = rightStartY + (index1 * spacing);
        const y2 = rightStartY + (index2 * spacing);
        
        // Find and highlight both hash rectangles
        gameContainer.list.forEach(item => {
            if (item.type === 'Rectangle' && 
                !item.isPlaintext && 
                (Math.abs(item.y - y1) < 1 || Math.abs(item.y - y2) < 1) &&
                Math.abs(item.x - rightX) < 1) {
                
                // Change to success color
                item.fillColor = 0x00aa66;
                item.setStrokeStyle(2, 0x00ff99);
                
                // Add a pulsing animation
                this.tweens.add({
                    targets: item,
                    alpha: 0.7,
                    duration: 500,
                    yoyo: true,
                    repeat: -1
                });
            }
        });
    }
    
    showCollisionSuccessMessage(gameContainer) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Create success message container
        const messageContainer = this.add.container(centerX, centerY);
        
        // Message background
        const messageBg = this.add.rectangle(0, 0, 600, 300, 0x000000, 0.95);
        messageBg.setStrokeStyle(2, 0x33cc99);
        
        // Message title
        const messageTitle = this.add.text(0, -120, 'HASH COLLISION FOUND!', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        messageTitle.setOrigin(0.5);
        
        // Message content
        const content = [
            "You found a hash collision! This means two different",
            "passwords created the same hash.",
            "",
            "MD5 and SHA-1 are weak because attackers can generate",
            "collisions easily.",
            "",
            "Modern hashing like SHA-256 or bcrypt adds security",
            "and prevents collisions."
        ].join('\n');
        
        const messageContent = this.add.text(0, 0, content, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 5
        });
        messageContent.setOrigin(0.5);
        
        // Continue button
        const continueButton = this.add.rectangle(0, 110, 200, 40, 0x33cc99);
        continueButton.setInteractive({ useHandCursor: true });
        
        const continueText = this.add.text(0, 110, 'CONTINUE', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        continueText.setOrigin(0.5);
        
        // Add components to the message container
        messageContainer.add(messageBg);
        messageContainer.add(messageTitle);
        messageContainer.add(messageContent);
        messageContainer.add(continueButton);
        messageContainer.add(continueText);
        
        // Fade out the game container
        this.tweens.add({
            targets: gameContainer,
            alpha: 0.3,
            duration: 300
        });
        
        // Animation for message appearance
        messageContainer.setAlpha(0);
        messageContainer.setScale(0.8);
        
        this.tweens.add({
            targets: messageContainer,
            alpha: 1,
            scale: 1,
            duration: 300,
            ease: 'Power2'
        });
        
        // Continue button action
        continueButton.on('pointerdown', () => {
            this.tweens.add({
                targets: [messageContainer, gameContainer],
                alpha: 0,
                scale: 0.8,
                duration: 300,
                ease: 'Power2',
                onComplete: () => {
                    messageContainer.destroy();
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
        const successBg = this.add.rectangle(0, 0, 600, 400, 0x001100, 0.95);
        successBg.setStrokeStyle(3, 0x33cc99);
        
        // Success header
        const successHeader = this.add.text(0, -150, 'CHALLENGE COMPLETE!', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        successHeader.setOrigin(0.5);
        
        // Success message
        const successTitle = this.add.text(0, -90, 'You found a weakness in the hashing algorithm!', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        });
        successTitle.setOrigin(0.5);
        
        // Explanation
        const explanationTitle = this.add.text(0, -40, 'What you learned:', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '20px',
            fontStyle: 'bold',
            color: '#33cc99',
            align: 'center'
        });
        explanationTitle.setOrigin(0.5);
        
        const explanation = [
            "• Weak hashes allow attackers to find password collisions.",
            "",
            "• If two different users have the same hashed password,",
            "  an attacker can use one to log in as another!",
            "",
            "• Always use strong hashing algorithms like bcrypt,",
            "  PBKDF2, or Argon2 to secure passwords."
        ].join('\n');
        
        const explanationText = this.add.text(0, 50, explanation, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 5
        });
        explanationText.setOrigin(0.5);
        
        // Next level button
        const nextButton = this.add.rectangle(0, 150, 200, 40, 0x33cc99);
        nextButton.setInteractive({ useHandCursor: true });
        
        const nextText = this.add.text(0, 150, 'NEXT LEVEL', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
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
                this.scene.start('ChallengeA2Level3'); // Transition to Level 3
            });
        });
        
        // Hover effects
        nextButton.on('pointerover', () => {
            nextButton.fillColor = 0x66eebb;
        });
        
        nextButton.on('pointerout', () => {
            nextButton.fillColor = 0x33cc99;
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