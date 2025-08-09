function EnemyElMaloBall1()
{
    _EnemyProjectile.call(this);

    this.name = "EnemyElMaloBall1";

    this.interactsWithWorld = false;

    this.animXOffset = 0;
    this.animYOffset = 2368;
    this.animMaxFrame = 2;
    this.bounce = false;

    this.xSpeed = 2;
    this.ySpeed = 3;
    this.rectOffset = {top:16,bottom:47,left:16,right:47};

    //prime the timer
    var date = new Date();
    this.lastYSpeedUpdateTime = date.getTime();
}

EnemyElMaloBall1.prototype = Object.create(_EnemyProjectile.prototype);

EnemyElMaloBall1.prototype.setMoveTargetY = function()
{
    
    var date = new Date();
    var currentTime = date.getTime();

    yVelocity = this.ySpeed * this.yDirection;


    if (currentTime - this.lastYSpeedUpdateTime > 250)
    {
        yVelocity = yVelocity + 1.5;
        if( yVelocity >= 20 ) { yVelocity = 20; }
        this.lastYSpeedUpdateTime = currentTime;
    
        if (yVelocity < 0)
        {
          //object is moving up the screen, so Y direction is negative
          this.yDirection = -1;
        }
        else
        {
          //object is moving down the screen, so Y direction is positive
          this.yDirection = 1;    
        }

        //get the new speed
        this.ySpeed = Math.abs(yVelocity);
    }
    
    //get the targey Y position
    this.targetY = this.y + yVelocity;
}
