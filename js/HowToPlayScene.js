var HowToPlayScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function HowToPlayScene() {
            Phaser.Scene.call(this, { key: 'HowToPlayScene' });
        },
    preload: function () {
        //LOADING iamges to the secene
        this.load.image('back', 'assets/backHowToPlay.png');
        this.load.image('ground', 'assets/backHowToPlay.png');
        this.load.image('up', 'assets/UP.png');
        this.load.image('space', 'assets/Space.png');
        this.load.image('sewer1', 'assets/sewer1.png');
        this.load.spritesheet('attacker', 'assets/attacker.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('Anim', 'assets/menuAnim.png', { frameWidth: 521, frameHeight: 573 });
    },
    create: function () {
        //adidng images toteh scene
        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        UP = this.add.image(150, 300, 'up');
        //Space = this.add.image(100, 300, 'space');
        sewer= this.add.image(150, 600, 'sewer');
        menuAnim = this.physics.add.sprite(345, 550, 'Anim');
        Anim.setScale(1.5);
        Attacker = this.physics.add.sprite(600, 500, 'attacker');
        //adding nimation to the zombie girl and attacker
        createAnimation(this, 'attacker', 'attacker', 0, 4, 5);
        createAnimation(this, 'idle', 'Anim', 0, 14, 30);
        //adding a ground to stop the animation
        platforms = this.physics.add.staticGroup();
        platforms.create(700, 980, 'ground');
        //stopping the anmation by colliding to the ground
        this.physics.add.collider(Anim, platforms);
        this.physics.add.collider(Attacker, platforms);
        console.log(txt);
        //ading title
        var txt = this.make.text({
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
        var txtparagrph = this.make.text({
            x: 0,
            y: 300,
            text: 'Hello to the guide of our game we are pleased you are here and now let us start',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 80px Algerian',
                fill: '#ffff',
                wrap: {
                    mode: 'word',
                    width: 300
                }
            }
        });
        var txtparagrph2 = this.make.text({
            x: 50,
            y: 400,
            text: 'First you just need to click on space or the up to jump ',
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
        var txtparagrph3 = this.make.text({
            x: 100,
            y: 500,
            text: 'Please watch out from this zombie eater plant or you will lose on of your loyal friends',
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
        var txtparagrph4 = this.make.text({
            x: 150,
            y: 600,
            text: 'the last thing i want to tell you is that if you fell in the sewer you will lose',
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
        var txtparagrph4 = this.make.text({
            x: 150,
            y: 600,
            text: 'We hope you enjoy our game and We wish you the best of luck beacuse you will need it',
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
     },
    update: function () {}
});