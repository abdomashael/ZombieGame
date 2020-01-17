var HowToPlayScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function HowToPlayScene() {
            Phaser.Scene.call(this, { key: 'HowToPlayScene' });
        },
    preload: function () {
        this.load.image('back', 'assets/backhowtoplay.jpg');
        this.load.image('up', 'assets/UP.png');
        this.load.image('space', 'assets/Space.png');
        this.load.image('sewer1', 'assets/sewer1.png');
        this.load.image('Attacker', 'assets/Attackericon.png');
        this.load.image('Attacker', 'assets/Attackericon.png');
    },
    create: function () {
        background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        console.log(txt);
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
     },
    update: function () {}
});