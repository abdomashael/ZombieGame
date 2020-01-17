var HowToPlayScene = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:
        function HowToPlayScene() {
            Phaser.Scene.call(this, { key: 'HowToPlayScene' });
        },
    preload: function () {
        this.load.image('back', 'assets/UP.png');
        this.load.image('up', 'assets/UP.png');
        this.load.image('space', 'assets/Space.png');
        this.load.image('sewer1', 'assets/sewer1.png');
        this.load.image('Attacker', 'assets/Attackericon.png');
        this.load.image('Attacker', 'assets/Attackericon.png');
    },
    create: function () {
        txt = this.make.text({
            x: 1500,
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