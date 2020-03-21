function EnemyArrowTrap1()
{

    Sprite.call(this);


    this.name = "EnemyArrowTrap1";
    this.stompable = false;
    this.positionIsLocked = true;

    this.animXOffset = 0;
    this.animYOffset = 2112;
    this.animMaxFrame = 1;
    this.lastThrowTime = null;

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
}

EnemyArrowTrap1.prototype = Object.create(Sprite.prototype);

EnemyArrowTrap1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);
};


EnemyArrowTrap1.prototype.updateActions = function()
{
  Sprite.prototype.updateActions.call(this);
  var date = new Date();
  var shouldArrowFire = false;

  //Check the timing to see if Monkey should throw
  if ( this.lastThrowTime == null )
  {
      this.lastThrowTime = date.getTime();
  }
  else
  {
      var currentTime = date.getTime();
      if ( currentTime - this.lastThrowTime > 1000 )
      {
          shouldArrowFire = true;
          this.lastThrowTime = currentTime;
      }
  }

  if (shouldArrowFire)
  {
    var event = new GameEvent();
    event.eventType="SPAWN";
    event.eventName="Arrow is thrown";
    //Rock is spawned a bit lower than the monkey's position.
    event.eventObject = new SpawnEvent("EnemyArrow1",this.x, this.y + 64,null);
    return event;
  }
  else
  {
    return null;
  }
}

EnemyArrowTrap1.prototype.getDrawYCoord = function()
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
