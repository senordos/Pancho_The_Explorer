function EnemyGenerator1()
{

    _ProjectileThrower.call(this);


    this.name = "EnemyGenerator1";
    this.stompable = false;
    this.positionIsLocked = true;

    this.animXOffset = 0;
    this.animYOffset = 2304;
    this.animMaxFrame = 1;
    this.lastThrowTime = null;

    this.xSpeed = 0;
    this.xDirection = -1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};

    this.throwEventName = "";
    this.throwEventObject

    this.throwEventName = "EnemyGenerator1 generates StoneBall1";
    this.throwEventObject = "Enemy1";
    this.throwEventDirection = LEFT;

}

EnemyGenerator1.prototype = Object.create(_ProjectileThrower.prototype);

EnemyGenerator1.prototype.getDrawXCoord = function(gameFrame)
{
  switch(this.throwEventDirection)
  {
    case DOWN:  return 0;
                break;
    case LEFT:  return 64;
                break;
    case UP:    return 128;
                break;
    case RIGHT: return 196;
                break;
  }
}

EnemyGenerator1.prototype.getDrawYCoord = function()
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
