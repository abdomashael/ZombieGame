var RegMenu = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, { key: 'RegMenu' });
        },
    preload: function () {

        this.load.html('nameform', 'assets/html/nameform.html');

        this.load.image('back', 'assets/back.png');

    },
    create: function () {
       // this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');

        var text = this.add.text(900, 540, 'Please enter your name', { color: 'white', fontSize: '20px ' });

        var element = this.add.dom(960, 540).createFromCache('nameform');

        console.log(element);
        
        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'playButton') {
                var inputText = this.getChildByName('nameField');

                //  Have they entered anything?
                if (inputText.value !== '') {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    //  Populate the text with whatever they typed in
                    text.setText('Welcome ' + inputText.value);
                }
                // else {
                //     //  Flash the prompt
                //     this.scene.tweens.add({
                //         targets: text,
                //         alpha: 0.2,
                //         duration: 250,
                //         ease: 'Power3',
                //         yoyo: true
                //     });
                // }
            }

        });

        // this.tweens.add({
        //     targets: element,
        //     y: 540,
        //     duration: 3000,
        //     ease: 'Power3'
        // });

    }
});

