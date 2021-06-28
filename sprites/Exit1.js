function Exit1()
{

    _Sprite.call(this);

    this.name = "Exit1";

    this.animMaxFrame = 1;

    this.deadly = false;

    this.animXOffset = 0;
    this.animYOffset = 960;
}

Exit1.prototype = Object.create(_Sprite.prototype);

Exit1.prototype.init = function(level_sprite_data)
{
    _Sprite.prototype.init.call(this, level_sprite_data);

};
