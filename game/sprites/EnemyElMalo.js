function EnemyElMalo()
{

    _ElMaloProjectileThrower.call(this);


    this.name = "EnemyElMalo";
    this.stompable = false;
    this.positionIsLocked = false; 

    this.w = 128; //width for El Malo is double the normal width
    this.h = 128; //height for El Malo is double the normal height 

    //for collision detection, these rectangles define the sprite
    this.rectOffset =       {top:0,  bottom:127, left:0,  right:127};
    this.rectTopOffset =    {top:0,  bottom:62, left:8,  right:119};
    this.rectBottomOffset = {top:63, bottom:127, left:8,  right:119};
    this.rectLeftOffset =   {top:39, bottom:117, left:0,  right:38};
    this.rectRightOffset =  {top:39, bottom:117, left:107, right:127};
    this.collisionWidth = 112;
    this.collisionHeight = 128;

    this.animXOffset = 0;
    this.animYOffset = 2496;
    this.animMaxFrame = 2;
    this.lastThrowTime = null;

    this.xSpeed = 0;
    this.xDirection = 0;

    this.throwEventName = "El Malo throws projectiles";
    this.throwEventObject = "EnemyElMaloBall1";
    this.throwEventDirection = LEFT;
}

EnemyElMalo.prototype = Object.create(_ElMaloProjectileThrower.prototype);

EnemyElMalo.prototype.getDrawYCoord = function()
{

  console.log("hit   = " + this.hit);
  console.log("lives = " + this.lives );


  if (!this.hit && this.lives == 3 )
  {
    return this.animYOffset; 
  }
  else if (!this.hit && this.lives == 2 )
  {
    return this.animYOffset + 128;
  }
  else if (!this.hit && this.lives == 1 )
  {
    return this.animYOffset + 256;
  }
  else
  {
    return this.animYOffset + 256;
  }
}

EnemyElMalo.prototype.updateAttributesAfterStomped = function(map, player)
{

  console.log("EL MALO");
  player.ySpeed = -8;

  if (this.lives == 3)
  {
    this.lives --;
  }
  else if (this.lives == 2)
  {
    this.lives --;
  }
  else if (this. lives = 1)
  {
    this.lives --;
  }

  this.hit = false;
  this.deadly = true;
  this.xSpeed = 1;

}
