var Texth;
var Texth2;
var Textup;
var Textattacker;
var Textatsewer;
var Textatfinally;
vx = 10;
vy = 10; 
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
        //this.load.image('backbtn', 'assets/menuBtnback.png');
        this.load.spritesheet('attacker', 'assets/attacker.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('Anim', 'assets/menuAnim.png', { frameWidth: 521, frameHeight: 573 });
        this.load.spritesheet('backbtn', 'assets/menuBtn.png', { frameWidth: 400, frameHeight: 92 });
    },
    create: function () {
        //adidng images to the scene
        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        //UP = this.add.image(150, 300, 'up');
        //Space = this.add.image(100, 300, 'space');
        var sewer = this.add.image(1800, 625, 'sewer1');
        var backbtn = this.add.sprite(200, 900, 'backbtn').setInteractive();
        var Anim = this.physics.add.sprite(1750, 835, 'Anim');
        var Attacker = this.physics.add.sprite(1850, 445, 'attacker');

        //flipping the charcter
        Anim.flipX = true;



        //incearsing the scaie of the anime
        Anim.setScale(0.5);
        Attacker.setScale(3);
        sewer.setScale(1.5);

        //adding nimation to the zombie girl and attacker
        createAnimation(this, 'attacker', 'attacker', 0, 4, 5);
        createAnimation(this, 'idle', 'Anim', 0, 14, 30);
        createAnimation(this, "menubtnchange", "backbtn", 1, 0, 4);



        //play the animation
        Anim.anims.play('idle', true);
        Attacker.anims.play('attacker', true);


        //adding a ground to stop the animation
        platforms = this.physics.add.staticGroup();
        platforms.create(700, 980, 'ground');
        this.physics.add.collider(Anim, platforms);
        platforms.create(900, 550, 'ground');
        this.physics.add.collider(Attacker, platforms);




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
        Texth = this.add.text(-600, 200, 'Hello to the guide of our game we are pleased you are here and now let us start', { fontSize: '50px', fill: '#ffd800', fontFamily: 'Courier', fontStyle: 'bold italic' });
        Texth2 = this.add.text(0, 300, 'All you have to do is that Just eat some victims to gain more zombie friends', { fontSize: '50px', fill: '#ff008b', fontFamily: 'Courier', fontStyle: 'bold italic' });
        Textup = this.add.text(0, 400, 'First you just need to click on space or the up buttons to jump to avoid attackers', { fontSize: '50px', fill: '#ff008b', fontFamily: 'Courier', fontStyle: 'bold italic' });
        Textattacker = this.add.text(0, 500, 'Please watch out from this zombie eater plant or you will lose on of your loyal friends', { fontSize: '50px', fill: '#ff008b', fontFamily: 'Courier', fontStyle: 'bold italic' });
        Textatsewer = this.add.text(0, 600, 'The last thing we want to tell you is that if you fell in the sewer you will lose', { fontSize: '50px', fill: '#ff008b', fontFamily: 'Courier', fontStyle: 'bold italic' });
        Textatfinally = this.add.text(0, 700, 'We hope you enjoy our game and We wish you the best of luck beacuse you will need it', { fontSize: '50px', fill: '#ffd800', fontFamily: 'Courier', fontStyle: 'bold italic' });
        
        //making the animation if the menu button
        backbtn.on('pointerover', function () {
            backbtn.anims.play('menubtnchange', true);
        }),
       
        backbtn.on('pointerout', function () {
            backbtn.anims.stop('menubtnchange', true);
            backbtn.setFrame(0);
        }),
        backbtn.on('pointerdown', function () {
            console.log("heloo");
            game.scene.start('mainmenu');
        })
    },

    update: function () {
        Texth.x+=vx;
        if(Texth.x > game.config.width)
            {
                Texth2.y += vy;

            }
            if(Texth2.y > game.config.height)
            {
                Texthup.x += vx;

            }
            if(Texthup.x > game.config.width)
            {
                Textattacker.y += vy;

            }
            if(Textattacker.y  > game.config.height)
            {
                Textatsewer.x += vx;

            }
            if(Textattacker.x  > game.config.width)
            {
                Textatfinally.y += vy;

            }
     }
});