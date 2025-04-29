class A2LevelSelect extends Phaser.Scene {
    constructor() {
        super('A2LevelSelect');
    }

    preload() {
        // Load assets
        this.load.image('button', 'assets/button.png');
    }

    create() {
        // Create a dark background
        this.createBackground();
        
        // Header for the level select screen
        this.createHeader();
        
        // Create level selection buttons
        this.createLevelButtons();
    }
    
    createBackground() {
        // Create a dark background with green tint (different from A1's blue)
        const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x002211);
        bg.setOrigin(0, 0);
        
        // Create a grid pattern overlay
        const gridSize = 30;
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x003322, 0.3);
        
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
        const vignetteColor = 0x001100;
        
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
        const headerText = this.add.text(centerX, 80, 'CHALLENGE A2 LEVELS', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '38px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            stroke: '#00ff66',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#00ff66',
                blur: 5,
                stroke: true,
                fill: true
            }
        });
        
        headerText.setOrigin(0.5);
        
        // Subtitle
        const subtitleText = this.add.text(centerX, 125, 'Cryptographic Failures', {
            fontFamily: 'Courier New, monospace',
            fontSize: '22px',
            color: '#33ff99',
            align: 'center',
            fontStyle: 'bold'
        });
        
        subtitleText.setOrigin(0.5);
        
        // Add subtle animation
        this.tweens.add({
            targets: headerText,
            y: 85,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Back button to challenge screen
        this.createBackButton();
    }
    
    createBackButton() {
        const backButton = this.add.container(100, 50);
        
        // Button background
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0x224422, 1);
        buttonBg.fillRoundedRect(-50, -20, 100, 40, 8);
        buttonBg.lineStyle(2, 0x33ff66, 1);
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
            buttonBg.fillStyle(0x33ff66, 1);
            buttonBg.fillRoundedRect(-50, -20, 100, 40, 8);
            buttonBg.lineStyle(2, 0x66ffaa, 1);
            buttonBg.strokeRoundedRect(-50, -20, 100, 40, 8);
        });
        
        backButton.on('pointerout', () => {
            buttonBg.clear();
            buttonBg.fillStyle(0x224422, 1);
            buttonBg.fillRoundedRect(-50, -20, 100, 40, 8);
            buttonBg.lineStyle(2, 0x33ff66, 1);
            buttonBg.strokeRoundedRect(-50, -20, 100, 40, 8);
        });
        
        // Click action
        backButton.on('pointerdown', () => {
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('ChallengesScreen');
            });
        });
    }
    
    createLevelButtons() {
        const centerX = this.cameras.main.width / 2;
        const startY = 200;
        const spacing = 110;
        
        // Level data
        const levels = [
            {
                level: 1,
                title: 'Crypto Basics',
                description: 'Learn about basic encryption techniques',
                color: 0x006633,
                hoverColor: 0x33cc66,
                scene: 'ChallengeA2Level1Gameplay'
            },
            {
                level: 2,
                title: 'Weak Encryption',
                description: 'Exploit vulnerabilities in weak encryptions',
                color: 0x006633,
                hoverColor: 0x33cc66,
                scene: 'ChallengeA2Level2'
            },
            {
                level: 3,
                title: 'Hash Cracking',
                description: 'Crack poorly implemented password hashes',
                color: 0x006633,
                hoverColor: 0x33cc66,
                scene: 'ChallengeA2Level3'
            },
            {
                level: 4,
                title: 'Certificate Validation',
                description: 'Bypass security certificate validation',
                color: 0x006633,
                hoverColor: 0x33cc66,
                scene: 'ChallengeA2Level4'
            }
        ];
        
        // Create each level button
        levels.forEach((level, index) => {
            const y = startY + index * spacing;
            this.createLevelButton(centerX, y, level);
        });
    }
    
    createLevelButton(x, y, levelData) {
        const buttonContainer = this.add.container(x, y);
        
        // Button background
        const buttonWidth = 500;
        const buttonHeight = 90;
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(levelData.color, 0.8);
        buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
        buttonBg.lineStyle(3, 0x33ff66, 1);
        buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
        
        // Level number badge
        const badgeSize = 40;
        const badgeX = -buttonWidth/2 + 30;
        const badgeY = 0;
        
        const badge = this.add.graphics();
        badge.fillStyle(0x003322, 1);
        badge.fillCircle(badgeX, badgeY, badgeSize/2);
        badge.lineStyle(2, 0x33ff99, 1);
        badge.strokeCircle(badgeX, badgeY, badgeSize/2);
        
        const levelNumber = this.add.text(badgeX, badgeY, levelData.level.toString(), {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#ffffff'
        });
        
        levelNumber.setOrigin(0.5);
        
        // Level title
        const titleText = this.add.text(10, -20, levelData.title, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'left'
        });
        
        titleText.setOrigin(0, 0.5);
        
        // Level description
        const descText = this.add.text(10, 15, levelData.description, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#dddddd',
            align: 'left'
        });
        
        descText.setOrigin(0, 0.5);
        
        // Add components to container
        buttonContainer.add(buttonBg);
        buttonContainer.add(badge);
        buttonContainer.add(levelNumber);
        buttonContainer.add(titleText);
        buttonContainer.add(descText);
        
        // Make interactive
        buttonContainer.setSize(buttonWidth, buttonHeight);
        buttonContainer.setInteractive({ useHandCursor: true });
        
        // Hover effects
        buttonContainer.on('pointerover', () => {
            buttonBg.clear();
            buttonBg.fillStyle(levelData.hoverColor, 0.9);
            buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
            buttonBg.lineStyle(3, 0x66ffaa, 1);
            buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
            
            // Scale up slightly
            this.tweens.add({
                targets: buttonContainer,
                scaleX: 1.02,
                scaleY: 1.02,
                duration: 100,
                ease: 'Power1'
            });
        });
        
        buttonContainer.on('pointerout', () => {
            buttonBg.clear();
            buttonBg.fillStyle(levelData.color, 0.8);
            buttonBg.fillRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
            buttonBg.lineStyle(3, 0x33ff66, 1);
            buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
            
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
            this.cameras.main.flash(500, 0, 255, 102);
            
            this.time.delayedCall(300, () => {
                this.scene.start(levelData.scene);
            });
        });
        
        return buttonContainer;
    }

    update() {
        // Frame updates if needed
    }
}