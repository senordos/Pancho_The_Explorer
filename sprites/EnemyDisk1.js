function EnemyDisk1()
{

    _Sprite.call(this);


    this.name = "EnemyDisk1";
    this.stompable = false;

    this.animXOffset = 0;
    this.animYOffset = 2240;
    this.animMaxFrame = 1;

    //set how far it can travelled from where it starts
    this.maxTravel = 192;

    this.xSpeed = 1;
    this.xDirection = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
}

EnemyDisk1.prototype = Object.create(_Sprite.prototype);

EnemyDisk1.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);
};


EnemyDisk1.prototype.setMoveTargetX = function(map, player)
{
    _Sprite.prototype.setMoveTargetX.call(this);

    if (this.xDirection == 1)
    {
      this.xSpeed = this.xSpeed + 1;
      if  ( this.xSpeed >= this.xMaxSpeed ){ this.xSpeed = this.xMaxSpeed; }
      if  ( this.x >= (this.startXPosition + this.maxTravel) )
      {
        this.xDirection = -1;
        this.xSpeed = 0;
      }
    }
    else
    {
      this.xSpeed = this.xSpeed + 1;
      if  ( this.xSpeed >= this.xMaxSpeed ) { this.xSpeed = this.xMaxSpeed; }
      if  ( this.x <= (this.startXPosition - this.maxTravel) )
      {
        this.xDirection = 1;
        this.xSpeed = 0;
      }
    }

    this.targetX = this.x + (this.xDirection * this.xSpeed);
}

EnemyDisk1.prototype.updateMoveAttributesX = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if ( this.collision == true )
    {
        this.xSpeed = 0;
        this.xDirection = this.xDirection * -1;
    }
}

EnemyDisk1.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

EnemyDisk1.prototype.updateActions = function()
{
  _Sprite.prototype.updateActions.call(this);

  //maybe this block spits out upwards projectiles....
  //Check the Monkey throwing code.
}

EnemyDisk1.prototype.getDrawYCoord = function()
{
  return this.animYOffset + 64;
}

EnemyDisk1.prototype.getCollisionEvent = function(player)
{
    if (this.checkPlayerCollision(player))
    {
      var colevt = new CollisionEvent();
      colevt.name = this.name;
      colevt.collision = true;
      colevt.enemyHit = false;
      colevt.playerHit = true;

      return colevt;
    }
    return false;
}
