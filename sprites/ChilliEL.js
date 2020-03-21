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
