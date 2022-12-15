function Brick()
{
    this.image_src = "NO_SPRITE_SHEET";
    this.name = "Brick";
    this.x = 0;
    this.y = 0;
    this.type = 0;
    this.tileName = "NO_TILE_NAME";
    this.deadly = false;
    this.exit = false;
    this.moveable = false;
    this.blocker = true; //will the tile block player or baddy movement
    this.enemyBoundary = false; //if set, this will block enemies, but not the player
    this.hit = false;
    this.isBackground = false;

    this.spritesheetPosX = 0;
    this.spritesheetPosY = 0;
}


Brick.prototype.init = function()
{

};
