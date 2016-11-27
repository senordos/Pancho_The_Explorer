function Bridge1()
{

    Sprite.call(this);

    this.name = "Bridge1";

    this.image_src = "tiles/spritesheet_enemy1.png";
    
    this.rectOffset = {top:0,bottom:63,left:0,right:63};

}

Bridge1.prototype = Object.create(Sprite.prototype);

Bridge1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};
