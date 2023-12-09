class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load audio
        this.load.audio('select', './assets/select.wav');
        this.load.audio('obstaclespawn', './assets/obstaclespawn.mp3');
        this.load.audio('backmusic', './assets/backmusic.mp3');
        this.load.audio('boom', './assets/boom.mp3');
        this.load.audio('jump', './assets/jump.mp3');
        this.load.audio('obtain', './assets/obtain.mp3');
        this.load.audio('wah', './assets/wah.mp3');
    }

    create(){
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#666699',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
    }

    //show menu text
    this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'BurgerBoss', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 2, game.config.height / 2, 'Use Arrow Keys and Space Bar', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#000';
    menuConfig.color = '#054784';
    this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press N for Easy or M for Hard', menuConfig).setOrigin(0.5);
    
    //define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);//Left Movement
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);//Right Movement
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);//Jump
    keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);//Easy Mode
    keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);//Hard Mode
}

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                enemySpeed: 2,
                gameTimer: 60000
            }
            this.sound.play('select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                enemySpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('select');
            this.scene.start('playScene');
        }
}

}