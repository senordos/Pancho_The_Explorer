function SlidingPlatform1()
{

    _SlidingPlatform.call(this);

    this.name = "SlidingPlatform1";

    this.animXOffset = 0;
    this.animYOffset = 640;
    this.animMaxFrame = 1;

}
SlidingPlatform1.prototype = Object.create(_SlidingPlatform.prototype);
