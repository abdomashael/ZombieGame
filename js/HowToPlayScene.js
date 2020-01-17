var HowToPlayScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function HowToPlayScene() {
            Phaser.Scene.call(this, { key: 'HowToPlayScene' });
        },
    preload: function () {
        //LOADING iamges to the secene
        this.load.image('back', 'assets/backHowToPlay.png');
        this.load.image('ground', 'assets/platform.png');
        //this.load.image('up', 'assets/UP.png');
        //this.load.image('space', 'assets/Space.png');
        this.load.image('sewer1', 'assets/sewer1.png');
        this.load.spritesheet('attacker', 'assets/attacker.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('Anim', 'assets/menuAnim.png', { frameWidth: 521, frameHeight: 573 });
    },
    create: function () {
        //adidng images to the scene
        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        //UP = this.add.image(150, 300, 'up');
        //Space = this.add.image(100, 300, 'space');
        sewer = this.add.image(1800, 625, 'sewer1');
        var Anim = this.physics.add.sprite(1500, 300, 'Anim');
        var Attacker = this.physics.add.sprite(345, 300, 'attacker');

        //incearsing the scaie of the anime
        Anim.setScale(0.5);
        Attacker.setScale(3);


        //adding nimation to the zombie girl and attacker
        createAnimation(this, 'attacker', 'attacker', 0, 4, 5);
        createAnimation(this, 'idle', 'Anim', 0, 14, 30);



        //play the animation
        Anim.anims.play('idle', true);
        Attacker.anims.play('attacker', true);



        //adding a ground to stop the animation
        platforms = this.physics.add.staticGroup();
        platforms.create(600, 980, 'ground');
        this.physics.add.collider(A, platforms);
        platforms.create(900, 550, 'ground');
        this.physics.add.collider(Attacker, platforms);


        console.log(txt);
        //ading title
        var txtparagrph = this.make.text({
            x: 1000,
            y: 100,
            text: 'Welcome To Our Game',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 80px Algerian',
                fill: '#ffdf94',
                wrap: {
                    mode: 'word',
                    width: 300
                }
            }
        });
        //add the paragraphs
        Texth = this.add.text(0, 300, 'Hello to the guide of our game we are pleased you are here and now let us start', { fontSize: '30px', fill: '#ffff' });
        Textup = this.add.text(50, 400, 'First you just need to click on space or the up to jump ', { fontSize: '30px', fill: '#ffff' });
        Textattacker = this.add.text(100, 500, 'Please watch out from this zombie eater plant or you will lose on of your loyal friends', { fontSize: '30px', fill: '#ffff' });
        Textatsewer = this.add.text(150, 600, 'the last thing we want to tell you is that if you fell in the sewer you will lose', { fontSize: '30px', fill: '#ffff',fontFamily:'Calibri'});
        Textatfinally = this.add.text(200, 700, 'We hope you enjoy our game and We wish you the best of luck beacuse you will need it', { fontSize: '30px', fill: '#ffff' });

    },
    update: function () { }
});