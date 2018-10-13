function ChilliEL()
{

    Sprite.call(this);

    this.name = "ChilliEL";
    this.active = true;

    this.animXOffset = 0;
    this.animYOffset = 768;

    this.deadly = false;
    this.animMaxFrame = 1;
    this.rectOffset = {top:16,bottom:63,left:16,right:40};

}

ChilliEL.prototype = Object.create(Sprite.prototype);

ChilliEL.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

}

ChilliEL.prototype.setMoveTargetX = function()
{
    Sprite.prototype.setMoveTargetX.call(this);
}

ChilliEL.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);
}

ChilliEL.prototype.updateMoveAttributesX = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map, player);
}

ChilliEL.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesX.call(this, map);
}
