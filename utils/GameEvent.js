function GameEvent()
{
  eventType = "GAME_UNDEFINED";
  eventName = "GAME_UNDEFINED";
};


function SpawnEvent(spawnObject, atX, atY, objectParams)
{
  this.spawnObject = "NO_OBJECT_DEFINED";
  this.x = 0;
  this.y = 0;
  this.spawnObject=spawnObject;
  this.x = atX;
  this.y = atY;

  this.params = objectParams

}
