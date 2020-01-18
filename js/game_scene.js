var newZombiePlace ;
var iter ;
var counter ;
var zombies;
var zombie;
var platforms;
var cursors;
var score ;
var gameOver = false;
var scoreText;
var zombieCountText;
var zombieCount;
var ESC;
var GameScene = new Phaser.Class({

    
    Extends: Phaser.Scene,

    initialize:

        function GameScene() {
            Phaser.Scene.call(this, { key: 'gameScene' });
            
        },
    preload: function () {

        var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', function () {

        progress.destroy();

    });
        this.load.audio('backgMusic', 'assets/F-777-Deadlocked.mp3');
        this.load.audio('biteSound', 'assets/ZombieBite.mp3');
        this.load.audio('deadSound', 'assets/ZombieDying.mp3');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('face', 'assets/face.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('zombie', 'assets/zombie.png', { frameWidth: 150, frameHeight: 181 });
        this.load.spritesheet('zombieGirl', 'assets/zombieGirl.png', { frameWidth: 150, frameHeight: 165 });
        this.load.spritesheet('boy', 'assets/boy.png', { frameWidth: 70, frameHeight: 116 });
        this.load.spritesheet('woman', 'assets/woman.png', { frameWidth: 70, frameHeight: 106 });
        this.load.spritesheet('attacker', 'assets/attacker.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('dead', 'assets/dead.png', { frameWidth: 75, frameHeight: 61 });
        this.load.spritesheet('sewer', 'assets/sewer.png',{frameWidth:70, frameHeight:60});
        

    }
    ,

    create: function () {
     newZombiePlace = 0;
     iter = 0;
     counter = 0;
     score = 0;
     zombieCount=0;
        //Background Music
        this.sound.add('backgMusic');

        // Music Configurations
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        //Lets MAke Some Noise
        this.sound.play("backgMusic",musicConfig);

        // Adding Zombie Sounds
        this.sound.add('biteSound');
        this.sound.add('deadSound');

        //  A simple background for our game
        background = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1920, 1080, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(980, 1000, 'ground');

        this.add.image(960,50,'face');


        // The zombie and its settings

        zombies = this.physics.add.group();
        //zombie = this.physics.add.sprite(400, 450, 'zombieGirl');
        zombie = this.physics.add.sprite(400, 450, 'zombie');
        zombieCount++;
        //  Collide the zombie and the victims with the platforms
        this.physics.add.collider(zombie, platforms);
        zombie.setScale(1);
        zombies.add(zombie);

        //  Our zombie animations, turning, walking left and walking right.

        createAnimation(this, 'right', 'zombie', 0, 9, 20);

        createAnimation(this, 'up', 'zombie', 4, 4, 20);

        createAnimation(this, 'dead', 'dead', 0, 11, 20);

        createAnimation(this, 'boy', 'boy', 0, 6, 10);

        createAnimation(this, 'woman', 'woman', 0, 18, 30);

        createAnimation(this, 'attacker', 'attacker', 0, 4, 5);

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '43px', fill: '#ffff' });
        zombieCountText = this.add.text(1020, 50, zombieCount, { fontSize: '43px', fill: '#ffff' });
        
        //  Checks to see if the zombie overlaps with any of the victims, if he does call the collectStar function
        ESC = this.input.keyboard.addKey('ESC');

        


    }
    ,
    update: function () {

        background.tilePositionX = iter * 300;
        iter += 0.03;

        counter++;

        if (counter == 95) {
            counter = 0;
      // Max is our algorithm for randomising the enemy and victims
            switch (getRandomInt(6)) {
                case 0://boy
                    addVictim(this, 'boy', 1.1,1.1);
                    break;

                case 1://woman
                    addVictim(this, 'woman', 1.8,1.4);
                    break;

                case 2:
                case 3:
                    addAttacker(this,'attacker',2,1.5);
                    break;

                case 4:
                case 5:
                    addSewer(this,2,1);
                    break;
            }

        }


       

        var speed = 700;
        zombies.children.iterate(function (child) {
            if ((cursors.up.isDown || cursors.space.isDown) && child.body.touching.down) {
                child.setVelocityY(-speed);
            }

            if (child.body.touching.down) {
                child.anims.play('right', true);
            } else {
                child.anims.play('up', true);

            }

            speed = speed - 5;


        }
        );



        function addSewer(game,scaleX,scaleY) {
            var sewer = game.physics.add.sprite(2100, 850, 'sewer').setScale(scaleX,scaleY);
            sewer.setVelocityX(-400);
            sewer.name = 'sewer';
            game.physics.add.collider(sewer, platforms);

            zombies.children.iterate(function (childZombie) {
                game.physics.add.overlap(childZombie,sewer,function () {
                    attackerOverlap(childZombie,sewer,game,500)
                },null,game);
            });
        }

        function addAttacker(game,attackerSrc,scaleX,scaleY) {
            var attacker = game.physics.add.sprite(2100, 850, attackerSrc).setScale(scaleX,scaleY);
            attacker.anims.play('attacker', true);
            game.physics.add.collider(attacker, platforms);
            attacker.setVelocityX(-700);
            zombies.children.iterate(function (childZombie) {
                
                game.physics.add.overlap(childZombie,attacker,function () {
                    attackerOverlap(childZombie,attacker,game,2000)
                },null,game);
            });
        }

        function attackerOverlap(childZombie,attacker,game,time) {
            var deadZombie = game.physics.add.sprite(childZombie.x,childZombie.y, 'dead').setScale(3);
            deadZombie.anims.play('dead', true);
            game.sound.play('deadSound');
            setTimeout(function () {
                game.sound.removeByKey('deadSound');
            },2000);
            
            zombieCountText.setText(--zombieCount);
            
            newZombiePlace = childZombie.x;
            
            if(attacker.name != 'sewer'){
                attacker.disableBody(true, true);
            }

            zombies.remove(childZombie);
            var length = zombies.getLength();
            childZombie.disableBody(true, true);

            
            setTimeout(function () {
                deadZombie.disableBody(true, true);


            },time);

            if (length == 0) {
                game.sound.removeByKey("backgMusic");
                game.scene.start('gameOverScene');
            }


           
        }
        

        function addVictim(game, type, scaleX,scaleY) {
            var victim = game.physics.add.sprite(2100, 850, type).setScale(scaleX,scaleY);
            victim.anims.play(type, true);
            victim.setVelocityX(-400);
            game.physics.add.collider(victim, platforms);

            zombies.children.iterate(function (childZombie) {
                game.physics.add.overlap(childZombie, victim, function () {
                    collectVictims(childZombie, victim, game)
                }, null, this);
            });
           
        }

       if(ESC.isDown){
             console.log("paused");
                game.scene.start('pauseScene');
                game.scene.pause('gameScene');
            };
          
    }



});

function collectVictims(zombie, victim, game) {

    game.sound.play('biteSound');
    setTimeout(function () {
        game.sound.removeByKey('biteSound');
    },3500);
    if(newZombiePlace>160){
        newZombiePlace=0;
    }
    newZombiePlace = newZombiePlace + 40;

    victim.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    addZombie();

    function addZombie() {
        ++zombieCount;
        zombieCountText.setText(zombieCount);
        var newzombie = game.physics.add.sprite(400 - newZombiePlace, 880, 'zombie');
        newzombie.anims.play('right', true);
        game.physics.add.collider(newzombie, platforms);
        zombies.add(newzombie);
    }
}
