function RegularBrick()
{

    Brick.call(this);

    this.name = "Regular";


}

RegularBrick.prototype = Object.create(Brick.prototype);

RegularBrick.prototype.init = function()
{
    Brick.prototype.init.call(this);

};
