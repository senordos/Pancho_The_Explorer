//
//
//  Player extends _Sprite.
//
//

function Player()
{
    _Sprite.call(this);

}

Player.prototype = Object.create(_Sprite.prototype);
