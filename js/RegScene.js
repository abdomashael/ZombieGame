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
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back');
        
        var text = this.add.text(300, 10, 'Please enter your name', { color: 'white', fontSize: '20px '});

        var element = this.add.dom(400, 0).createFromCache('nameform');
    
        element.addListener('click');
    
        element.on('click', function (event) {
    
            if (event.target.name === 'playButton')
            {
                var inputText = this.getChildByName('nameField');
    
                //  Have they entered anything?
                if (inputText.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');
    
                    //  Hide the login element
                    this.setVisible(false);
    
                    //  Populate the text with whatever they typed in
                    text.setText('Welcome ' + inputText.value);
                }
            }
        });
    
    },
    update: function () {
       
    }
});

