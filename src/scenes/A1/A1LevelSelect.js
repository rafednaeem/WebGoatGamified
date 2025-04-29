class A1LevelSelect extends Phaser.Scene {
    constructor() {
        super('A1LevelSelect');
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
        // Create a dark background with blue tint
        const bg = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000033);
        bg.setOrigin(0, 0);
        
        // Create a grid pattern overlay
        const gridSize = 30;
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x001155, 0.3);
        
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
        const headerText = this.add.text(centerX, 80, 'CHALLENGE A1 LEVELS', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '38px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            stroke: '#0066ff',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#0066ff',
                blur: 5,
                stroke: true,
                fill: true
            }
        });
        
        headerText.setOrigin(0.5);
        
        // Subtitle
        const subtitleText = this.add.text(centerX, 125, 'Session Hijacker', {
            fontFamily: 'Courier New, monospace',
            fontSize: '22px',
            color: '#3399ff',
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
                title: 'Session Hijacker',
                description: 'Steal a session and log in as another user',
                color: 0x0066aa,
                hoverColor: 0x3388cc,
                scene: 'ChallengeA1Gameplay'
            },
            {
                level: 2,
                title: 'IDOR Exploitation',
                description: 'Exploit insecure direct object references',
                color: 0x0066aa,
                hoverColor: 0x3388cc,
                scene: 'ChallengeA1Level2'
            },
            {
                level: 3,
                title: 'Locked But Not Secure',
                description: 'Find and access a restricted admin function',
                color: 0x0066aa,
                hoverColor: 0x3388cc,
                scene: 'ChallengeA1Level3'
            },
            {
                level: 4,
                title: 'Cookie Impersonator',
                description: 'Modify a cookie to gain higher privileges',
                color: 0x0066aa,
                hoverColor: 0x3388cc,
                scene: 'ChallengeA1Level4'
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
        buttonBg.lineStyle(3, 0x3366ff, 1);
        buttonBg.strokeRoundedRect(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight, 12);
        
        // Level number badge
        const badgeSize = 40;
        const badgeX = -buttonWidth/2 + 30;
        const badgeY = 0;
        
        const badge = this.add.graphics();
        badge.fillStyle(0x003366, 1);
        badge.fillCircle(badgeX, badgeY, badgeSize/2);
        badge.lineStyle(2, 0x3399ff, 1);
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
            buttonBg.lineStyle(3, 0x66aaff, 1);
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
            buttonBg.lineStyle(3, 0x3366ff, 1);
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
            this.cameras.main.flash(500, 0, 102, 255);
            
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