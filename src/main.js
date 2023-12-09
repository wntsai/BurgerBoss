/* Will Tsai
Burger Boss

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play, Ending ]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyN, keyM, keyLEFT, keyRIGHT, keySPACE;

//UI sizes set-up
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
