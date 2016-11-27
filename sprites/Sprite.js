function Sprite()
{ 
    this.x = 64;
    this.y = 64;
    this.h = 64;
    this.w = 64;
    this.targetX = 128;
    this.targetY = 512;
    this.name = "GENERAL SPRITE"; 
    this.img = "NO_IMAGE"; 
    this.image_src = "HELLO";
    this.enemyImage = new Image();
    this.animFrame = 0;
    this.xDirection = 1;
    this.yDirection = 1;
    this.xSpeed = 0; 
    this.ySpeed = 0;
    this.rotation = 0;

    //for collision detection, these rectangles define the player
    this.rectMain = {top:0,bottom:0,left:0,right:0};
    this.rectOffset = {top:0,bottom:63,left:0,right:63};
    this.rectTopOffset = {top:0,bottom:19,left:7,right:55};
    this.rectBottomOffset = {top:43,bottom:63,left:8,right:56};
    this.rectLeftOffset = {top:19,bottom:43,left:0,right:19};
    this.rectRightOffset = {top:19,bottom:43,left:43,right:63};
    this.collisionWidth = 56;    
    this.collisionHeight = 64;
    
    this.collision = false;

    this.collisionTop = false; 
    this.collisionBottom = false;
    this.collisionLeft = false; 
    this.collisionRight = false;

    this.collisionExit = false;
    this.collisionDeath = false;

    this.alive = true; 
    this.deadly = true;
    this.hit = false; //sprite is hit by something
    this.jump = false;

    this.localBricks = {current:0,left:0,right:0,up:0,down:0,leftUp:0,leftDown:0,rightUp:0,rightDown:0,xLinedUp:false,yLinedUp:false};

/*                
    this.getCollisionRect = function()
                {
                    var collisionRect = {
                          top: this.rectOffset.top + this.targetY,
                          bottom: this.rectOffset.bottom + this.targetY,
                          left: this.rectOffset.left + this.targetX,
                          right: this.rectOffset.right + this.targetX
                    };

                    return  collisionRect;
                },
*/

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

Sprite.prototype.init = function(level_sprite_data)
{
    this.enemyImage = new Image();
    this.enemyImage.src = this.image_src;

};

Sprite.prototype.getCollisionRect = function()
{
    var collisionRect = {
          top: this.rectOffset.top + this.targetY,
          bottom: this.rectOffset.bottom + this.targetY,
          left: this.rectOffset.left + this.targetX,
          right: this.rectOffset.right + this.targetX
    };

    return  collisionRect;
};