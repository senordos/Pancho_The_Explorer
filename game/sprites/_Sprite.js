function _Sprite()
{
    this.x = 64;
    this.y = 64;
    this.startXPosition = this.x;
    this.startYPosition = this.y;
    this.h = 64;
    this.w = 64;
    this.targetX = 128;
    this.targetY = 512;
    this.name = "GENERAL SPRITE";
    this.img = "NO_IMAGE";
    this.image_src = "NO_IMAGE_SRC";
    this.health = 3;
    this.lives = 3;
    //this.enemyImage = new Image();
    this.animXOffset = 0;
    this.animYOffset = 0;
    this.animFrame = 0;
    this.animMaxFrame = 4;
    this.xDirection = 1;
    this.yDirection = 1;
    this.groundSpeed = 0; 
    this.startXDirection = this.xDirection;
    this.startYDirection = this.yDirection;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.rotation = 0;

    this.active = true;  //if true, will be processed for movement
    this.positionIsLocked = false; //blocks movement
    this.alive = true;   //if not alive, sprite is effectively removed from level
    this.visible = true; //does the sprite get drawn to the screen
    this.deadly = true;  //if the player hits the sprite, will player get damage
    this.hit = false;    //sprite is hit by something. May become unhit in future
    this.jump = false;
    this.stompable = false;
    this.isInvincible = false; 
    this.invincibleStartTime = null;
    this.invincibleSoundHasPlayed = false; //this is needed to stop the sound repeating each frame.


    //determine if the sprite will collide with the world bricks, or ignore them
    this.interactsWithWorld = true;

    //some attributes just for Enemies
    this.canSeeEdges = true; //determine if the sprite walks off edges, or not. Default is not.
    this.activateIfPlayerXGT = 0;  //if player greater than
    this.activateIfPlayerXLT = 0;  //if player less than
    this.activateIfPlayerYGT = 0;
    this.activateIfPlayerYLT = 0;
    this.delayActivation = 0;



    //for collision detection, these rectangles define the sprite
    this.rectMain = {top:0,bottom:0,left:0,right:0}; //this is generated each frame based on rectOffet below
    this.rectOffset =       {top:0,  bottom:63, left:0,  right:63};
    this.rectTopOffset =    {top:0,  bottom:31, left:8,  right:55};
    this.rectBottomOffset = {top:32, bottom:63, left:8,  right:55};
    this.rectLeftOffset =   {top:19, bottom:43, left:0,  right:19};
    this.rectRightOffset =  {top:19, bottom:43, left:43, right:63};
    this.collisionWidth = 56;
    this.collisionHeight = 64;

    this.collision = false;

    this.collisionTop = false;
    this.collisionBottom = false;
    this.collisionLeft = false;
    this.collisionRight = false;

    this.collisionExit = false;
    this.collisionDeath = false;
    this.collisionClimb = false;



    this.localBricks = {current:0,left:0,right:0,up:0,down:0,leftUp:0,leftDown:0,rightUp:0,rightDown:0,xLinedUp:false,yLinedUp:false};

    this.getBottomCollisionRect = function()
                {
                    var bottomCollisionRect = {
                          top: this.rectBottomOffset.top + this.targetY,
                          bottom: this.rectBottomOffset.bottom + this.targetY,
                          left: this.rectBottomOffset.left + this.targetX,
                          right: this.rectBottomOffset.right + this.targetX
                    };

                    return  bottomCollisionRect;
                },
    this.getTopCollisionRect = function()
                {
                    var topCollisionRect = {
                          top: this.rectTopOffset.top + this.targetY,
                          bottom: this.rectTopOffset.bottom + this.targetY,
                          left: this.rectTopOffset.left + this.targetX,
                          right: this.rectTopOffset.right + this.targetX
                    };

                    return  topCollisionRect;
                },
    this.getLeftCollisionRect = function()
                {
                    var leftCollisionRect = {
                          top: this.rectLeftOffset.top + this.targetY,
                          bottom: this.rectLeftOffset.bottom + this.targetY,
                          left: this.rectLeftOffset.left + this.targetX,
                          right: this.rectLeftOffset.right + this.targetX
                    };

                    return  leftCollisionRect;
                },
    this.getRightCollisionRect = function()
                {
                    var rightCollisionRect = {
                          top: this.rectRightOffset.top + this.targetY,
                          bottom: this.rectRightOffset.bottom + this.targetY,
                          left: this.rectRightOffset.left + this.targetX,
                          right: this.rectRightOffset.right + this.targetX
                    };

                    return  rightCollisionRect;
                },
    this.update = function()
                {

                    if (this.collision.xOverlap !=0)
                    {
                                                        this.x = this.x - this.collision.xOverlap;
                                                        this.collision.xOverlap = 0;
                    }
                    if (this.collision.yOverlap !=0)
                    {
                                                        this.y = this.y - this.collision.yOverlap;
                                                        this.collision.yOverlap = 0;
                    }
                    this.rectMain.top = this.rectOffset.top + this.y;// - this.collision.yOverlap;
                    this.rectMain.bottom = this.rectOffset.bottom + this.y;// - this.collision.yOverlap;
                    this.rectMain.left = this.rectOffset.left + this.x; // - this.collision.xOverlap;
                    this.rectMain.right = this.rectOffset.right + this.x; // - this.collision.xOverlap;

                }

};

