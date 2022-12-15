function EnemyPiranha1()
{
    _Sprite.call(this);

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

EnemyPiranha1.prototype = Object.create(_Sprite.prototype);

EnemyPiranha1.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);

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
    _Sprite.prototype.setMoveTargetX.call(this);

    //The piranhas don't move in the x axis

}

EnemyPiranha1.prototype.setMoveTargetY = function(map, player)
{
    _Sprite.prototype.setMoveTargetY.call(this);

    if (this.active == true && this.hit == false && this.yDirection <= 0 )
    {
      //_Sprite is above the starting position
      this.targetY = this.y + (this.ySpeed * -1);
      this.ySpeed = this.ySpeed - 1;
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

EnemyPiranha1.prototype.getCollisionEvent = function(player)
{
    if (this.checkPlayerCollision(player) && this.waitingToJump == false)
    {
      var colevt = new CollisionEvent();
      colevt.name = this.name;
      colevt.collision = true;
      colevt.enemyHit = false;
      colevt.playerHit = true;

      return colevt;
    }
    return false;
}
