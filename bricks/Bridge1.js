function Bridge1()
{

    Brick.call(this);

    this.name = "Bridge1";

}

Bridge1.prototype = Object.create(Brick.prototype);

Bridge1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};


Bridge1.prototype.move = function()
{
    if (this.hit == true)
    {
        this.y = this.y + 1;

        this.rectMain.top = this.rectMain.top + 1;
        this.rectMain.bottom = this.rectMain.bottom + 1;
        

    }


}

