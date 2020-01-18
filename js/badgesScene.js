var badgesScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function badgesScene ()
    {
        Phaser.Scene.call(this, { key: 'badgesScene' });
    },

    preload: function ()
    {
        this.load.image('back', 'assets/back.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('pt50', 'assets/50.png');
        this.load.image('pt100', 'assets/100.png');
        this.load.image('pt500', 'assets/500.png');
        this.load.image('pt1000', 'assets/1000.png');
        this.load.spritesheet('menuBtn', 'assets/menuBtn.png', { frameWidth: 400, frameHeight: 92 });        
    },

    create: function ()
    {
        platforms = this.physics.add.staticGroup();
        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        pt50 = this.add.image(300,300, 'pt50');
        pt50.setScale(0.7);
        pt50Text = this.add.text(180, 550, 'Baby Zombie', { fontSize: '50px', fill: '#ffff' });
        pt100 = this.add.image(700, 600, 'pt100');
        pt100.setScale(0.7);
        pt100Text = this.add.text(570, 850, 'Amateur Zombie', { fontSize: '50px', fill: '#ffff' });
        pt500 = this.add.image(1100, 300, 'pt500');
        pt500.setScale(0.7);
        pt500Text = this.add.text(900, 550, 'Expert Zombie', { fontSize: '50px', fill: '#ffff' });
        pt1000 = this.add.image(1500, 600, 'pt1000');
        pt1000.setScale(0.7);
        pt1000Text = this.add.text(1350, 850, 'Joker', { fontSize: '50px', fill: '#ffff' });

        menuBtn = this.physics.add.sprite(920, 950, 'menuBtn').setInteractive();
        menuBtn.name = "menuBtn";
        createAnimation(this, 'menuBtn', 'menuBtn', 0, 1, 4);
        platforms.create(500, 1000, 'ground');
        this.physics.add.collider(menuBtn, platforms);

        this.input.on('pointerover', function (event, gameObjects) {
            if (gameObjects[0].name == "menuBtn") { gameObjects[0].anims.play('menuBtn', true); }});

        this.input.on('pointerdown', function (event, gameObjects) {
             if (gameObjects[0].name == "menuBtn") {
                game.scene.stop('badgesScene');
                game.scene.start('mainmenu');
            }});

        this.input.on('pointerout', function (event, gameObjects) {
            if (gameObjects[0].name == "menuBtn") {
                gameObjects[0].anims.stop('menuBtn', true);
                gameObjects[0].setFrame(0);
         }});
    }

});