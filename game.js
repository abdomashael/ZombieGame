var config = {
    type: Phaser.AUTO,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
var victims;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('zombie', 'assets/zombie.png', { frameWidth: 70, frameHeight: 84 });
    this.load.spritesheet('boy', 'assets/boy.png', { frameWidth: 70, frameHeight: 116 });
    this.load.spritesheet('woman', 'assets/woman.png', { frameWidth: 70, frameHeight: 106 });
}

function create() {
    //  A simple background for our game
    image0 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 1920, 1080, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(960, 980, 'ground');

    //  Now let's create some ledges
    //platforms.create(600, 400, 'ground');
    //platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    // The zombie and its settings

    zombies = this.physics.add.group();

    zombie = this.physics.add.sprite(300, 450, 'zombie').setScale(2);

    //  zombie physics properties. Give the little guy a slight bounce.
    //zombie.setBounce(0.2);
    //zombie.setCollideWorldBounds(true);

    //  Our zombie animations, turning, walking left and walking right.

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('zombie', { start: 4, end: 4 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'boy',
        frames: this.anims.generateFrameNumbers('boy', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'woman',
        frames: this.anims.generateFrameNumbers('woman', { start: 0, end: 18 }),
        frameRate: 30,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    /*    //  Some victims to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
       victims = this.physics.add.group({
           key: 'star',
           repeat: 11,
           setXY: { x: 12, y: 0, stepX: 70 }
       });

       victims.children.iterate(function (child) {

           //  Give each star a slightly different bounce
           child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

       });

       bombs = this.physics.add.group();
*/
    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '43px', fill: '#000' });

    //  Collide the zombie and the victims with the platforms
    this.physics.add.collider(zombie, platforms);
    // this.physics.add.collider(victims, platforms);
    // this.physics.add.collider(bombs, platforms);

    //  Checks to see if the zombie overlaps with any of the victims, if he does call the collectStar function
    // this.physics.add.overlap(zombie, victims, collectStar, null, this);

    //this.physics.add.collider(zombie, bombs, hitBomb, null, this);


}

function update() {

    if (gameOver) {
        return;
    }

    counter++;
    // console.log(counter);

    if (counter == 200) {
        counter = 0;
        /* victims = this.physics.add.sprite(2100, 880, 'boy').setScale(1.1);
        victims.anims.play('boy', true);
         */
        victims = this.physics.add.sprite(2100, 850, 'woman').setScale(2, 1.5);
        victims.anims.play('woman', true);

        victims.setVelocityX(-400);
        this.physics.add.collider(victims, platforms);
        this.physics.add.overlap(zombie, victims, collectVictims, null, this);
    }


    image0.tilePositionX = iter * 300;
    iter += 0.03;


    if ((cursors.up.isDown || cursors.space.isDown) && zombie.body.touching.down) {
        zombie.setVelocityY(-400);
    }

    if (zombie.body.touching.down) {
        zombie.anims.play('right', true);
    } else {
        zombie.anims.play('up', true);

    }


}

function collectVictims(zombie, victim) {
    newZombiePlace = newZombiePlace + 40;

    victim.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    var newzombie = this.physics.add.sprite(300 - newZombiePlace, 880, 'zombie').setScale(2);
    newzombie.anims.play('right', true);
    this.physics.add.collider(newzombie, platforms);


    /* if (victims.countActive(true) === 0) {
        //  A new batch of victims to collect
        victims.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (zombie.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    } */
}

function hitBomb(zombie, bomb) {
    this.physics.pause();

    zombie.setTint(0xff0000);

    zombie.anims.play('turn');

    gameOver = true;
}