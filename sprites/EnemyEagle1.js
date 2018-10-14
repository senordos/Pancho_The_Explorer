function EnemyEagle1()
{

    Sprite.call(this);


    this.name = "EnemyEagle1";
    this.active = true;
    this.stompable = true;

    //this.image_src = "tiles/spritesheet_EnemyEagle1.png";
    this.image_src = "tiles/spritesheet_Objects_64.png";

    this.animXOffset = 0;
    this.animYOffset = 1280;
    this.animMaxFrame = 3;

    this.xSpeed = 2;
    this.ySpeed = 2;
    this.rectOffset = {top:0,bottom:63,left:0,right:63};

    this.hitTime = null;
}

EnemyEagle1.prototype = Object.create(Sprite.prototype);

EnemyEagle1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);
};



EnemyEagle1.prototype.setMoveTargetX = function(map, player)
{
    Sprite.prototype.setMoveTargetX.call(this);


    if (this.active == true && this.hit == false)
    {
      this.targetX = this.x + ((this.xDirection) * this.xSpeed);
    }

    console.log("this.targetX = " + this.targetX);
    console.log("xDirection   = " + this.xDirection);

}

EnemyEagle1.prototype.setMoveTargetY = function(map, player)
{
    Sprite.prototype.setMoveTargetY.call(this);

    this.targetY = this.y + this.yDirection * this.ySpeed;

}


EnemyEagle1.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);


    //Check if the enemy has had a collision
    if ( this.collision == true )
    {
        this.xDirection = this.xDirection * -1;
    }


    var distance = this.x - player.x

    if (this.active != true)
    {
      if ( this.activateIfPlayerXGT !== undefined )
      {
          if ( this.activateIfPlayerXGT > 0 && player.x > this.activateIfPlayerXGT )
          {
              this.active = true;
              console.log("ACTIVE CORRECT");
          }
          else if ( this.activateIfPlayerXGT == 0 )
          {
              this.active = true;
              console.log("ACTIVE CORRECT");
          }
      }
      else
      {
          this.active = true;
          console.log("ACTIVE BUUUU");

      }
    }
}

EnemyEagle1.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = this.yDirection * -1;
    }
}
