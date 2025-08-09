function _ElMaloProjectileThrower()
{
    _ProjectileThrower.call(this);

    //These settings should all be overwritten in the constructor
    this.name = "_ElMaloProjectileThrower";
    this.stompable = true;
    this.positionIsLocked = true; //default is that Monkeys don't move.
    this.animXOffset = 0;
    this.animYOffset = 0;
    this.animMaxFrame = 2;
    

    this.lastThrowTime = null;
    this.xSpeed = 0;
    this.xDirection = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
    this.throwInterval = 1000;

    this.throwEventName = "_ElMaloProjectileThrower --- No Event Name Defined";
    this.throwEventObject = "EnemyStoneBall1";  //Default object is EnemyStoneBall1
    this.throwEventDirection = DOWN;
}

_ElMaloProjectileThrower.prototype = Object.create(_Sprite.prototype);


_ElMaloProjectileThrower.prototype.setMoveTargetX = function(map, player)
{
    _Sprite.prototype.setMoveTargetX.call(this);


    if (this.positionIsLocked == false && this.active == true && this.hit == false)
    {
      this.xSpeed = 8;
      if  ( this.x >= player.x + 128 ) //&& this.xDirection == 1 )
      {
        this.xDirection = -1;
      }
      if  ( this.x <= player.x - 128 ) //&& this.xDirection == -1)
      {
        this.xDirection = 1
      }

      this.targetX = this.x + (this.xDirection * this.xSpeed);
    }
}

_ElMaloProjectileThrower.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    if (this.positionIsLocked == false && this.active == true && this.hit == false)
    {
      this.yDirection = this.yDirection + GRAVITY;
      if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED
    }
    this.targetY = this.y + this.yDirection;
}



_ElMaloProjectileThrower.prototype.updateMoveAttributesX = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if ( this.collision == true )
    {
        this.xSpeed = 0;
    }

    //This enemy will not walk of edges
    //Check for an edge and STOP if found
    if (this.localBricks.xLinedUp == true)
    {
        //if walking left, and there is an edge on the left, turn right
        if (map[this.localBricks.leftDown].type == 0 && this.xDirection == -1)
        {
            this.xSpeed = 0;
        }
        //if walking right, and there is an edge on the right, turn left
        if (map[this.localBricks.rightDown].type == 0 && this.xDirection == 1)
        {
            this.xSpeed = 0;
        }
    }


}

_ElMaloProjectileThrower.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

_ElMaloProjectileThrower.prototype.updateAttributesAfterStomped = function(map, player)
{
    _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

    this.hit = true;
    this.deadly = false;
    this.xSpeed = 0;
    this.xDirection = 0;
}


_ElMaloProjectileThrower.prototype.updateActions = function()
{
  _Sprite.prototype.updateActions.call(this);

  if(! this.hit)
  {
    var date = new Date();
    var elMaloShouldThrow = false;

    //Check the timing to see if thrower should throw
    if ( this.lastThrowTime == null )
    {
        this.lastThrowTime = date.getTime();
    }
    else
    {
        var currentTime = date.getTime();
        if ( currentTime - this.lastThrowTime > this.throwInterval )
        {
            elMaloShouldThrow = true;
            this.lastThrowTime = currentTime;

            this.throwInterval = Math.random() * 1500;
        }
    }

    if (elMaloShouldThrow)
    {
      var event = new GameEvent();
      event.eventType="SPAWN";
      event.eventName=this.throwEventName;

      startX = this.x;
      startY = this.y;
      
      var xDir = 1;
      //The direction the ball will be thrown is set here
      directionRnd = Math.random();
      if (directionRnd < 0.5) { xDir = -1; }
      else                    { xDir = 1; }
      var yDir = -1;
      
      if      (xDir <  0 ) { startX = startX; }
      else if (xDir >= 0 ) { startX = startX + 64; }
      
      event.eventObject = new SpawnEvent(this.throwEventObject,
                                          startX, 
                                          startY,
                                          {"startXDirection":xDir,"startYDirection":yDir});
      return event;
    }
    else
    {
      return null;
    }
  }
}


