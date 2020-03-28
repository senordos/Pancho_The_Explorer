function ChilliEL()
{

    _Sprite.call(this);

    this.name = "ChilliEL";
    this.active = true;

    this.animXOffset = 0;
    this.animYOffset = 768;

    this.deadly = false;
    this.animMaxFrame = 1;
    this.rectOffset = {top:16,bottom:63,left:16,right:40};

}

ChilliEL.prototype = Object.create(_Sprite.prototype);

ChilliEL.prototype.getCollisionStats = function(player)
{
    if (this.checkPlayerCollision(player))
    {
      //default collision behaviour if method not overridden.
      //acts like a basic chilli
      this.active = false;
      this.alive = false;

      var colevt = new CollisionEvent();
      colevt.name = this.name;
      colevt.collision = true;
      colevt.enemyHit = false;
      colevt.playerHit = false;
      colevt.sound="SND_CHILLI";

      return colevt;
    }
    return false;
}
