function EnemyMonkey1()
{

    Sprite.call(this);


    this.name = "EnemyMonkey1";
    this.stompable = true;
    this.positionIsLocked = true; //default is that Monkeys don't move.

    this.animXOffset = 0;
    this.animYOffset = 1600;
    this.animMaxFrame = 2;
    this.lastThrowTime = null;

    this.xSpeed = 0;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
}

EnemyMonkey1.prototype = Object.create(Sprite.prototype);

EnemyMonkey1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);
};


EnemyMonkey1.prototype.setMoveTargetX = function(map, player)
{
    Sprite.prototype.setMoveTargetX.call(this);


    if (this.positionIsLocked == false && this.active == true && this.hit == false)
    {
      this.xSpeed = 4;
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

EnemyMonkey1.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = this.y + this.yDirection;
}


EnemyMonkey1.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if ( this.collision == true )
    {
        this.xDirection = 0;
        this.xSpeed = 0;
    }

    //This enemy will not walk of edges
    //Check for an edge and STOP if found
    if (this.localBricks.xLinedUp == true)
    {
        //if walking left, and there is an edge on the left, turn right
        if (map[this.localBricks.leftDown].type == 0 && this.xDirection == -1)
        {
            this.xDirection = 0;
        }
        //if walking right, and there is an edge on the right, turn left
        if (map[this.localBricks.rightDown].type == 0 && this.xDirection == 1)
        {
            this.xDirection = 0;
        }
    }


}

EnemyMonkey1.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

EnemyMonkey1.prototype.updateAttributesAfterStomped = function(map, player)
{
    Sprite.prototype.updateAttributesAfterStomped.call(this, map);

    this.hit = true;
    this.deadly = false;
    this.xSpeed = 0;
    this.xDirection = 0;
}


EnemyMonkey1.prototype.updateActions = function()
{
  Sprite.prototype.updateActions.call(this);

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
      event.eventName="Monkey Throws Rock";
      //Rock is spawned a bit lower than the monkey's position.
      event.eventObject = new SpawnEvent("EnemyMonkeyRock1",this.x, this.y + 64,null);
      return event;
    }
    else
    {
      return null;
    }
  }
}

EnemyMonkey1.prototype.getDrawYCoord = function()
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
