class ChallengeA2Screen extends Phaser.Scene {
    constructor() {
        super('ChallengeA2Screen');
    }

    preload() {
        // Load assets
        this.load.image('button', 'assets/button.png');
    }

    create() {
        // Create a dark background with grid similar to title screen
        this.createBackground();
        
        // Challenge title with animation
        this.createChallengeTitle();
        
        // Start button
        this.createStartButton();
    }
    
    createBackground() {
        // Create a dark background with green tint for A2 challenge
        const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x001100);
        bg.setOrigin(0, 0);
        
        // Create a grid pattern overlay - using green for A2 (different from A1's blue)
        const gridSize = 30;
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x003311, 0.3);
        
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
        
        // Add vignette effect (darker at the edges)
        const vignette = this.add.graphics();
        const vignetteColor = 0x001100;
        
        vignette.fillGradientStyle(
            vignetteColor, vignetteColor, 
            vignetteColor, vignetteColor, 
            0.8, 0.8, 0, 0
        );
        
        vignette.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    }
    
    createChallengeTitle() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 3;
        
        // Main challenge title with green glow effect
        const title = this.add.text(centerX, centerY, 'CHALLENGE A2', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '70px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            stroke: '#00ff66', // Green stroke instead of blue
            strokeThickness: 2,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#00ff66', // Green shadow
                blur: 10,
                stroke: true,
                fill: true
            }
        });
        
        title.setOrigin(0.5);
        title.setAlpha(0); // Start invisible for animation
        
        // Animated entrance for the title
        this.tweens.add({
            targets: title,
            alpha: 1,
            y: centerY - 20, // Slight upward movement during fade-in
            duration: 1500,
            ease: 'Power2',
            onComplete: () => {
                // After appearing, start pulsing animation
                this.tweens.add({
                    targets: title,
                    scaleX: 1.05,
                    scaleY: 1.05,
                    duration: 2000,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
        
        // Description with typewriter effect
        const descriptionText = 'Cryptographic Failures';
        const description = this.add.text(centerX, centerY + 80, '', {
            fontFamily: 'Courier New, monospace',
            fontSize: '24px',
            color: '#33ff99',
            align: 'center',
            fontStyle: 'bold'
        });
        
        description.setOrigin(0.5);
        
        // Typewriter effect for description
        let currentChar = 0;
        this.time.delayedCall(1000, () => {
            const typewriterEvent = this.time.addEvent({
                delay: 100,
                callback: () => {
                    description.text += descriptionText[currentChar];
                    currentChar++;
                    
                    // Random glitch effect occasionally
                    if (currentChar % 5 === 0) {
                        this.createGlitchEffect(description);
                    }
                    
                    if (currentChar === descriptionText.length) {
                        typewriterEvent.remove();
                        this.setupDescriptionAnimations(description);
                    }
                },
                repeat: descriptionText.length - 1
            });
        });
        
        // Add an icon or symbol for the challenge (lock with key)
        const securityIcon = this.add.graphics();
        securityIcon.fillStyle(0x00ff66, 1);
        securityIcon.fillCircle(centerX, centerY - 120, 40);
        securityIcon.fillStyle(0x001100, 1);
        securityIcon.fillCircle(centerX, centerY - 120, 30);
        securityIcon.lineStyle(3, 0x00ff66, 1);
        securityIcon.strokeCircle(centerX, centerY - 120, 35);
        
        // Lock and key icon
        const lockIcon = this.add.graphics();
        lockIcon.fillStyle(0x00ff66, 1);
        // Draw key shape
        lockIcon.fillRect(centerX - 20, centerY - 130, 5, 20); // Key stem
        lockIcon.fillRect(centerX - 15, centerY - 120, 25, 5); // Key tooth
        lockIcon.fillRect(centerX - 10, centerY - 110, 20, 5); // Key tooth
        lockIcon.fillCircle(centerX + 5, centerY - 130, 8); // Key head
        
        // Pulse animation for the security icon
        this.tweens.add({
            targets: [securityIcon, lockIcon],
            alpha: 0.7,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createGlitchEffect(textObject) {
        // Save original position and color
        const originalX = textObject.x;
        const originalY = textObject.y;
        
        // Random offset and color change
        textObject.setX(originalX + Phaser.Math.Between(-5, 5));
        textObject.setY(originalY + Phaser.Math.Between(-3, 3));
        textObject.setTint(Math.random() > 0.5 ? 0x00ffaa : 0x66ff99);
        
        // Reset after short delay
        this.time.delayedCall(50, () => {
            textObject.setPosition(originalX, originalY);
            textObject.setTint(0xffffff);
        });
    }
    
    setupDescriptionAnimations(description) {
        // Create recurring glitch effect after typing completes
        this.time.addEvent({
            delay: Phaser.Math.Between(3000, 6000),
            callback: () => {
                // Multiple rapid glitches
                for (let i = 0; i < 3; i++) {
                    this.time.delayedCall(i * 50, () => {
                        this.createGlitchEffect(description);
                    });
                }
            },
            loop: true
        });
    }
    
    createStartButton() {
        const centerX = this.cameras.main.width / 2;
        const buttonY = this.cameras.main.height * 0.7;
        
        // Create the button container
        const buttonContainer = this.add.container(centerX, buttonY);
        
        // Button background with green gradient
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0x006633, 1);
        buttonBg.fillRoundedRect(-100, -25, 200, 50, 10);
        
        // Add button text
        const buttonText = this.add.text(0, 0, 'BEGIN CHALLENGE', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '22px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        
        buttonText.setOrigin(0.5);
        
        // Add components to container
        buttonContainer.add(buttonBg);
        buttonContainer.add(buttonText);
        
        // Make the button interactive
        buttonContainer.setSize(200, 50);
        buttonContainer.setInteractive({ useHandCursor: true });
        
        // Start with button hidden, then fade in
        buttonContainer.setAlpha(0);
        this.tweens.add({
            targets: buttonContainer,
            alpha: 1,
            duration: 1000,
            delay: 2500, // Appear after title and description animations
            ease: 'Power2'
        });
        
        // Hover effects
        buttonContainer.on('pointerover', () => {
            buttonBg.clear();
            buttonBg.fillStyle(0x00cc66, 1);
            buttonBg.fillRoundedRect(-100, -25, 200, 50, 10);
            buttonText.setShadow(0, 0, '#ffffff', 5);
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 100,
                ease: 'Power1'
            });
        });
        
        buttonContainer.on('pointerout', () => {
            buttonBg.clear();
            buttonBg.fillStyle(0x006633, 1);
            buttonBg.fillRoundedRect(-100, -25, 200, 50, 10);
            buttonText.setShadow(0, 0, '#ffffff', 0);
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1,
                scaleY: 1,
                duration: 100,
                ease: 'Power1'
            });
        });
        
        // Click action
        buttonContainer.on('pointerdown', () => {
            // Flash effect - green flash for A2
            this.cameras.main.flash(500, 0, 255, 102);
            
            // Start the game after a short delay
            this.time.delayedCall(500, () => {
                // Navigate to the A2 level select scene
                this.scene.start('A2LevelSelect');
            });
        });
        
        // Button pulse animation
        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    update() {
        // Add any frame-by-frame updates here
    }
}