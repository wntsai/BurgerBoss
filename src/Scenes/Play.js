class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //load images & tile sprites
        this.load.image('background', './assets/background.png');
        this.load.image('lettuce', './assets/lettuce.png');
        this.load.image('topbun', './assets/topbun.png');
        this.load.image('botbun', './assets/botbun.png');
        this.load.image('drumleft', './assets/drumleft.png');
        this.load.image('drumright', './assets/drumright.png');
        this.load.image('mustleft', './assets/mustleft.png');
        this.load.image('mustright', './assets/mustright.png');
        this.load.image('chefleft', './assets/chefleft.png');
        this.load.image('chefright', './assets/chefright.png');
        this.load.audio('wah', './assets/wah.wav');
        /*spritesheets?
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        */
    }

    create(){
        this.add.text(20,20, "BurgerBoss");

        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFFFFF).setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        /*
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        //add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);
        Implement Additions of Items, Enemies, and Player Sprite*/
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
    

        //initialize score
        this.p1Score = 0;
        
        //**initalize audio**
        this.sound.play('backmusic');
        

        //display score
        let scoreConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#666699',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //declares Score box
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        //GAME OVER FLAG
        this.gameOver = false;
        //60s Play Clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            //this.sound.pause('background');
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            //this.sound.pause('background');
            this.starfield.tilePositionX = 0;
        }, null, this);
    }

    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            //this.sound.pause('background');
          }

        this.starfield.tilePositionX -=4;

        //GAME OVER CONDITIONAL
        if(!this.gameOver){
            this.p1Rocket.update(); //updates rocket sprite
            this.ship01.update();   //updates spaceship 3x
            this.ship02.update();
            this.ship03.update();
        }

        //colllision checker
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        

    }
    checkCollision(rocket, ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true; 
        } else{
            return false;
        }
    }

    //Function to Randomize Number Selection from 1-4
    /*intrandomer(x) {
        return Math.floor(Math.random() * 5);
    }*/
    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');     //play explode animation
        boom.on('animationcomplete', () => {        //callback after anim completes
            ship.reset();       //reset ship pos
            ship.alpha = 1;     // make ship visible again
            boom.destroy();     //remove explosion sprite
        });
        //score add and repaint    
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        

        //this.sound.play('sfx_explosion');
        //Function to Play Sound Effect Based on Random Number Generator
        //Conditional statements utilizes too much memory and freezes game?
        //Sound Effects were custom made by me tho :p
        /*testint = intrandomer(x);
        if (testint = 1){
            this.sound.play('boom');
        } else if (testint = 2){
            this.sound.play('err');
        }else if (testint = 3){
            this.sound.play('pew');
        }else{
            this.sound.play('waw');
        }*/
        
    }
}