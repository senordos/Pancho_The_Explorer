function Enemy3()
{

    Sprite.call(this);

    console.log("Enemy3 Constructor");
    this.name = "Enemy3";
    this.image_src = "tiles/spritesheet_enemy3.png";

}

Enemy3.prototype = Object.create(Sprite.prototype);

Enemy3.prototype.init = function(level_sprite_data)
{
    Sprite.prototype.init.call(this, level_sprite_data);

    if ( level_sprite_data.properties !== undefined &&
         level_sprite_data.properties.startXDirection !== undefined &&
         level_sprite_data.properties.startYDirection !== undefined &&
         level_sprite_data.properties.rotation !== undefined )
    {

        this.xDirection = level_sprite_data.properties.startXDirection;
        this.yDirection = level_sprite_data.properties.startYDirection;
        this.rotation = level_sprite_data.properties.rotation;

    }
    else
    {
        //X and Y direction will be defaults.
        console.log("Enemy[] - Enemy3 - properties undefined for startXDirection / startYDirection / rotation")                                                
    }
    
};
