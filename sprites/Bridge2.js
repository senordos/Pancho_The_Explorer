//
//
//  NOTE: Bridge2 extends Bridge1, not _Sprite.
//
//

function Bridge2()
{
    Bridge1.call(this);

    this.name = "Bridge2";
    this.animXOffset = 64;
    this.animYOffset = 896;
    this.rectOffset = {top:0,  bottom:31, left:0,  right:63};

}

Bridge2.prototype = Object.create(Bridge1.prototype);
