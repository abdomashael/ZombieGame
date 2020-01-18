
var config = {
    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [MainMenu,CharctersScene,HowToPlayScene,CreditsScene,GameScene, Level2Scene,GameOverScene],
};
var game = new Phaser.Game(config);
