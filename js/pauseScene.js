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
        resumeBtn = this.add.image(920, 540, 'resumeBtn').setInteractive();

        resumeBtn.name = "resumeBtn";

        this.input.on('pointerdown', function (event, gameObjects) { 
            game.scene.stop('pauseScene');
            game.scene.resume('gameScene');
        });

    }

});