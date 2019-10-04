function Chilli1()
{

    Sprite.call(this);

    this.name = "Chilli1";
    this.active = true;

    this.image_src = "tiles/spritesheet_chilli1.png";
    this.animXOffset = 0;
    this.animYOffset = 832;

    this.deadly = false;
    this.animMaxFrame = 1;
    this.rectOffset = {top:16,bottom:63,left:16,right:40};

}

Chilli1.prototype = Object.create(Sprite.prototype);
