function Enemy2()
{

    Sprite.call(this);

    this.name = "Enemy2";

    this.image_src = "tiles/spritesheet_enemy2.png";

    this.xSpeed = 3;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};


}

Enemy2.prototype = Object.create(Sprite.prototype);

Enemy2.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};

Enemy2.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);

    this.targetX = this.x + ((this.xDirection) * this.xSpeed); //This is currently tied to the framerate

}

Enemy2.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = this.y + this.yDirection;
}

Enemy2.prototype.updateMoveAttributesX = function (map)
{

   Sprite.prototype.updateMoveAttributesX.call(this, map);

    if ( this.collision == true )
    {
        this.xDirection = this.xDirection * -1;
    }

    if (this.hit == false)
    {
       if ( (   this.collisionBottom == true &&
                this.xDirection < 0 &&
                bricks[this.localBricks.leftUp].tileName == "none" &&
                bricks[this.localBricks.left].tileName != "none"
            )
            ||
            (   this.collisionBottom == true &&
                this.xDirection > 0 &&
                bricks[this.localBricks.rightUp].tileName == "none" &&
                bricks[this.localBricks.right].tileName != "none"
            )
          )
       {
           this.yDirection = this.yDirection = -30;
       }
    }
}

Enemy2.prototype.updateMoveAttributesY = function (map)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}
