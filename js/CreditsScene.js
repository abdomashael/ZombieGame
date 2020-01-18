var txt;
var vy=15;
var CreditsScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function CreditsScene() {
            Phaser.Scene.call(this, { key: 'creditsScene' });
        },
        preload: function(){
            //load the menuebutton to the scene
            this.load.image('back', 'assets/backHowToPlay.png');
            this.load.spritesheet('menubtn', 'assets/menuBtn.png', { frameWidth: 400, frameHeight: 92 });
        },
        create: function(){
            //add images
            background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
            var menubtn = this.add.sprite(200, 900, 'menubtn').setInteractive();

            //create animation
            createAnimation(this, "menubtnchange", "menubtn", 1, 0, 4);


            //addtitle
            txt = this.make.text({
                x: 1000,
                y: 300,
                text: 'Credits Scene',
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


            //add names
            Text1 = this.add.text(1000, 0, 'This Game Was Brought To By:', { fontSize: '45px', fill: '#ffff', fontFamily: 'Courier', fontStyle: 'bold italic' });
            Text2 = this.add.text(1000, 100, 'Abd ElRahman Mashaal', { fontSize: '45px', fill: '#ffd800', fontFamily: 'Courier', fontStyle: 'bold italic' });
            Text3 = this.add.text(1000, 200, 'Omar Akram', { fontSize: '45px', fill: '#ffd800', fontFamily: 'Courier', fontStyle: 'bold italic' });
            Text4 = this.add.text(1000, 300, 'Menna Abdallah', { fontSize: '45px', fill: '#ffd800', fontFamily: 'Courier', fontStyle: 'bold italic' });
            Text5 = this.add.text(1000, 400, 'Samar Ali Abd ElFatah', { fontSize: '45px', fill: '#ffd800', fontFamily: 'Courier', fontStyle: 'bold italic' });

             

            //Add Action To The Button

            menubtn.on('pointerover', function () {
                menubtn.anims.play('menubtnchange', true);
            }),
           
            menubtn.on('pointerout', function () {
                menubtn.anims.stop('menubtnchange', true);
                menubtn.setFrame(0);
            }),


            menubtn.on('pointerdown', function () {
                console.log("heloo");
                game.scene.start('mainmenu');
            });
        },
        update: function(){
            //add animation to names
            Text1.y += vy;
            Text2.y += vy;
            Text3.y += vy;
            Text4.y += vy;
            Text5.y += vy;
            if (txt.y > 2000) {
                Text1.y = 0;
                Text2.y = 0;
                Text3.y = 0;
                Text4.y = 0;
                Text5.y = 0;
            }
        }

    })