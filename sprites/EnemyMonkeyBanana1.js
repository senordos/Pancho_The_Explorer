function EnemyMonkeyBanana1()
{
    _Sprite.call(this);

    this.name = "EnemyMonkeyBanana1";

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

EnemyMonkeyBanana1.prototype = Object.create(_EnemyProjectile.prototype);
