var config = {
    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};



var newZombiePlace = 0;
var iter = 0;
var counter = 0;
var zombies;
var zombie;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var enemyNeeded = 0;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('zombie', 'assets/zombie.png', { frameWidth: 70, frameHeight: 84 });
    this.load.spritesheet('boy', 'assets/boy.png', { frameWidth: 70, frameHeight: 116 });
    this.load.spritesheet('woman', 'assets/woman.png', { frameWidth: 70, frameHeight: 106 });
    this.load.spritesheet('attacker', 'assets/attacker.png', { frameWidth: 70, frameHeight: 70 });
    this.load.spritesheet('sewer', 'assets/sewer.png', { frameWidth: 70, frameHeight: 70 });
}

function create() {
    //  A simple background for our game
    background = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1920, 1080, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(960, 980, 'ground');

    //  Now let's create some ledges

    // The zombie and its settings

    zombies = this.physics.add.group();


    zombie = this.physics.add.sprite(300, 450, 'zombie');

    zombie.setScale(2);
    zombies.add(zombie);

    //  Our zombie animations, turning, walking left and walking right.

    createAnimation(this, 'right', 'zombie', 0, 9, 20);

    createAnimation(this, 'up', 'zombie', 4, 4, 20);

    createAnimation(this, 'boy', 'boy', 0, 6, 10);

    createAnimation(this, 'woman', 'woman', 0, 18, 30);

    createAnimation(this, 'attacker', 'attacker', 0, 4, 5);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '43px', fill: '#ffff' });

    //  Collide the zombie and the victims with the platforms
    this.physics.add.collider(zombie, platforms);

    //  Checks to see if the zombie overlaps with any of the victims, if he does call the collectStar function

    function createAnimation(game, animKey, animFrameSource, startFrame, endFrame, frameRate) {
        game.anims.create({
            key: animKey,
            frames: game.anims.generateFrameNumbers(animFrameSource, { start: startFrame, end: endFrame }),
            frameRate: frameRate,
            repeat: -1
        });
    }
}

function update() {

    if (gameOver) {
        return;
    }

    counter++;

    if (enemyNeeded == 5) {
        enemyNeeded = 0;
        addAttacker(this);
    }
    
    if (counter == 80) {
        counter = 0;

        switch (getRandomInt(3)) {
            case 0://boy
                addVictim(this, 'boy',1.1);
                break;

            case 1://woman
            addVictim(this, 'woman',1);
                break;

            case 2:
                addAttacker(this);
                break;
        }

    }


    background.tilePositionX = iter * 300;
    iter += 0.03;


    var speed = 650;
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




    function addAttacker(game) {
        var attacker = game.physics.add.sprite(2100, 850, 'attacker').setScale(2, 1.5);
        attacker.anims.play('attacker', true);
        game.physics.add.collider(attacker, platforms);
        attacker.setVelocityX(-800);
        game.physics.add.overlap(zombies, attacker, function () {
            var last = zombies.getLast(true);
            attacker.disableBody(true, true);
            last.disableBody(true, true);
            zombies.remove(last);
            newZombiePlace = newZombiePlace - 40;
            console.log(zombies.getLength());
            
            if (zombies.getLength()==0) {
                window.location.assign("game_over.html")
                
            }
        }, null, game);
        return attacker;
    }

    function addVictim(game, type,scale) {
        var victim = game.physics.add.sprite(2100, 880, type).setScale(scale);
        victim.anims.play(type, true);
        victim.setVelocityX(-500);
        game.physics.add.collider(victim, platforms);
        game.physics.add.overlap(zombie, victim, function () {
            collectVictims(zombie, victim, game)
        }, null, this);
        enemyNeeded++;
    }
}

function collectVictims(zombie, victim, game) {
    newZombiePlace = newZombiePlace + 40;

    victim.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    var newzombie = game.physics.add.sprite(300 - newZombiePlace, 880, 'zombie').setScale(2);
    newzombie.anims.play('right', true);
    game.physics.add.collider(newzombie, platforms);

    zombies.add(newzombie);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
