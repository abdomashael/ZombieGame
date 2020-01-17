var GameOverScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function GameOverScene() {
            Phaser.Scene.call(this, { key: 'gameOverScene' });
        },
    preload: function () {
        this.load.image('gameOver', 'assets/game_over.png');
        this.load.spritesheet('tryBtn', 'assets/tryBtn.png', { frameWidth: 400, frameHeight: 92 });
        this.load.spritesheet('menuBtn', 'assets/menuBtn.png', { frameWidth: 400, frameHeight: 92 });
    },
    create: function () {
        var game = this;
        this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1920, 1080, 'gameOver');
        createAnimation(this, "tryBtnOver", "tryBtn", 1, 0, 4);
        createAnimation(this, "menuBtnOver", "menuBtn", 1, 0, 4);

        var sp = this.add.sprite(1440, 850, 'tryBtn').setInteractive();
        sp.name = "tryBtn";

        sp = this.add.sprite(440, 850, 'menuBtn').setInteractive();
        sp.name = "menuBtn";

        //  Events

        this.input.on('pointerover', function (event, gameObjects) {
            if (gameObjects[0].name == "tryBtn") { gameObjects[0].anims.play('tryBtnOver', true); }
            if (gameObjects[0].name == "menuBtn") { gameObjects[0].anims.play('menuBtnOver', true); }
        });
       
        this.input.on('pointerdown', function (event, gameObjects) {
            if (gameObjects[0].name == "tryBtn") { 
                game.scene.stop('gameOverScene');
                game.scene.start('gameScene');
            }

            if (gameObjects[0].name == "menuBtn") { 
                game.scene.stop('gameOverScene');
                game.scene.start('mainmenu');
            }
            
        });

        this.input.on('pointerout', function (event, gameObjects) {

            if (gameObjects[0].name == "tryBtn") { gameObjects[0].anims.stop('tryBtnOver', true); gameObjects[0].setFrame(0); }
            if (gameObjects[0].name == "menuBtn") { gameObjects[0].anims.stop('menuBtnOver', true); gameObjects[0].setFrame(0); }

        });

    },
    update: function () {

    }



});
