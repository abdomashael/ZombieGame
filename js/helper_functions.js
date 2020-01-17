function createAnimation(game, animKey, animFrameSource, startFrame, endFrame, frameRate) {
    game.anims.create({
        key: animKey,
        frames: game.anims.generateFrameNumbers(animFrameSource, { start: startFrame, end: endFrame }),
        frameRate: frameRate,
        repeat: -1
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}