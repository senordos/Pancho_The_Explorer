function _EnemyProjectile()
{
    _Sprite.call(this);

    this.name = "_EnemyProjectile";

    this.interactsWithWorld = true;

    this.animXOffset = 0;
    this.animYOffset = 1984;
    this.animMaxFrame = 2;
    this.xDirection = 1;
    this.yDirection = 0;
    this.bounce = false;

    this.xSpeed = 8;
    this.ySpeed = 0;
    this.rectOffset = {top:16,bottom:47,left:16,right:47};

}

_EnemyProjectile.prototype = Object.create(_Sprite.prototype);

_EnemyProjectile.prototype.setMoveTargetX = function()
{
    this.targetX = this.x + this.xSpeed * this.xDirection;
}

_EnemyProjectile.prototype.setMoveTargetY = function()
{
    if (this.yDirection != 0)
    {
      //enemies fall due to gravity
      this.ySpeed = this.ySpeed + GRAVITY;
      if (this.ySpeed > 8) {this.ySpeed = 8;}

      this.targetY = this.y + this.ySpeed * this.yDirection;
    }
    else
    {
      this.targetY = this.y;
    }
}

_EnemyProjectile.prototype.updateAttributesAfterStomped = function(map, player)
{
  _Sprite.prototype.updateAttributesAfterStomped.call(this, map);
  this.hit = true;
  this.deadly = false;
  this.xSpeed = 0;
  this.xDirection = 0;
  this.alive = false;
}

_EnemyProjectile.prototype.updateActions = function()
{
  _Sprite.prototype.updateActions.call(this);
  if (this.collision == true)
  {
    if (!this.bounce)
    {
      this.alive = false;
    }
    else
    {
        if (this.collisionLeft || this.collisionRight)
        {
          this.xDirection = this.xDirection * -1;
        }

        if (this.collisionBottom)
        {
          console.log(this.ySpeed);
          this.ySpeed = this.ySpeed * -1;
        }
    }
  }
}
