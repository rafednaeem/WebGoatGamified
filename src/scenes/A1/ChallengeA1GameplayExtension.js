/**
 * Extension of the existing ChallengeA1Gameplay class
 * Adds the back and reset buttons to the scene
 */
class ChallengeA1GameplayExtension extends ChallengeA1Gameplay {
    constructor() {
        super();
    }

    create() {
        // Call the original create method
        super.create();
        
        // Add back and reset buttons
        GameUIUtils.addLevelControlButtons(this, 'A1LevelSelect', 'ChallengeA1Gameplay');
    }
    
    // Override the showSuccessScreen method to add back button alongside next level
    showSuccessScreen(username) {
        // Stop the cursor blinking timer if it exists
        if (this.cursorTimer) {
            this.cursorTimer.remove();
            this.cursorTimer = null;
        }
        
        // Clear any keyboard listeners
        this.input.keyboard.removeAllKeys();
        this.input.keyboard.enabled = false;
        
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        
        // Create success container
        const successContainer = this.add.container(centerX, centerY);
        
        // Success background
        const successBg = this.add.rectangle(0, 0, 600, 400, 0x000000, 0.9);
        successBg.setStrokeStyle(2, 0x00ff00);
        
        // Success header
        const successHeader = this.add.text(0, -150, 'MISSION ACCOMPLISHED', {
            fontFamily: 'Arial Black, Impact, sans-serif',
            fontSize: '30px',
            fontStyle: 'bold',
            color: '#00ff00',
            align: 'center'
        });
        successHeader.setOrigin(0.5);
        
        // User info
        const userInfo = this.add.text(0, -100, `You are now logged in as: ${username}`, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        });
        userInfo.setOrigin(0.5);
        
        // Lesson title
        const lessonTitle = this.add.text(0, -50, 'WHAT YOU LEARNED:', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#3399ff',
            align: 'center'
        });
        lessonTitle.setOrigin(0.5);
        
        // Lesson content
        const lessonContent = [
            "• You successfully hijacked a session!",
            "",
            "• In real-world attacks, exposed session IDs can let",
            "  attackers steal user accounts.",
            "",
            "• To prevent this, web apps must use secure session handling,",
            "  expiration policies, and token validation."
        ].join('\n');
        
        const lesson = this.add.text(0, 50, lessonContent, {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 5
        });
        lesson.setOrigin(0.5);
        
        // Next level button
        const nextButton = this.add.rectangle(100, 150, 200, 40, 0x00aa00);
        nextButton.setInteractive({ useHandCursor: true });
        
        const nextText = this.add.text(100, 150, 'NEXT LEVEL', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        nextText.setOrigin(0.5);
        
        // Back to level select button
        const backButton = this.add.rectangle(-100, 150, 200, 40, 0x0066aa);
        backButton.setInteractive({ useHandCursor: true });
        
        const backText = this.add.text(-100, 150, 'LEVEL SELECT', {
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            color: '#ffffff',
            align: 'center'
        });
        backText.setOrigin(0.5);
        
        // Add components to the success container
        successContainer.add(successBg);
        successContainer.add(successHeader);
        successContainer.add(userInfo);
        successContainer.add(lessonTitle);
        successContainer.add(lesson);
        successContainer.add(nextButton);
        successContainer.add(nextText);
        successContainer.add(backButton);
        successContainer.add(backText);
        
        // Animation for success container appearance
        successContainer.setAlpha(0);
        
        this.tweens.add({
            targets: successContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });
        
        // Next level button action
        nextButton.on('pointerdown', () => {
            // Make sure all timers are stopped
            if (this.cursorTimer) {
                this.cursorTimer.remove();
                this.cursorTimer = null;
            }
            this.time.removeAllEvents();
            
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                // Transition to Level 2
                this.scene.start('ChallengeA1Level2');
            });
        });
        
        // Back button action
        backButton.on('pointerdown', () => {
            // Make sure all timers are stopped
            if (this.cursorTimer) {
                this.cursorTimer.remove();
                this.cursorTimer = null;
            }
            this.time.removeAllEvents();
            
            this.cameras.main.fade(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                // Transition to Level Select
                this.scene.start('A1LevelSelect');
            });
        });
        
        // Hover effects
        nextButton.on('pointerover', () => {
            nextButton.fillColor = 0x00dd00;
        });
        
        nextButton.on('pointerout', () => {
            nextButton.fillColor = 0x00aa00;
        });
        
        backButton.on('pointerover', () => {
            backButton.fillColor = 0x0088cc;
        });
        
        backButton.on('pointerout', () => {
            backButton.fillColor = 0x0066aa;
        });
        
        // Add some background particle effects for celebration
        const particles = this.add.particles('button'); // Assuming you have a particle texture
        
        particles.createEmitter({
            x: { min: 0, max: this.cameras.main.width },
            y: -50,
            speed: { min: 100, max: 200 },
            angle: { min: 80, max: 100 },
            scale: { start: 0.1, end: 0 },
            lifespan: 4000,
            quantity: 1,
            frequency: 200,
            blendMode: 'ADD',
            tint: 0x00ff00
        });
    }
}