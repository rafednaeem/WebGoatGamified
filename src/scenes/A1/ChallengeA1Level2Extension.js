/**
 * Extension of the existing ChallengeA1Level2 class
 * Adds the back and reset buttons to the scene
 */
class ChallengeA1Level2Extension extends ChallengeA1Level2 {
    constructor() {
        super();
    }

    create() {
        // Call the original create method
        super.create();
        
        // Add back and reset buttons
        GameUIUtils.addLevelControlButtons(this, 'A1LevelSelect', 'ChallengeA1Level2');
    }
    
    // Override the showCompletionScreen method to add back button alongside next level
    showCompletionScreen() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Create completion container
        const completionContainer = this.add.container(centerX, centerY);
        
        // Background
        const completionBg = this.add.rectangle(0, 0, 600, 400, 0x000022, 0.95);
        completionBg.setStrokeStyle(3, 0x00ff00);
        
        // Completion message
        const completionTitle = this.add.text(0, -150, 'CHALLENGE A1 LEVEL 2 COMPLETE', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '36px',
            fontStyle: 'bold',
            color: '#00ff00',
            align: 'center'
        });
        completionTitle.setOrigin(0.5);
        
        // Lessons learned
        const lessonsTitle = this.add.text(0, -80, 'LESSONS LEARNED:', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        lessonsTitle.setOrigin(0.5);
        
        const lessonsContent = [
            "1. Session Hijacking: Exposed session IDs can be stolen to",
            "   impersonate legitimate users.",
            "",
            "2. Insecure Direct Object References: User-controlled parameters",
            "   should always be validated to prevent unauthorized access to",
            "   objects, like user accounts or files.",
            "",
            "3. Never trust client-side input: All input must be validated",
            "   and authorized server-side before access is granted."
        ].join('\n');
        
        const lessons = this.add.text(0, 20, lessonsContent, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#cccccc',
            align: 'center',
            lineSpacing: 5
        });
        lessons.setOrigin(0.5);
        
        // Next Level button
        const nextButton = this.add.rectangle(100, 150, 200, 40, 0x33cc33);
        nextButton.setInteractive({ useHandCursor: true });
        
        const nextText = this.add.text(100, 150, 'NEXT LEVEL', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        nextText.setOrigin(0.5);
        
        // Back to level select button
        const backButton = this.add.rectangle(-100, 150, 200, 40, 0x3366aa);
        backButton.setInteractive({ useHandCursor: true });
        
        const backText = this.add.text(-100, 150, 'LEVEL SELECT', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        });
        backText.setOrigin(0.5);
        
        // Add components to container
        completionContainer.add(completionBg);
        completionContainer.add(completionTitle);
        completionContainer.add(lessonsTitle);
        completionContainer.add(lessons);
        completionContainer.add(nextButton);
        completionContainer.add(nextText);
        completionContainer.add(backButton);
        completionContainer.add(backText);
        
        // Animation for completion screen appearance
        completionContainer.setAlpha(0);
        
        this.tweens.add({
            targets: completionContainer,
            alpha: 1,
            duration: 800,
            ease: 'Power2'
        });
        
        // Next Level button action
        nextButton.on('pointerdown', () => {
            this.cameras.main.fade(800, 0, 0, 0);
            this.time.delayedCall(800, () => {
                this.scene.start('ChallengeA1Level3');
            });
        });
        
        // Back button action
        backButton.on('pointerdown', () => {
            this.cameras.main.fade(800, 0, 0, 0);
            this.time.delayedCall(800, () => {
                this.scene.start('A1LevelSelect');
            });
        });
        
        // Hover effects
        nextButton.on('pointerover', () => {
            nextButton.fillColor = 0x66ff66;
        });
        
        nextButton.on('pointerout', () => {
            nextButton.fillColor = 0x33cc33;
        });
        
        backButton.on('pointerover', () => {
            backButton.fillColor = 0x5588cc;
        });
        
        backButton.on('pointerout', () => {
            backButton.fillColor = 0x3366aa;
        });
        
        // Victory particles
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
            tint: [0x00ff00, 0x0000ff, 0xff0000, 0xffff00],
            blendMode: 'ADD'
        });
    }
}