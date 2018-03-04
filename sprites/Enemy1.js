function Enemy1()
{

    Sprite.call(this);


    this.name = "Enemy1";
    this.active = false;
    this.stompable = true;

    //this.image_src = "tiles/spritesheet_enemy1.png";
    this.image_src = "tiles/spritesheet_Enemies_64.png";

    this.animXOffset = 0;
    this.animYOffset = 128;

    this.xSpeed = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};


}

Enemy1.prototype = Object.create(Sprite.prototype);

Enemy1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};



Enemy1.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);

    if (this.active == true)
    {
      this.targetX = this.x + ((this.xDirection) * 2); //This is currently tied to the framerate
    }
}

Enemy1.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = this.y + this.yDirection;
}


Enemy1.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);

    if ( this.collision == true )
    {
        this.xDirection = this.xDirection * -1;
    }

    //This enemy will not walk of edges
    //Check for an edge and turn around if found
    if (this.localBricks.xLinedUp == true)
    {
        //if walking left, and there is an edge on the left, turn right
        if (map[this.localBricks.leftDown].type == 0 && this.xDirection == -1)
        {
            this.xDirection = 1;
        }
        //if walking right, and there is an edge on the right, turn left
        if (map[this.localBricks.rightDown].type == 0 && this.xDirection == 1)
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

Enemy1.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }
}
