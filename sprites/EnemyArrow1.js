function EnemyArrow1()
{
    _Sprite.call(this);

    this.name = "EnemyArrow1";

    this.interactsWithWorld = true;

    this.animXOffset = 0;
    this.animYOffset = 2176;
    this.animMaxFrame = 1;

    this.xSpeed = 0;
    this.ySpeed = 12;
    this.rectOffset = {top:16,bottom:47,left:16,right:47};
}

EnemyArrow1.prototype = Object.create(_Sprite.prototype);

EnemyArrow1.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);
    this.targetY = this.y + this.ySpeed;
}

EnemyArrow1.prototype.updateAttributesAfterStomped = function(map, player)
{
  _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

  this.hit = true;
  this.deadly = false;
  this.xSpeed = 0;
  this.xDirection = 0;

}

EnemyArrow1.prototype.updateActions = function()
{
  _Sprite.prototype.updateActions.call(this);
  if (this.collision == true)
  {
    this.alive = false;
  }
}
