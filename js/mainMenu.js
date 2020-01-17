


var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, { key: 'mainmenu' });
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

        this.load.audio('menuMusic', 'assets/MainTheme.mp3');
        this.load.spritesheet('menuAnim', 'assets/menuAnim.png', { frameWidth: 521, frameHeight: 573 });
        this.load.image('back', 'assets/back.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('playBtn', 'assets/playBtn.png', { frameWidth: 400, frameHeight: 92 });
        this.load.spritesheet('howToPlayBtn', 'assets/howToPlayBtn.png', { frameWidth: 400, frameHeight: 92 });
        this.load.spritesheet('badgesBtn', 'assets/badgesBtn.png', { frameWidth: 400, frameHeight: 92 });
        this.load.spritesheet('creditsBtn', 'assets/creditsBtn.png', { frameWidth: 400, frameHeight: 92 });

    },
    create: function () {
        
        // Main Menu Music
        this.sound.add('menuMusic');

        // Music Configurations
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        // Play Menu Music
        this.sound.play("menuMusic", musicConfig);

        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');

        //Adding sprite to menu
        menuAnim = this.physics.add.sprite(345, 550, 'menuAnim');
        playBtn = this.physics.add.sprite(1250, 300, 'playBtn').setInteractive();
        howToPlayBtn = this.physics.add.sprite(1250, 450, 'howToPlayBtn').setInteractive();
        badgesBtn = this.physics.add.sprite(1250, 600, 'badgesBtn').setInteractive();
        creditsBtn = this.physics.add.sprite(1250, 750, 'creditsBtn').setInteractive();

        playBtn.name = "playBtn";
        howToPlayBtn.name = "howToPlayBtn";
        badgesBtn.name = "badgesBtn";
        creditsBtn.name = "creditsBtn";

        menuAnim.setScale(1.5);
        playBtn.setScale(1.5);
        howToPlayBtn.setScale(1.5);
        badgesBtn.setScale(1.5);
        creditsBtn.setScale(1.5);

        createAnimation(this, 'idle', 'menuAnim', 0, 14, 25);
        menuAnim.anims.play('idle', true);

        createAnimation(this, 'playBtn', 'playBtn', 0, 1, 4);

        createAnimation(this, 'howToPlayBtn', 'howToPlayBtn', 0, 1, 4);

        createAnimation(this, 'badgesBtn', 'badgesBtn', 0, 1, 4);

        createAnimation(this, 'creditsBtn', 'creditsBtn', 0, 1, 4);

        //virtual line to collide
        platforms = this.physics.add.staticGroup();

        //animate sprite
        platforms.create(1920, 370, 'ground');
        this.physics.add.collider(playBtn, platforms);

        platforms.create(1920, 520, 'ground');
        this.physics.add.collider(howToPlayBtn, platforms);

        platforms.create(1920, 670, 'ground');
        this.physics.add.collider(badgesBtn, platforms);

        platforms.create(1920, 820, 'ground');
        this.physics.add.collider(creditsBtn, platforms);

        platforms.create(700, 980, 'ground');
        this.physics.add.collider(menuAnim, platforms);


        this.input.on('pointerover', function (event, gameObjects) {
            if (gameObjects[0].name == "playBtn") { gameObjects[0].anims.play('playBtn', true); }
            if (gameObjects[0].name == "howToPlayBtn") { gameObjects[0].anims.play('howToPlayBtn', true); }
            if (gameObjects[0].name == "badgesBtn") { gameObjects[0].anims.play('badgesBtn', true); }
            if (gameObjects[0].name == "creditsBtn") { gameObjects[0].anims.play('creditsBtn', true); }
        });

        this.input.on('pointerdown', function (event, gameObjects) {

            if (gameObjects[0].name == "playBtn") {
                game.scene.stop('mainmenu');
                game.scene.start('charactersScene');
            }

            if (gameObjects[0].name == "howToPlayBtn") {
                game.scene.start('howToPlayScene');
            }

            if (gameObjects[0].name == "badgesBtn") {
                game.scene.start('badgesScene');
            }

            if (gameObjects[0].name == "creditsBtn") {
                game.scene.start('creditsScene');
            }
        });

       
        this.input.on('pointerout', function (event, gameObjects) {

            if (gameObjects[0].name == "playBtn") { gameObjects[0].anims.stop('playBtn', true); gameObjects[0].setFrame(0); }
            if (gameObjects[0].name == "howToPlayBtn") { gameObjects[0].anims.stop('howToPlayBtn', true); gameObjects[0].setFrame(0); }
            if (gameObjects[0].name == "badgesBtn") { gameObjects[0].anims.stop('badgesBtn', true); gameObjects[0].setFrame(0); }
            if (gameObjects[0].name == "creditsBtn") { gameObjects[0].anims.stop('creditsBtn', true); gameObjects[0].setFrame(0); }

        });

        cursors = this.input.keyboard.createCursorKeys();

    },
    update: function () {
        // var game= this;

        // if(cursors.up.isDown){
        //     goPlay(game);
        // }
    }
});

