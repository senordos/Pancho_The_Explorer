function Enemy4()
{

    _Sprite.call(this);


    this.name = "Enemy4";
    this.active = false;
    this.stompable = false;

    //this.image_src = "tiles/spritesheet_Enemy4.png";
    this.image_src = "tiles/spritesheet_Enemies_64.png";

    this.animXOffset = 0;
    this.animYOffset = 1024;
    this.animMaxFrame = 2;

    this.xSpeed = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};

    this.hitTime = null;
}

Enemy4.prototype = Object.create(_Sprite.prototype);

Enemy4.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);
};

Enemy4.prototype.setMoveTargetX = function(map, player)
{
    _Sprite.prototype.setMoveTargetX.call(this);

    var speed = 2;
    var chargeSpeed = 8;

    if ( this.x % chargeSpeed == 0) //so that baddy charge x updates will align with brick edges
    {
      if  (
            ( this.xDirection == -1 && this.x - player.x < 256 && this.x - player.x > 0 )
            ||
            ( this.xDirection ==  1 && player.x - this.x < 256 && player.x - this.x > 0 )
          )
      {
          speed = chargeSpeed; //baddy charges
      }
    }


    if (this.active == true && this.hit == false)
    {
      this.targetX = this.x + ((this.xDirection) * speed); //This is currently tied to the framerate
    }
}

Enemy4.prototype.setMoveTargetY = function(map, player)
{
    _Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = this.y + this.yDirection;
}


Enemy4.prototype.updateMoveAttributesX = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesX.call(this, map, player);


    //If the enemy has been hit, it may be ready to be back to life!
    if ( this.hit == true )
    {
        var date = new Date();
        if ( this.hitTime == null )
        {
            this.hitTime = date.getTime();
        }
        else
        {
            var currentTime = date.getTime();

            if ( currentTime - this.hitTime > 2000 )
            {
                this.hit = false;
                this.hitTime = null;
                this.deadly = true;
            }
        }
    }

    //Check if the enemy has had a collision
    if ( this.collision == true )
    {
        this.xDirection = this.xDirection * -1;
    }


    //This enemy will not walk of edges
    //Check for an edge and turn around if found
    if (this.canSeeEdges == true && this.localBricks.xLinedUp == true)
    {
        //if walking left, and there is an edge on the left, turn right
        if (this.xDirection == -1 &&
            (map[this.localBricks.leftDown].type == 0 || bricks[this.localBricks.leftDown].isBackground == true)
           )
        {
            this.xDirection = 1;
        }
        //if walking right, and there is an edge on the right, turn left
        if (this.xDirection == 1 &&
            (map[this.localBricks.rightDown].type == 0 || bricks[this.localBricks.rightDown].isBackground == true)
           )
        {
            this.xDirection = -1;
        }
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

Enemy4.prototype.updateMoveAttributesY = function (map, player)
{
    _Sprite.prototype.updateMoveAttributesY.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}

Enemy4.prototype.updateAttributesAfterStomped = function(map, player)
{
  _Sprite.prototype.updateAttributesAfterStomped.call(this, map);

  this.hit = true;
  this.deadly = false;

  this.xSpeed = 3;
  this.xDirection = this.xDirection * -1;

}
