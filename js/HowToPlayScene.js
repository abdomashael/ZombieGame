var HowToPlayScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function HowToPlayScene() {
            Phaser.Scene.call(this, { key: 'HowToPlayScene' });
        },
    preload: function () {
        this.load.image('back', 'assets/back.png');
        this.load.image('ground', 'assets/platform.png');
    },
    create: function () { },
    update: function () { }
});