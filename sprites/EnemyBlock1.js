function EnemyBlock1()
{

    Sprite.call(this);

    this.name = "EnemyBlock1";

    this.xSpeed = 0;
    this.ySpeed = 2;


    this.lastDrop = gameLoopStart;


    this.image_src = "tiles/spritesheet_Enemies_64.png";

    this.animXOffset = 0;
    this.animYOffset = 640;
    this.animMaxFrame = 1;


}

EnemyBlock1.prototype = Object.create(Sprite.prototype);

EnemyBlock1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

    /* If properties are needed, put them here. These are left over from Enemy3
    if ( level_sprite_data.properties !== undefined &&
         level_sprite_data.properties.startXDirection !== undefined &&
         level_sprite_data.properties.startYDirection !== undefined &&
         level_sprite_data.properties.rotation !== undefined )
    {

        this.xDirection = level_sprite_data.properties.startXDirection;
        this.yDirection = level_sprite_data.properties.startYDirection;
        this.rotation = level_sprite_data.properties.rotation;

    }
    else
    {
        //X and Y direction will be defaults.
        console.log("Enemy[] - EnemyBlock1 - properties undefined for startXDirection / startYDirection / rotation")
    }
    */

};

EnemyBlock1.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);
    this.targetX = this.x + this.xDirection * this.xSpeed;  //this should be linked to frame rate or something
}

EnemyBlock1.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity

    if (this.yDirection > 0)
    {
      this.yDirection = this.yDirection + GRAVITY + GRAVITY;
    }
    if (this.yDirection > 10) {this.yDirection = 10;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED


    this.targetY = this.y + this.yDirection;
}



EnemyBlock1.prototype.updateMoveAttributesX = function (map)
{

    Sprite.prototype.updateMoveAttributesX.call(this, map);

}




EnemyBlock1.prototype.updateMoveAttributesY = function (map)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collisionBottom == true)
    {
        this.yDirection = -1;
        this.ySpeed = 2;
    }
    if (this.collisionTop == true)
    {
        this.yDirection = 1;
    }
}
