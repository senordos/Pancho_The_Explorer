function Enemy3()
{

    _Sprite.call(this);

    this.name = "Enemy3";

    this.xSpeed = 2;
    this.ySpeed = 2;

    this.image_src = "tiles/spritesheet_enemy3.png";
    this.animXOffset = 0;
    this.animYOffset = 384;

}

Enemy3.prototype = Object.create(_Sprite.prototype);

Enemy3.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);

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
    _Sprite.prototype.setMoveTargetX.call(this);
    this.targetX = this.x + this.xDirection * this.xSpeed;  //this should be linked to frame rate or something
}

Enemy3.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    this.targetY = this.y + this.yDirection * this.ySpeed;  //this should be linked to frame rate or something

}



Enemy3.prototype.updateMoveAttributesX = function (map, player)
{

    _Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if (this.localBricks.xLinedUp == true)
    {
        if (map[this.localBricks.down].isBackground == true
         && this.xDirection == 1
         && this.rotation == 0)
        {
            this.xDirection = 0;
            this.yDirection = 1;
            this.rotation = 90;
        }
        if (map[this.localBricks.down].isBackground == true
         && this.xDirection == -1
         && this.rotation == 0)
        {
            this.xDirection = 0;
            this.yDirection = 1;
            this.rotation = 270;

        }
        if (map[this.localBricks.up].isBackground == true
         && this.xDirection == -1
         && this.rotation == 180)
        {
            this.xDirection = 0;
            this.yDirection = -1;
            this.rotation = 270;
        }
        if (map[this.localBricks.up].isBackground == true
         && this.xDirection == 1
         && this.rotation == 180 )
        {
            this.xDirection = 0;
            this.yDirection = -1;
            this.rotation = 90;
        }
    }
}




Enemy3.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map, player);

    if ( this.localBricks.yLinedUp == true )
    {
        if (bricks[this.localBricks.left].isBackground == true && this.yDirection == 1 && this.rotation == 90)
        {
                this.yDirection = 0;
                this.xDirection = -1;
                this.rotation = 180;

        }
        if (bricks[this.localBricks.left].isBackground == true && this.yDirection == -1 && this.rotation == 90)
        {
                this.yDirection = 0;
                this.xDirection = -1;
                this.rotation = 0;

        }
        if (bricks[this.localBricks.right].isBackground == true && this.yDirection == 1 && this.rotation == 270)
        {
                this.yDirection = 0;
                this.xDirection = 1;
                this.rotation = 180;

        }
        if (bricks[this.localBricks.right].isBackground == true && this.yDirection == -1 && this.rotation == 270)
        {
                this.yDirection = 0;
                this.xDirection = 1;
                this.rotation = 0;

        }
    }
}

Enemy3.prototype.getCollisionStats = function(player)
{
    if (this.checkPlayerCollision(player))
    {
      var colevt = new CollisionEvent();
      colevt.name = this.name;
      colevt.collision = true;
      colevt.enemyHit = false;
      colevt.playerHit = true;

      return colevt;
    }
    return false;
}
