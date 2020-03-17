function EnemyBlock2()
{

    Sprite.call(this);


    this.name = "EnemyBlock2";
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

EnemyBlock2.prototype = Object.create(Sprite.prototype);

EnemyBlock2.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

    this.startXPosition = this.x;
    this.startYPosition = this.y;
};


EnemyBlock2.prototype.setMoveTargetX = function(map, player)
{
    Sprite.prototype.setMoveTargetX.call(this);

    console.log("startX " + this.startXPosition +
                "\nmaxX   " + (this.startXPosition + this.maxTravel) +
                "\nX " + this.x );

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

EnemyBlock2.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if ( this.collision == true )
    {
        this.xSpeed = 0;
    }
}

EnemyBlock2.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

EnemyBlock2.prototype.updateActions = function()
{
  Sprite.prototype.updateActions.call(this);

  //maybe this block spits out upwards projectiles....
  //Check the Monkey throwing code.
}

EnemyBlock2.prototype.getDrawYCoord = function()
{
  return this.animYOffset + 64;
}
