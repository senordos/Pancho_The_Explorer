function Bridge1()
{

    _Sprite.call(this);

    this.name = "Bridge1";
    this.animMaxFrame = 1;

    this.deadly = false;

    this.playerOnBridge = false;
    this.fallWaitStartTime = 0;
    this.falling = false;
    this.waitingToFall = false;

    this.animXOffset = 0;
    this.animYOffset = 896;
}

Bridge1.prototype = Object.create(_Bridge.prototype);
