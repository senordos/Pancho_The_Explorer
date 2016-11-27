function Enemy2()
{

    Sprite.call(this);

    this.name = "Enemy2";

    this.image_src = "tiles/spritesheet_enemy2.png";

    this.xSpeed = 1;
    this.rectOffset = {top:16,bottom:63,left:8,right:55};


}

Enemy2.prototype = Object.create(Sprite.prototype);

Enemy2.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

};
