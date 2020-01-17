
function createAnimation(game, animKey, animFrameSource, startFrame, endFrame, frameRate) {
    game.anims.create({
        key: animKey,
        frames: game.anims.generateFrameNumbers(animFrameSource, { start: startFrame, end: endFrame }),
        frameRate: frameRate,
        repeat: -1
    });
}





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
    scene: [MainMenu,GameScene, GameOverScene],
};
var game = new Phaser.Game(config);
