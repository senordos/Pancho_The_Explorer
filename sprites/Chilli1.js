function Chilli1()
{

    Sprite.call(this);

    this.name = "Chilli1";
    this.active = true;

    this.image_src = "tiles/spritesheet_chilli1.png";

    this.deadly = false;
    this.animMaxFrame = 1;
    this.rectOffset = {top:16,bottom:63,left:16,right:40};

}

Chilli1.prototype = Object.create(Sprite.prototype);

Chilli1.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

}

Chilli1.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);
}

Chilli1.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);
}

Chilli1.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);
}

Chilli1.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map);
}
