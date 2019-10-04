function Enemy3()
{

    Sprite.call(this);

    this.name = "Enemy3";

    this.xSpeed = 2;
    this.ySpeed = 2;

    this.image_src = "tiles/spritesheet_enemy3.png";
    this.animXOffset = 0;
    this.animYOffset = 384;

}

Enemy3.prototype = Object.create(Sprite.prototype);

Enemy3.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

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
        console.log("Enemy[] - Enemy3 - properties undefined for startXDirection / startYDirection / rotation")
    }

};

Enemy3.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);
    this.targetX = this.x + this.xDirection * this.xSpeed;  //this should be linked to frame rate or something
}

Enemy3.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    this.targetY = this.y + this.yDirection * this.ySpeed;  //this should be linked to frame rate or something

}



Enemy3.prototype.updateMoveAttributesX = function (map, player)
{

    Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if (this.localBricks.xLinedUp == true)
    {
        if (map[this.localBricks.down].type == 0 && this.xDirection == 1 && this.rotation == 0)
        {
            this.xDirection = 0;
            this.yDirection = 1;
            this.rotation = 90;
        }
        if (map[this.localBricks.down].type == 0 && this.xDirection == -1 && this.rotation == 0)
        {
            this.xDirection = 0;
            this.yDirection = 1;
            this.rotation = 270;

        }
        if (map[this.localBricks.up].type == 0 && this.xDirection == -1  && this.rotation == 180)
        {
            this.xDirection = 0;
            this.yDirection = -1;
            this.rotation = 270;
        }
        if (map[this.localBricks.up].type == 0 && this.xDirection == 1  && this.rotation == 180 )
        {
            this.xDirection = 0;
            this.yDirection = -1;
            this.rotation = 90;
        }
    }
}




Enemy3.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map, player);

    if ( this.localBricks.yLinedUp == true )
    {
        if (bricks[this.localBricks.left].type == 0 && this.yDirection == 1 && this.rotation == 90)
        {
                this.yDirection = 0;
                this.xDirection = -1;
                this.rotation = 180;

        }
        if (bricks[this.localBricks.left].type == 0 && this.yDirection == -1 && this.rotation == 90)
        {
                this.yDirection = 0;
                this.xDirection = -1;
                this.rotation = 0;

        }
        if (bricks[this.localBricks.right].type == 0 && this.yDirection == 1 && this.rotation == 270)
        {
                this.yDirection = 0;
                this.xDirection = 1;
                this.rotation = 180;

        }
        if (bricks[this.localBricks.right].type == 0 && this.yDirection == -1 && this.rotation == 270)
        {
                this.yDirection = 0;
                this.xDirection = 1;
                this.rotation = 0;

        }

    }
}
