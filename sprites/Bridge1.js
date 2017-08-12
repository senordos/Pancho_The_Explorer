function Bridge1()
{

    Sprite.call(this);

    this.name = "Bridge1";
    this.image_src = "tiles/bridge1.png";
    this.animMaxFrame = 1;

    this.deadly = false;

    this.fallWaitStartTime = 0;
    this.falling = false;
    this.waitingToFall = false;


}

Bridge1.prototype = Object.create(Sprite.prototype);

Bridge1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};


Bridge1.prototype.setMoveTargetY = function()
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

