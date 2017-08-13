function Exit1()
{

    Sprite.call(this);

    this.name = "Exit1";
    this.image_src = "tiles/Exit2.png";
    this.animMaxFrame = 1;

    this.deadly = false;

    this.fallWaitStartTime = 0;
    this.falling = false;
    this.waitingToFall = false;


}

Exit1.prototype = Object.create(Sprite.prototype);

Exit1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};
