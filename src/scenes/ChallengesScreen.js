class ChallengesScreen extends Phaser.Scene {
    constructor() {
        super('ChallengesScreen');
    }

    preload() {
        // Load assets
        this.load.image('button', 'assets/button.png');
    }

    create() {
        // Create a dark background
        this.createBackground();
        
        // Header for the challenges screen
        this.createHeader();
        
        // Create challenge buttons
        this.createChallengeButtons();
    }
    
    createBackground() {
        // Create a dark background
        const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000033);
        bg.setOrigin(0, 0);
        
        // Create a grid pattern overlay
        const gridSize = 30;
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x001133, 0.3);
        
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
        
        // Add vignette effect
        const vignette = this.add.graphics();
        const vignetteColor = 0x000022;
        
        vignette.fillGradientStyle(
            vignetteColor, vignetteColor, 
            vignetteColor, vignetteColor, 
            0.8, 0.8, 0, 0
        );
        
        vignette.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    }
    
    createHeader() {
        const centerX = this.cameras.main.width / 2;
        
        // Main header text
        const headerText = this.add.text(centerX, 80, 'SELECT CHALLENGE', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '40px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            stroke: '#3366ff',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#3366ff',
                blur: 5,
                stroke: true,
                fill: true
            }
        });
        
        headerText.setOrigin(0.5);
        
        // Add subtle animation
        this.tweens.add({
            targets: headerText,
            y: 85,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Back button to title screen
        this.createBackButton();
    }
    
    createBackButton() {
        const backButton = this.add.container(100, 50);
        
        // Button background
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0x222266, 1);
        buttonBg.fillRoundedRect(-50, -20, 100, 40, 8);
        buttonBg.lineStyle(2, 0x3366ff, 1);
        buttonBg.strokeRoundedRect(-50, -20, 100, 40, 8);
        
        // Button text
        const buttonText = this.add.text(0, 0, 'BACK', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        
        buttonText.setOrigin(0.5);
        
        // Add components to container
        backButton.add(buttonBg);
        backButton.add(buttonText);
        
        // Make interactive
        backButton.setSize(100, 40);
        backButton.setInteractive({ useHandCursor: true });
        
        // Hover effects
        backButton.on('pointerover', () => {
            buttonBg.clear();
            buttonBg.fillStyle(0x3366ff, 1);
            buttonBg.fillRoundedRect(-50, -20, 100, 40, 8);
            buttonBg.lineStyle(2, 0x66aaff, 1);
            buttonBg.strokeRoundedRect(-50, -20, 100, 40, 8);
        });
        
        backButton.on('pointerout', () => {
            buttonBg.clear();
            buttonBg.fillStyle(0x222266, 1);
            buttonBg.fillRoundedRect(-50, -20, 100, 40, 8);
            buttonBg.lineStyle(2, 0x3366ff, 1);
            buttonBg.strokeRoundedRect(-50, -20, 100, 40, 8);
        });
        
        // Click action
        backButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('TitleScreen');
            });
        });
    }
    
    createChallengeButtons() {
        const centerX = this.cameras.main.width / 2;
        const startY = this.cameras.main.height / 2 - 30; // Adjusted for 2 challenges
        const spacing = 150; // Increased spacing between challenges
        
        // Challenge data - now with both A1 and A2
        const challenges = [
            {
                id: 'A1',
                title: 'Challenge A1',
                description: 'Authentication & Access Control',
                color: 0x0066ff,
                hoverColor: 0x3399ff,
                nextScene: 'A1LevelSelect'
            },
            {
                id: 'A2',
                title: 'Challenge A2',
                description: 'Cryptographic Failures',
                color: 0x00aa44,
                hoverColor: 0x33cc66,
                nextScene: 'A2LevelSelect'
            }
            // Future challenges can be added here
        ];
        
        // Create each challenge button
        challenges.forEach((challenge, index) => {
            const y = startY + index * spacing;
            this.createChallengeButton(centerX, y, challenge);
        });
    }
    
    createChallengeButton(x, y, challenge) {
        const buttonContainer = this.add.container(x, y);
        
        // Button background
        const buttonWidth = 400;
        const buttonHeight = 120;
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(challenge.color, 0.8);
        buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
        buttonBg.lineStyle(3, 0x3366ff, 1);
        buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
        
        // Challenge title
        const titleText = this.add.text(0, -30, challenge.title, {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        
        titleText.setOrigin(0.5);
        
        // Challenge description
        const descText = this.add.text(0, 10, challenge.description, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        
        descText.setOrigin(0.5);
        
        // Add components to container
        buttonContainer.add(buttonBg);
        buttonContainer.add(titleText);
        buttonContainer.add(descText);
        
        // Make interactive
        buttonContainer.setSize(buttonWidth, buttonHeight);
        buttonContainer.setInteractive({ useHandCursor: true });
        
        // Hover effects
        buttonContainer.on('pointerover', () => {
            buttonBg.clear();
            buttonBg.fillStyle(challenge.hoverColor, 0.9);
            buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
            buttonBg.lineStyle(3, 0x66aaff, 1);
            buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
            
            // Scale up slightly
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.03,
                scaleY: 1.03,
                duration: 100,
                ease: 'Power1'
            });
        });
        
        buttonContainer.on('pointerout', () => {
            buttonBg.clear();
            buttonBg.fillStyle(challenge.color, 0.8);
            buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
            buttonBg.lineStyle(3, 0x3366ff, 1);
            buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 15);
            
            // Scale back to normal
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
            this.cameras.main.flash(500, 0, 102, 255);
            
            this.time.delayedCall(300, () => {
                this.scene.start(challenge.nextScene);
            });
        });
        
        // Add pulsing animation
        this.tweens.add({
            targets: buttonContainer,
            scaleX: 1.02,
            scaleY: 1.02,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        return buttonContainer;
    }

    update() {
        // Frame updates if needed
    }
}