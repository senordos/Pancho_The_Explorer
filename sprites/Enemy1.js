function Enemy1()
{

    Sprite.call(this);

    this.name = "Enemy1";

    this.image_src = "tiles/spritesheet_enemy1.png";

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

    this.targetX = this.x + ((this.xDirection) * 2); //This is currently tied to the framerate

}

Enemy1.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    //enemies fall due to gravity
    this.yDirection = this.yDirection + GRAVITY;

    if (this.yDirection > 5) {this.yDirection = 5;} //Y DIRECTION SHOULD ONLY BE 1 - NEED TO CHANGE TO Y SPEED

    this.targetY = this.y + this.yDirection;
}


Enemy1.prototype.updateMoveAttributesX = function (map)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map);

    if ( this.collision == true )
    {
        this.xDirection = this.xDirection * -1;
    }
}

Enemy1.prototype.updateMoveAttributesY = function (map)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map);

    if (this.collision == true)
    {
        this.yDirection = 0;
    }    
}