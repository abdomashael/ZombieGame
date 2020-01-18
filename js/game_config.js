
var config = {

    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },


    scene: [MainMenu,CharctersScene,HowToPlayScene,CreditsScene,GameScene, GameOverScene,pauseScene],
};
var game = new Phaser.Game(config);
