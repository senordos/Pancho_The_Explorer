function EnemyStoneBall1()
{
    _Sprite.call(this);

    this.name = "EnemyStoneBall1";

    this.interactsWithWorld = true;

    this.animXOffset = 0;
    this.animYOffset = 2368;
    this.animMaxFrame = 2;
    this.xDirection = -1;
    this.yDirection = 0;
    this.bounce = false;

    this.xSpeed = 12;
    this.ySpeed = 0;
    this.rectOffset = {top:16,bottom:47,left:16,right:47};
}

EnemyStoneBall1.prototype = Object.create(_EnemyProjectile.prototype);
