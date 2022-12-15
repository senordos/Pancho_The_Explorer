function _ProjectileThrower()
{
    _Sprite.call(this);

    this.name = "_ProjectileThrower";
    this.stompable = true;
    this.positionIsLocked = true; //default is that Monkeys don't move.

    this.animXOffset = 0;
    this.animYOffset = 1792;
    this.animMaxFrame = 6;
    this.lastThrowTime = null;

    this.xSpeed = 0;
    this.xDirection = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
    this.throwInterval = 3000;

    this.throwEventName = "_ProjectileThrower --- No Event Name Defined";
    this.throwEventObject = "EnemyStoneBall1";  //Default object is EnemyStoneBall1
    this.throwEventDirection = DOWN;
}

_ProjectileThrower.prototype = Object.create(_Sprite.prototype);

_ProjectileThrower.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);

    if (level_sprite_data.hasOwnProperty('.properties.ThrowDirection'))
    {
      switch(level_sprite_data.properties.ThrowDirection)
      {
        case "UP":    this.throwEventDirection = UP;
                      break;
        case "DOWN":  this.throwEventDirection = DOWN;
                      break;
        case "LEFT":  this.throwEventDirection = LEFT;
                      this.xDirection = -1;
                      break;
        case "RIGHT": this.throwEventDirection = RIGHT;
                      this.xDirection = 1;
                      break;
      }
    }
    if (level_sprite_data.hasOwnProperty('properties.ThrowObject'))
    {
        this.throwEventObject = level_sprite_data.properties.ThrowObject;
    }
    if (level_sprite_data.hasOwnProperty('properties.ThrowInterval'))
    {
        this.throwInterval = level_sprite_data.properties.ThrowInterval;
    }
};


_ProjectileThrower.prototype.setMoveTargetX = function(map, player)
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

_ProjectileThrower.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    if (this.positionIsLocked == false && this.active == true && this.hit == false)
    {
      this.yDirection = this.yDirection + GRAVITY;
      if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED
    }
    this.targetY = this.y + this.yDirection;
}


_ProjectileThrower.prototype.updateMoveAttributesX = function (map, player)
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

_ProjectileThrower.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

_ProjectileThrower.prototype.updateAttributesAfterStomped = function(map, player)
{
    _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

    this.hit = true;
    this.deadly = false;
    this.xSpeed = 0;
    this.xDirection = 0;
}


_ProjectileThrower.prototype.updateActions = function()
{
  _Sprite.prototype.updateActions.call(this);

  if(! this.hit)
  {
    var date = new Date();
    var shouldMonkeyThrow = false;

    //Check the timing to see if Monkey should throw
    if ( this.lastThrowTime == null )
    {
        this.lastThrowTime = date.getTime();
    }
    else
    {
        var currentTime = date.getTime();
        if ( currentTime - this.lastThrowTime > this.throwInterval )
        {
            shouldMonkeyThrow = true;
            this.lastThrowTime = currentTime;
        }
    }

    if (shouldMonkeyThrow)
    {
      var event = new GameEvent();
      event.eventType="SPAWN";
      event.eventName=this.throwEventName;

      startX = this.x;
      startY = this.y;
      if (this.throwEventDirection == LEFT)  { startX = startX - 64; }
      if (this.throwEventDirection == RIGHT)    { startX = startX + 64; }
      if (this.throwEventDirection == UP)  { startY = startY - 64; }
      if (this.throwEventDirection == DOWN) { startY = startY + 64; }

      event.eventObject = new SpawnEvent(this.throwEventObject,startX, startY,{"startXDirection":this.xDirection});
      return event;
    }
    else
    {
      return null;
    }
  }
}

_ProjectileThrower.prototype.getDrawYCoord = function()
{
  if (!this.hit)
  {
    return this.animYOffset;
  }
  else
  {
    //if object is hit...
    return this.animYOffset + 64;
  }
}
