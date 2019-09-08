function EnemyEagle1()
{

    Sprite.call(this);


    this.name = "EnemyEagle1";
    this.active = true;
    this.stompable = true;

    this.image_src = "tiles/spritesheet_Objects_64.png";

    this.animXOffset = 0;
    this.animYOffset = 1280;
    this.animMaxFrame = 3;

    this.xSpeed = 6;
    this.ySpeed = 2;
    this.rectOffset = {top:16,bottom:55,left:0,right:63};

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
}

EnemyEagle1.prototype.setMoveTargetY = function(map, player)
{
    Sprite.prototype.setMoveTargetY.call(this);

    if (this.active == true && this.hit == false)
    {
      this.targetY = this.y + this.yDirection * this.ySpeed;
    }
    else if (this.active == true && this.hit == true)
    {
      this.yDirection = 1;
      this.ySpeed = 8;
      this.targetY = this.y + (this.ySpeed * this.yDirection);
    }

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

    if (this.collision == true && this.hit == false)
    {
        this.yDirection = this.yDirection * -1;
    }
    if (this.collision == true && this.hit == true)
    {
        this.yDirection = 1;
        this.ySpeed = 0;
    }

}

EnemyEagle1.prototype.updateAttributesAfterStomped = function(map, player)
{
    Sprite.prototype.updateAttributesAfterStomped.call(this, map);

    this.hit = true;
    this.deadly = false;
    this.xSpeed = 0;
    this.ySpeed = 2;
    this.xDirection = 0;
}
