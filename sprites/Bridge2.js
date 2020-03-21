function Bridge2()
{

    Sprite.call(this);

    this.name = "Bridge2";
    this.animMaxFrame = 1;

    this.deadly = false;

    this.fallWaitStartTime = 0;
    this.falling = false;
    this.waitingToFall = false;

    this.animXOffset = 64;
    this.animYOffset = 896;

    this.rectOffset = {top:0,  bottom:31, left:0,  right:63};


}

Bridge2.prototype = Object.create(Sprite.prototype);


Bridge2.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    if(this.hit)
    {
        if (this.falling)
        {
            //enemies fall due to gravity
            this.ySpeed = this.ySpeed + GRAVITY;

            if (this.ySpeed > 5) {this.ySpeed = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

            this.targetY = this.y + this.ySpeed;
        }
        else
        {

            var date = new Date();

            if ( ! this.waitingToFall)
            {
                this.fallWaitStartTime = date.getTime();
                this.waitingToFall = true;

            }
            else
            {

                //Waiting to fall - set wait time in milliseconds
                if ((date.getTime() - this.fallWaitStartTime) > 500)
                {
                    this.falling = true;
                }
            }
        }
    }
}