_Sprite.prototype.init = function(level_sprite_data)
{

    this.collision = false;

    this.collisionTop = false;
    this.collisionBottom = false;
    this.collisionLeft = false;
    this.collisionRight = false;

    this.collisionExit = false;
    this.collisionDeath = false;
    this.collisionClimb = false;

    this.alive = true;
    this.hit = false;
    this.jump = false;
    this.isInvincible = false;


    this.x = Math.floor(level_sprite_data.x);
    this.y = Math.floor(level_sprite_data.y);
    this.startXPosition = this.x;
    this.startYPosition = this.y;
    this.targetX = this.x;
    this.targetY = this.y;


    if (level_sprite_data.hasOwnProperty('properties'))
    {
      if(level_sprite_data.properties != null)
      {
        if (level_sprite_data.properties.hasOwnProperty('activateIfPlayerXGT'))
        {
          this.activateIfPlayerXGT = Math.floor(level_sprite_data.properties.activateIfPlayerXGT);
        }
        if (level_sprite_data.properties.hasOwnProperty('startXDirection'))
        {
          this.xDirection = Math.floor(level_sprite_data.properties.startXDirection);
        }
        if (level_sprite_data.properties.hasOwnProperty('startYDirection'))
        {
          this.xDirection = Math.floor(level_sprite_data.properties.startYDirection);
        }
        if (level_sprite_data.properties.hasOwnProperty('delayActivation'))
        {
          this.delayActivation = Math.floor(level_sprite_data.properties.delayActivation);
        }
        if (level_sprite_data.properties.hasOwnProperty('canSeeEdges'))
        {
          var edgeText = level_sprite_data.properties.canSeeEdges;
          if (edgeText == "TRUE" || edgeText == "true")
          {
              this.canSeeEdges = true;
          }
          else if (edgeText == "FALSE" || edgeText == "false" )
          {
              this.canSeeEdges = false;
          }
        }
        if (level_sprite_data.properties.hasOwnProperty('maxTravel'))
        {
          this.maxTravel = Math.floor(level_sprite_data.properties.maxTravel);
        }
        if (level_sprite_data.properties.hasOwnProperty('positionIsLocked'))
        {
            var lockedText = level_sprite_data.properties.positionIsLocked;
            if (lockedText == "TRUE" || lockedText == "true")
            {
              this.positionIsLocked = true;
            }
            else
            {
              this.positionIsLocked = false;
            }
        }
      }
    }

    var xAlignGap = this.x % 64;
    var yAlignGap = this.y % 64;

    if ( xAlignGap > 32 ) { this.x = this.x + (64 - xAlignGap); }
    else                  { this.x = this.x - xAlignGap; }

    if ( yAlignGap > 32 ) { this.y = this.y + (64 - yAlignGap); }
    else                  { this.y = this.y - yAlignGap; }
};

_Sprite.prototype.getCollisionRect = function()
{
    var collisionRect =
    {
          top:    this.rectOffset.top    + this.targetY,
          bottom: this.rectOffset.bottom + this.targetY,
          left:   this.rectOffset.left   + this.targetX,
          right:  this.rectOffset.right  + this.targetX
    };

    return  collisionRect;
};

_Sprite.prototype.setMoveTargetX = function()
{
    this.targetX = this.x;
    this.targetY = this.y;
}

_Sprite.prototype.setMoveTargetY = function()
{
    this.targetX = this.x;
    this.targetY = this.y;
}

_Sprite.prototype.updateActions = function()
{
    if ( this.isInvincible )
    {
      var date = new Date();
      if ( (date - this.invincibleStartTime) / 1000 > 5 ) // 5 seconds of invincibility
      {
        this.isInvincible = false;
      }
    }
    return null;
}

_Sprite.prototype.updateMoveAttributesX = function(map, otherSprite)
{
  var distance = this.x - otherSprite.x;
  if (this.active != true)
  {
    if ( this.activateIfPlayerXGT !== undefined )
    {
        if ( this.activateIfPlayerXGT > 0 && otherSprite.x > this.activateIfPlayerXGT )
        {
            this.active = true;
        }
        else if ( this.activateIfPlayerXGT == 0 )
        {
            this.active = true;
        }
    }
  }
}



_Sprite.prototype.updateMoveAttributesY = function(map, otherSprite)
{
    //Do nothing
}

_Sprite.prototype.updateAttributesAfterStomped = function(map, otherSprite)
{
    //Do nothing
}

_Sprite.prototype.getDrawYCoord = function(gameFrame)
{
    return 0;
}

_Sprite.prototype.getDrawXCoord = function(gameFrame)
{

    return (gameFrame % this.animMaxFrame) * 64 + this.animXOffset;
}

_Sprite.prototype.checkPlayerCollision = function(otherSprite)
{
    if (intersectRect(otherSprite.getCollisionRect(), this.getCollisionRect()))
    {
      return true;
    }
    return false;
}

_Sprite.prototype.getCollisionEvent = function(otherSprite)
{
    if (this.checkPlayerCollision(otherSprite))
    {
      //default collision behaviour if method not overridden.
      //acts like a basic enemy
      var colevt = new CollisionEvent();
      colevt.name = this.name;
      colevt.collision = true;

      if(this.deadly)
      {
        if (intersectRect(otherSprite.getBottomCollisionRect(), this.getTopCollisionRect())
            && this.hit == false)
            //&& player.ySpeed > 0)
        {
          //if object is killed by player jumping on top of them
          this.hit = true;

          colevt.enemyHit = true;
          colevt.playerHit = false;
        }
        else
        {
            //Else the player is hit
            colevt.enemyHit = false;
            colevt.playerHit = true;
        }
      }
      return colevt;
    }
    return false;
}

_Sprite.prototype.startInvincibility = function()
{
    this.isInvincible = true;
    var date = new Date();
    this.invincibleStartTime = date.getTime();
}

