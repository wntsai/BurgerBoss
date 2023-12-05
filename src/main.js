/* Will Tsai
Rocket Patrol Rethought
5 hours Planning, Editing, Finalizing

Modifications:
1 pt:
- Added Background Audio into Assets (Cred Youtube @jayu. Obtained full usage permission with his consent.)
3 pt:
- New Title Screen (Cred W3 Schools)
- Created 4 New Explosion Sounds, Implemented Logic for them, but It Freezes the game?? Comments left in Play.js

Stopped before I broke anything else.
Previous Repo to view commits before I messed up my Repo somehow ??????
https://github.com/wntsai/ModdedRocketPatrol
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play ]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

//UI sizes set-up
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
