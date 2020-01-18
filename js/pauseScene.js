var pauseScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function pauseScene ()
    {
        Phaser.Scene.call(this, { key: 'pauseScene' });
    },

    preload: function ()
    {
        this.load.image('resumeBtn', 'assets/resumeBtn.png');
    },

    create: function ()
    {
        this.add.image(400, 300, 'resumeBtn').setAlpha(0.5);

        this.input.on('pointerdown', function (event, gameObjects) {
            if (gameObjects[0].name == "resumeBtn") { 
                game.scene.stop();
                game.scene.resume('gameScene');
                }
        });

    }

});