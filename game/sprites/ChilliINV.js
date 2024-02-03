function ChilliINV()
{

    _Sprite.call(this);

    this.name = "ChilliINV";
    this.active = true;

    this.image_src = "tiles/spritesheet_chilli1.png";
    this.animXOffset = 0;
    this.animYOffset = 704;

    this.deadly = false;
    this.animMaxFrame = 1;
    this.rectOffset = {top:16,bottom:63,left:16,right:40};

}

ChilliINV.prototype = Object.create(_Sprite.prototype);

ChilliINV.prototype.getCollisionEvent = function(player)
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
