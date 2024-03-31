function InvincibleSphere()
{

    _Sprite.call(this);

    this.name = "InvincibleSphere";
    this.interactsWithWorld = true;
    this.active = true;

    this.animXOffset = 0;
    this.animYOffset = 2432;

    this.deadly = false;
    this.animMaxFrame = 2;
    this.rectOffset = {top:16,bottom:63,left:16,right:40};

}

InvincibleSphere.prototype = Object.create(_Sprite.prototype);
