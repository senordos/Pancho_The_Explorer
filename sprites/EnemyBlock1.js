function EnemyBlock1()
{

    Sprite.call(this);

    this.name = "EnemyBlock1";

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xDirection = 0;
    this.yDirection = 0;

    this.image_src = "tiles/spritesheet_Enemies_64.png";

    this.animXOffset = 0;
    this.animYOffset = 640;
    this.animMaxFrame = 1;

}

EnemyBlock1.prototype = Object.create(Sprite.prototype);


EnemyBlock1.prototype.setMoveTargetY = function()
{
    Sprite.prototype.setMoveTargetY.call(this);

    console.log(this.y);

    if (this.yDirection > 0)
    {
      this.ySpeed = this.ySpeed + GRAVITY;
    }
    if (this.ySpeed > 10) {this.ySpeed = 10;}


    this.targetY = this.y + (this.ySpeed * this.yDirection);
}


EnemyBlock1.prototype.updateMoveAttributesY = function (map, player)
{
    Sprite.prototype.updateMoveAttributesY.call(this, map, player);

    if (this.collisionBottom == true)
    {
        this.yDirection = -1;
        this.ySpeed = 2;
    }
    else if (this.y < this.startYPosition)
    {
        this.y = this.startYPosition;
        this.yDirection = 0;
    }
    else if (this.yDirection != 1
          && player.x > this.x - 48
          && player.x < this.x + 48
          && player.y > this.y)
    {
      this.yDirection = 1;
    }

}
