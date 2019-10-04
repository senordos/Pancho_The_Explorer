function EnemyMonkeyBanana1()
{
    Sprite.call(this);

    this.name = "EnemyMonkeyBanana1";

    this.interactsWithWorld = false;

    this.animXOffset = 0;
    this.animYOffset = 1984;
    this.animMaxFrame = 2;

    this.xSpeed = 8;
    this.ySpeed = 0;
    this.rectOffset = {top:16,bottom:47,left:16,right:47};
}

EnemyMonkeyBanana1.prototype = Object.create(Sprite.prototype);

EnemyMonkeyBanana1.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);
    this.xDirection = 1;
    this.targetX = this.x + this.xSpeed;
}

EnemyMonkeyBanana1.prototype.updateAttributesAfterStomped = function(map, player)
{
  Sprite.prototype.updateAttributesAfterStomped.call(this, map);
  this.hit = true;
  this.deadly = false;
  this.xSpeed = 0;
  this.xDirection = 0;
  this.alive = false;
}
