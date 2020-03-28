function EnemyMonkey2()
{

    _Sprite.call(this);


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
}

EnemyMonkey2.prototype = Object.create(_Sprite.prototype);

EnemyMonkey2.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);
};


EnemyMonkey2.prototype.setMoveTargetX = function(map, player)
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

EnemyMonkey2.prototype.setMoveTargetY = function()
{
    _Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = this.y + this.yDirection;
}


EnemyMonkey2.prototype.updateMoveAttributesX = function (map, player)
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

EnemyMonkey2.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

EnemyMonkey2.prototype.updateAttributesAfterStomped = function(map, player)
{
    _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

    this.hit = true;
    this.deadly = false;
    this.xSpeed = 0;
    this.xDirection = 0;
}


EnemyMonkey2.prototype.updateActions = function()
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
        if ( currentTime - this.lastThrowTime > 3000 )
        {
            shouldMonkeyThrow = true;
            this.lastThrowTime = currentTime;
        }
    }

    if (shouldMonkeyThrow)
    {
      var event = new GameEvent();
      event.eventType="SPAWN";
      event.eventName="Monkey Throws Banana";
      event.eventObject = new SpawnEvent("EnemyMonkeyBanana1",this.x, this.y,{"startXDirection":this.xDirection});
      return event;
    }
    else
    {
      return null;
    }
  }
}

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
