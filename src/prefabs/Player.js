//Player
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
    }

    /*update(){ //Implement Player Update mechanic and changing of sprite skin based upon LArrowKey or RArrowKey Pressed
        //move Player left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }*/

    reset(){
        this.x = game.config.width;
    }
}