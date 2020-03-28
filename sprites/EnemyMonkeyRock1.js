function EnemyMonkeyRock1()
{
    _Sprite.call(this);

    this.name = "EnemyMonkeyRock1";

    this.interactsWithWorld = false;

    this.animXOffset = 0;
    this.animYOffset = 1728;
    this.animMaxFrame = 2;

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.rectOffset = {top:16,bottom:47,left:16,right:47};
}

EnemyMonkeyRock1.prototype = Object.create(_Sprite.prototype);

EnemyMonkeyRock1.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity

    this.ySpeed = this.ySpeed + GRAVITY;

    if (this.ySpeed > 8) {this.ySpeed = 8;}

    this.targetY = this.y + this.ySpeed;

}

EnemyMonkeyRock1.prototype.updateAttributesAfterStomped = function(map, player)
{
  _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

  this.hit = true;
  this.deadly = false;
  this.xSpeed = 0;
  this.xDirection = 0;

}
