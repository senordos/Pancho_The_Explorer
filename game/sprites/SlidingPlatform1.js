function SlidingPlatform1()
{

    _SlidingPlatform.call(this);

    this.name = "SlidingPlatform1";

    this.animXOffset = 128;
    this.animYOffset = 896;
    this.animMaxFrame = 1;

}
SlidingPlatform1.prototype = Object.create(_SlidingPlatform.prototype);
