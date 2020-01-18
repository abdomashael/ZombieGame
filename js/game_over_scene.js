var GameOverScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function GameOverScene() {
            Phaser.Scene.call(this, { key: 'gameOverScene' });
        },
    preload: function () {
        var txt = this.add.text(850, 400, 'Loading ....', { fontSize: '43px', fill: '#00a308' });
        var progress = this.add.graphics();

        this.load.on('progress', function (value) {
            
            progress.clear();
            progress.fillStyle(0x00a308, 1);
            progress.fillRect(0, 270, 1200 * value, 60);

        });

        this.load.on('complete', function () {

            progress.destroy();
            txt.destroy();

        });

        this.load.audio('gameoverMusic', 'assets/GameOver.mp3');
        this.load.image('gameOver', 'assets/game_over.png');
        this.load.spritesheet('tryBtn', 'assets/tryBtn.png', { frameWidth: 400, frameHeight: 92 });
        this.load.spritesheet('menuBtn', 'assets/menuBtn.png', { frameWidth: 400, frameHeight: 92 });
    },
    create: function () {
        //Game Over Music
        this.sound.add('gameoverMusic');

        // Music Configurations
        var musicConfig = {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        //Play Mohahahaha
        this.sound.play("gameoverMusic", musicConfig);

        var game = this;
        this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1920, 1080, 'gameOver');
        createAnimation(this, "tryBtnOver", "tryBtn", 1, 0, 4);
        createAnimation(this, "menuBtnOver", "menuBtn", 1, 0, 4);

        var sp = this.add.sprite(1440, 850, 'tryBtn').setInteractive();
        sp.name = "tryBtn";

        var playScore = this.add.text(725,900,'Your Score: '+score, { fontSize: '50px',fontFamily: 'Courier', fontStyle: 'bold italic', fill: '#FFF333' });

        console.log(localStorage['abdo']);

        if(localStorage['abdo'] ==undefined){
            localStorage['abdo']=score;
            if(score>0){
                this.add.text(500,950,'Great this is your highest Scooooore... ', { fontSize: '50px',fontFamily: 'Courier', fontStyle: 'bold italic', fill: '#FFF333' });
            }
        }else if (localStorage['abdo']<score){
            localStorage['abdo']=score;
            this.add.text(450,950,'Great this is your highest Scooooore... ', { fontSize: '50px',fontFamily: 'Courier', fontStyle: 'bold italic', fill: '#FFF333' });

        }

        sp = this.add.sprite(440, 850, 'menuBtn').setInteractive();
        sp.name = "menuBtn";

        //  Events

        this.input.on('pointerover', function (event, gameObjects) {
            if (gameObjects[0].name == "tryBtn") { gameObjects[0].anims.play('tryBtnOver', true); }
            if (gameObjects[0].name == "menuBtn") { gameObjects[0].anims.play('menuBtnOver', true); }
        });
       
        this.input.on('pointerdown', function (event, gameObjects) {
            if (gameObjects[0].name == "tryBtn") {
                game.sound.removeByKey("gameoverMusic");
                game.scene.stop('gameOverScene');
                game.scene.start('gameScene');
            }

            if (gameObjects[0].name == "menuBtn") {
                game.sound.removeByKey("gameoverMusic");
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
