function _SlidingPlatform()
{

    _Sprite.call(this);

    this.name = "_SlidingPlatform";

    this.xSpeed = 4;
    this.ySpeed = 0;
    this.xDirection = 1;
    this.yDirection = 0;

    this.animXOffset = 128;
    this.animYOffset = 640;
    this.animMaxFrame = 1;

}

_SlidingPlatform.prototype = Object.create(_Sprite.prototype);


_SlidingPlatform.prototype.setMoveTargetX = function()
{
    _Sprite.prototype.setMoveTargetX.call(this);

    this.targetX = this.x + (this.xSpeed * this.xDirection);
}


_SlidingPlatform.prototype.updateMoveAttributesX = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesX.call(this, map, player);
    if (this.collisionRight == true || this.collisionLeft == true)
    {
        this.xDirection = this.xDirection * -1;
    }
}

_SlidingPlatform.prototype.getCollisionEvent = function(player)
{
  if (this.checkPlayerCollision(player))
  {
    var colevt = new CollisionEvent();
    colevt.name = this.name;
    colevt.collision = true;

    // Player has hit a block - going left or right
    if (intersectRect(player.getBottomCollisionRect(), this.getTopCollisionRect()))
    {
      colevt.playerHit = false;

      player.yDirection = this.yDirection;
      player.ySpeed = this.ySpeed;
      player.targetY = this.y - player.rectOffset.bottom -1;

      player.groundSpeed = (this.xSpeed * this.xDirection);
      player.collisionBottom = true;
    }
    else if (intersectRect(player.getTopCollisionRect(), this.getBottomCollisionRect()))
    {
      colevt.playerHit = false;

      player.yDirection = 0;
      player.ySpeed = 0;
      player.targetY = this.y + this.rectOffset.bottom - player.rectOffset.top;
      player.collisionTop = true;
    }
    else if (intersectRect(player.getLeftCollisionRect(), this.getRightCollisionRect()))
    {
      //Player has hit platform from right
      colevt.playerHit = false;

      player.xDirection = 0;
      player.targetX = this.x + player.collisionWidth;
      player.collisionLeft = true;

    }
    else if (intersectRect(player.getRightCollisionRect(), this.getLeftCollisionRect()))
    {
      //Player has hit platform from left
      colevt.playerHit = false;

      player.xDirection = 0;
      player.targetX = this.x - player.collisionWidth;
      player.collisionRight = true;
    }

    return colevt;
  }
  return false;
}
