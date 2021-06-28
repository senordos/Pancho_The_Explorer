function EnemySpikes1()
{
    _Sprite.call(this);

    this.name = "EnemySpikes1";
    this.stompable = false;
    this.positionIsLocked = true;

    //Animation parameters
    this.animXOffset = 0;
    this.animYOffset = 2048;
    this.animMaxFrame = 1;

    //sprite specific variables
    this.timeSpikesRose = null;
    this.timespikesGoingDown = null;
    this.spikesGoingUp = false;
    this.spikesGoingDown = false;
    this.playerNearSpikes = false;
    this.spikesUp = false;
    this.activationDuration = 200;
    this.spikesHeight = 0; //settings 0 to 3 (4 animations)

    this.xSpeed = 0;
    this.xDirection = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
}

EnemySpikes1.prototype = Object.create(_Sprite.prototype);

EnemySpikes1.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);
}

EnemySpikes1.prototype.updateMoveAttributesX = function(map, player)
{
  _Sprite.prototype.updateMoveAttributesX.call(this,map,player);

  //the spikes don't move, but using this function
  //to check the spikes position relative to the player
  if (player.y > this.y - 80 && player.y < this.y + 64)
  {
    if (player.x < this.x && this.x - player.x < 196)
    {
        this.playerNearSpikes = true;
    }
    else if (player.x >= this.x && player.x - this.x < 196)
    {
        this.playerNearSpikes = true;
    }
    else
    {
        this.playerNearSpikes = false;
    }
  }
}


EnemySpikes1.prototype.updateActions = function()
{
  _Sprite.prototype.updateActions.call(this);

  if (this.playerNearSpikes && ! this.spikesUp
      && ! this.spikesGoingUp && ! this.spikesGoingDown)
  {
      //player is nearby and the spikes are down and not raising - raise them!
      var date = new Date();
      this.timeSpikesRose = date.getTime();
      this.spikesGoingUp = true;
      this.spikesUp = true;     //set spikes to be up so they become deadly
      this.spikesHeight = 1;
  }
  else if (this.spikesGoingUp)
  {
    //if spikes are going up, need to set the parameter for when they are fully up
    var date = new Date();
    now = date.getTime();

    if (now > (this.timeSpikesRose + this.activationDuration))
    {
      this.spikesGoingUp = false;
      this.spikesHeight = 3;
    }
    else if ( now > (this.timeSpikesRose + this.activationDuration / 2))
    {
      this.spikesHeight = 2;
    }
    else if ( now > (this.timeSpikesRose + this.activationDuration / 4))
    {
      this.spikesHeight = 1;
    }

  }
  else if (! this.playerNearSpikes && this.spikesUp && ! this.spikesGoingDown)
  {
      //spikes have been activated, but player not in vicinity
      //Leave up until timer counts down, then lower the spikes
      var date = new Date();
      this.timespikesGoingDown = date.getTime();
      this.spikesGoingDown = true;
  }
  else if (this.spikesGoingDown)
  {
      var date = new Date();
      now = date.getTime()

      if (now > (this.timespikesGoingDown + this.activationDuration))
      {
        this.spikesUp = false;
        this.spikesGoingDown = false;
        this.spikesHeight = 0;
      }
      else if (now > (this.timespikesGoingDown + this.activationDuration / 2))
      {
        this.spikesHeight = 1;
      }
      else if (now > (this.timespikesGoingDown + this.activationDuration / 4))
      {
        this.spikesHeight = 2;
      }
  }

  return null;
}

EnemySpikes1.prototype.getDrawYCoord = function(gameFrame)
{
    return this.animYOffset;
}

EnemySpikes1.prototype.getDrawXCoord = function(gameFrame)
{

  switch(this.spikesHeight)
  {
    case 0: return this.animXOffset; //spikes are down, this is the base X mapOffset
    break;
    case 1: return this.animXOffset + 64;
    break;
    case 2: return this.animXOffset + 128;
    break;
    case 3: return this.animXOffset + 192;
    break;
    default: this.animXOffset;
  }

}
