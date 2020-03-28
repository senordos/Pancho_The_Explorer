function Enemy2()
{

    _Sprite.call(this);

    this.name = "Enemy2";
    this.active = false;
    this.stompable = true;

    this.animXOffset = 0;
    this.animYOffset = 256;

    this.xSpeed = 2;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};


}

Enemy2.prototype = Object.create(_Sprite.prototype);

Enemy2.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);

};

Enemy2.prototype.setMoveTargetX = function()
{
    _Sprite.prototype.setMoveTargetX.call(this);

    if (this.active == true)
    {
      this.targetX = this.x + ((this.xDirection) * this.xSpeed); //This is currently tied to the framerate
    }
}

Enemy2.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = Math.floor(this.y + this.yDirection);
}

Enemy2.prototype.updateMoveAttributesX = function (map, player)
{

   _Sprite.prototype.updateMoveAttributesX.call(this, map, player);

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
           this.yDirection = this.yDirection = -34;
       }
    }


    if (this.active != true)
    {
      if ( this.activateIfPlayerXGT !== undefined )
      {
          if ( this.activateIfPlayerXGT > 0 && player.x > this.activateIfPlayerXGT )
          {
              this.active = true;
          }
          else if ( this.activateIfPlayerXGT == 0 )
          {
              this.active = true;
          }
      }
      else
      {
          this.active = true;
      }
    }


}

Enemy2.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map, player);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

Enemy2.prototype.updateAttributesAfterStomped = function(map, player)
{
  _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

  this.hit = true;
  this.deadly = false;

  this.xSpeed = 3;
  this.xDirection = this.xDirection * -1;

}
