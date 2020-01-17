var txt;
var vx = 15;
var CharctersScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function CharctersScene() {
            Phaser.Scene.call(this, { key: 'characterscene' });
        },
    preload: function () {
        this.load.spritesheet('character1', 'assets/Character1.png', { frameWidth: 521, frameHeight: 573 });
        this.load.spritesheet('character2', 'assets/character2.png', { frameWidth: 521, frameHeight: 573 });
        this.load.image('back', 'assets/back.png');
        this.load.image('ground', 'assets/platform.png');
    },
    create: function () {
        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        character1 = this.physics.add.sprite(1200, 690, 'character1');
        character2 = this.physics.add.sprite(800, 690, 'character2');
        character1.setInteractive();
        character1.name = "character1";
        character2.setInteractive();
        character2.name = "character2";
        character1.setScale(1);
        character2.setScale(1);
        createAnimation(this, 'walk', 'character1', 0, 10, 18);
        createAnimation(this, 'walk2', 'character2', 0, 10, 18);
        character1.anims.play('walk', true);
        character2.anims.play('walk2', true);
        platforms = this.physics.add.staticGroup();
        platforms.create(960, 980, 'ground');
        this.physics.add.collider(character1, platforms);
        this.physics.add.collider(character2, platforms);
        var txt = this.make.text({
            x: 1000,
            y: 300,
            text: 'Choose Your Character!',
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

        character1.on('pointerdown', function () {
            console.log(this.name);
            var id = this.name;
            game.scene.start('gameScene');
            return id;
        })
        character2.on('pointerdown', function () {
            console.log(this.name);
            var id = this.name;
            game.scene.start('gameScene');
            return id;

        })
    },
    update: function () {
            txt.x += vx;
            if (txt.x > 2500)
            {
                txt.x=0;
                txt.y=300;
            }
    }
});