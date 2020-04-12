function EnemyMonkey2()
{

    _ProjectileThrower.call(this);


    this.name = "EnemyMonkey2";
    this.stompable = true;
    this.positionIsLocked = true; //default is that Monkeys don't move.

    this.animXOffset = 0;
    this.animYOffset = 1792;
    this.animMaxFrame = 6;
    this.lastThrowTime = null;

    this.xSpeed = 0;
    this.xDirection = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};

    this.throwEventName = "Monkey 1 throws EnemyMonkeyRock1";
    this.throwEventObject = "EnemyMonkeyBanana1";
    this.throwEventDirection = LEFT;
}

EnemyMonkey2.prototype = Object.create(_ProjectileThrower.prototype);

EnemyMonkey2.prototype.getDrawYCoord = function()
{
  if (!this.hit)
  {
    if (this.xDirection >= 0) { return this.animYOffset; }
    else { return this.animYOffset + 64; }
  }
  else
  {
    //if object is hit...
    return this.animYOffset + 128;
  }
}
