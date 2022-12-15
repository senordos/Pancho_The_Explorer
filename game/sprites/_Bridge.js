function _Bridge()
{

    _Sprite.call(this);

    this.name = "_Bridge";
    this.animMaxFrame = 1;

    this.deadly = false;

    this.playerOnBridge = false;
    this.fallWaitStartTime = 0;
    this.falling = false;
    this.waitingToFall = false;

    this.animXOffset = 0;
    this.animYOffset = 896;


}

_Bridge.prototype = Object.create(_Sprite.prototype);

_Bridge.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);

};


_Bridge.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    if(this.playerOnBridge)
    {
        if (this.falling)
        {
            //enemies fall due to gravity
            this.ySpeed = this.ySpeed + GRAVITY;

            if (this.ySpeed > 5) {this.ySpeed = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED
            this.targetY = this.y + this.ySpeed;
        }
        else
        {
            var date = new Date();
            if ( ! this.waitingToFall)
            {
                this.fallWaitStartTime = date.getTime();
                this.waitingToFall = true;
            }
            else
            {
                //Waiting to fall - set wait time in milliseconds
                if ((date.getTime() - this.fallWaitStartTime) > 500)
                {
                    this.falling = true;
                }
            }
        }
    }
}

_Bridge.prototype.getCollisionEvent = function(player)
{
  if (this.checkPlayerCollision(player))
  {
    // Player has hit a bridge
    if (intersectRect(player.getBottomCollisionRect(), this.getTopCollisionRect()))
    {
      //Start the bridge falling
      this.playerOnBridge = true;
      this.yDirection = 1;
      this.ySpeed = 1;

      player.yDirection = 1;
      player.ySpeed = 1;
      player.targetY = this.y - player.rectOffset.bottom -1;
      player.collisionBottom = true;
    }
    else if (intersectRect(player.getTopCollisionRect(), this.getBottomCollisionRect()))
    {
      player.yDirection = 0;
      player.ySpeed = 0;
      player.targetY = this.y + this.rectOffset.bottom - player.rectOffset.top;
      player.collisionTop = true;
    }
    else if (intersectRect(player.getLeftCollisionRect(), this.getRightCollisionRect()))
    {
      //Player has hit bridge from right
      player.xDirection = 0;
      player.targetX = this.x + player.collisionWidth;
      player.collisionLeft = true;

    }
    else if (intersectRect(player.getRightCollisionRect(), this.getLeftCollisionRect()))
    {
      //Player has hit bridge from left
      player.xDirection = 0;
      player.targetX = this.x - player.collisionWidth;
      player.collisionRight = true;
    }

    var colevt = new CollisionEvent();
    colevt.name = this.name;
    colevt.collision = true;
    colevt.enemyHit = false;
    colevt.playerHit = false;

    return colevt;
  }
  return false;
}
