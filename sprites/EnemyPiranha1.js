function EnemyPiranha1()
{
    Sprite.call(this);

    this.interactsWithWorld = false;

    this.name = "EnemyPiranha1";
    this.active = true;
    this.visible = true; //this will be used as false when not jumping
    this.stompable = false;

    this.image_src = "tiles/spritesheet_Objects_64.png";

    this.animXOffset = 0;
    this.animYOffset = 1472;
    this.animMaxFrame = 4;

    this.xSpeed = 0;
    this.yStartSpeed = 32;
    this.ySpeed = this.yStartSpeed;
    this.yDirection = -1;

    //timer controls for when to jump again
    this.startJumpWaitTime = 0;
    this.waitingToJump = false;


    //controls for delaying activation
    this.activationWaitingSince = 0;
    this.waitingToActivate = true;

    this.rectOffset = {top:16,bottom:55,left:0,right:63};
}

EnemyPiranha1.prototype = Object.create(Sprite.prototype);

EnemyPiranha1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

    //Set the startY position so the sprite recognises the start position
    this.startY = this.y;

    if ( this.delayActivation > 0 )
    {
        this.active = false;
        this.waitingToActivate = true;

        var startActivationDate = new Date();
        this.activationWaitingSince = startActivationDate.getTime();
    }
};



EnemyPiranha1.prototype.setMoveTargetX = function(map, player)
{
    Sprite.prototype.setMoveTargetX.call(this);

    //The piranhas don't move in the x axis

}

EnemyPiranha1.prototype.setMoveTargetY = function(map, player)
{
    Sprite.prototype.setMoveTargetY.call(this);

    console.log("startY = " + this.startY );
    console.log("     Y = " + this.y );
    console.log("yspeed = " + this.ySpeed );


    if (this.active == true && this.hit == false && this.yDirection <= 0 )
    {
      //Sprite is above the starting position
      this.targetY = this.y + (this.ySpeed * -1);
      this.ySpeed = this.ySpeed - 1;
      console.log("yspeed " + this.ySpeed);
      //if (this.targetY < this.startY - 256) { this.yDirection = 1;
      if (this.ySpeed < 0) { this.yDirection = 1; this.ySpeed = 0; }

    }
    else if (this.active == true && this.hit == false && this.yDirection > 0 )
    {

      if ( this.targetY >= this.startY)
      {
        var date = new Date();

        if ( ! this.waitingToJump)
        {
            this.startJumpWaitTime = date.getTime();
            this.waitingToJump = true;
            this.ySpeed = 0;
            //make invisible
            this.visible = false;
        }
        else
        {
            //Waiting to jump - set wait time in milliseconds
            if ((date.getTime() - this.startJumpWaitTime) > 750)
            {
                this.waitingToJump = false;

                this.yDirection = -1;
                this.ySpeed = this.yStartSpeed;
                this.targetY = this.startY;
                //make visible
                this.visible = true;
            }
        }
      }
      else
      {
          this.targetY = this.y + this.ySpeed;
          this.ySpeed = this.ySpeed + 1;
      }

    }
    else if ( this.waitingToActivate == true )
    {
        //if not active, sprite is waiting to be active
        var date = new Date();
        //Waiting to jump - set wait time in milliseconds

        console.log ("waiting:" + this.activationWaitingSince);
        console.log ("delay:" + this.delayActivation);

        if ((date.getTime() - this.activationWaitingSince) > this.delayActivation)
        {
            this.waitingToActivate = false;
            this.active = true;

            this.waitingToJump = false;
            this.yDirection = -1;
            this.ySpeed = this.yStartSpeed;
            this.targetY = this.startY;

            //make visible
            this.alive = true;
        }
    }
}


EnemyPiranha1.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);

}

EnemyPiranha1.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map);
/*
    if ( this.y > this.startY )
    {
        this.y = this.startY - 64;
        this.ySpeed = - 64;
    }
*/
}
