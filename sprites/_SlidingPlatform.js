function _SlidingPlatform()
{

    _Sprite.call(this);

    this.name = "_SlidingPlatform";

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xDirection = 0;
    this.yDirection = 0;

    this.animXOffset = 0;
    this.animYOffset = 640;
    this.animMaxFrame = 1;

}

_SlidingPlatform.prototype = Object.create(_Sprite.prototype);


_SlidingPlatform.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    if (this.yDirection > 0)
    {
      this.ySpeed = this.ySpeed + GRAVITY;
    }
    if (this.ySpeed > 10) {this.ySpeed = 10;}


    this.targetY = this.y + (this.ySpeed * this.yDirection);
}


_SlidingPlatform.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map, player);
    if (this.collisionBottom == true)
    {
        this.yDirection = -1;
        this.ySpeed = 2;
    }
    else if (this.y < this.startYPosition)
    {
        this.y = this.startYPosition;
        this.yDirection = 0;
    }
    else if (this.yDirection != 1
          && player.x > this.x - 48
          && player.x < this.x + 48
          && player.y > this.y)
    {
      this.yDirection = 1;
    }
}

_SlidingPlatform.prototype.getCollisionEvent = function(player)
{
  if (this.checkPlayerCollision(player))
  {
    var colevt = new CollisionEvent();
    colevt.name = this.name;
    colevt.collision = true;

    // Player has hit a block - rising or falling
    if (intersectRect(player.getBottomCollisionRect(), this.getTopCollisionRect()))
    {
      colevt.playerHit = false;

      player.yDirection = this.yDirection;
      player.ySpeed = this.ySpeed;
      player.targetY = this.y - player.rectOffset.bottom -1;
      player.collisionBottom = true;
    }
    else if (intersectRect(player.getTopCollisionRect(), this.getBottomCollisionRect()))
    {
      colevt.playerHit = true;

      player.yDirection = 0;
      player.ySpeed = 0;
      player.targetY = this.y + this.rectOffset.bottom - player.rectOffset.top;
      player.collisionTop = true;
    }
    else if (intersectRect(player.getLeftCollisionRect(), this.getRightCollisionRect()))
    {
      //Player has hit bridge from right
      colevt.playerHit = false;

      player.xDirection = 0;
      player.targetX = this.x + player.collisionWidth;
      player.collisionLeft = true;

    }
    else if (intersectRect(player.getRightCollisionRect(), this.getLeftCollisionRect()))
    {
      //Player has hit bridge from left
      colevt.playerHit = false;

      player.xDirection = 0;
      player.targetX = this.x - player.collisionWidth;
      player.collisionRight = true;
    }
    return colevt;
  }
  return false;
}
