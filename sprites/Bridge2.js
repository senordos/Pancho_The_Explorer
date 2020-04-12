//
//
//  NOTE: Bridge2 extends _Bridge
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

Bridge2.prototype = Object.create(_Bridge.prototype);
