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
