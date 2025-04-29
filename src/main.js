// Updated Game configuration for main.js
// Add ChallengeA2Level3Extension to the scene list

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [
        TitleScreen, 
        ChallengesScreen,
        // A1 Challenge scenes
        A1LevelSelect,
        ChallengeA1GameplayExtension, 
        ChallengeA1Level2Extension, 
        ChallengeA1Level3Extension, 
        ChallengeA1Level4Extension,
        // A2 Challenge scenes
        ChallengeA2Screen,
        A2LevelSelect,
        ChallengeA2Level1Extension,
        ChallengeA2Level2Extension,
        //ChallengeA2Level3Extension,
        GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// Create the game instance
const game = new Phaser.Game(config);