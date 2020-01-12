function EnemySpikes1()
{

    Sprite.call(this);


    this.name = "EnemySpikes1";
    this.stompable = false;
    this.positionIsLocked = true;

    //Animation parameters
    this.animXOffset = 0;
    this.animYOffset = 2048;
    this.animMaxFrame = 1;

    //sprite specific variables
    this.timeSpikesRose = null;
    this.playerNearSpikes = false;
    this.spikesUp = false;

    this.xSpeed = 0;
    this.xDirection = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};
}

EnemySpikes1.prototype = Object.create(Sprite.prototype);

EnemySpikes1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);
}

EnemySpikes1.prototype.updateMoveAttributesX = function(map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this,map,player);

  //the spikes don't move, but using this function
  //to check the spikes position relative to the player
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


EnemySpikes1.prototype.updateActions = function()
{
  Sprite.prototype.updateActions.call(this);

  console.log("spikes should rise? " + this.playerNearSpikes);

  if (! this.playerNearSpikes && this.spikesUp == false)
  {
      //spikes down and no reason to raise.
      //do nothing
  }
  else if (! this.playerNearSpikes && this.spikesUp == true)
  {
      //spikes have been activated, but player not in vicinity
      //Leave up until timer counts down, then lower the spikes

      //TODO
      this.spikesUp = false;
  }
  else if (this.playerNearSpikes && this.spikesUp == false)
  {
      //player is nearby and the spikes are down - raise them!
      var date = new Date();
      timeSpikesRose = date.getTime();

      this.spikesUp = true;
  }
  else if (this.playerNearSpikes && this.spikesUp == true)
  {
      //spikes are already up ... do nothing
  }

  return null;
}

EnemySpikes1.prototype.getDrawYCoord = function(gameFrame)
{
    return this.animYOffset;
}

EnemySpikes1.prototype.getDrawXCoord = function(gameFrame)
{
  if (! this.spikesUp)
  {
    //spikes are down - return the base offset
    return this.animXOffset;
  }
  else
  {
    var date = new Date();
    timeSinceRise = date.getTime() - timeSpikesRose;

    if (timeSinceRise < 100)
    {
      //spikes are up - return the up offset
      return this.animXOffset + 64;
    }
    else if (timeSinceRise < 200)
    {
      //spikes are up - return the up offset
      return this.animXOffset + 128;
    }
    else
    {
      //spikes are up - return the up offset
      return this.animXOffset + 196;
    }
  }
}
