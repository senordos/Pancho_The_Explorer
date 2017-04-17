


const CANVASWIDTH = 1024;
const CANVASHEIGHT = 768;

var gameSound = true; //start the game with the sounds enabled

var heightRatio = window.innerHeight / CANVASHEIGHT;
if (heightRatio > 1) { heightRatio = 1 };


var SCALE = heightRatio; ///size to scale to fit screen


var SCALEDCANVASWIDTH = Math.floor(CANVASWIDTH * SCALE);
var SCALEDCANVASHEIGHT = Math.floor(CANVASHEIGHT * SCALE);

//not sure this is the right calculation!
var margin = Math.floor((window.innerWidth - SCALEDCANVASWIDTH) / 2);

var landscape = true;
if (window.innerHeight < window.innerWidth) { landscape = true; } else { landscape = false; };


function button_startGameClicked()
{
    //Turn introScreen off and gameCanvas on
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

}

function button_toggleSoundClicked()
{
    //toggle the sound on or off
    if ( document.getElementById("soundOff").style.display == "none" )
    {
        document.getElementById("soundOn").style.display = "none";
        document.getElementById("soundOff").style.display = "block";

        gameSound = false;
    }
    else
    {

        document.getElementById("soundOn").style.display = "block";
        document.getElementById("soundOff").style.display = "none";

        gameSound = true;

    }
    //sound.play();

}




function onWindowResize()
{
    heightRatio = window.innerHeight / CANVASHEIGHT;
    if (heightRatio > 1) { heightRatio = 1 };

    SCALE = heightRatio; ///size to scale to fit screen

    SCALEDCANVASWIDTH = Math.floor(CANVASWIDTH * SCALE);
    SCALEDCANVASHEIGHT = Math.floor(CANVASHEIGHT * SCALE);

    margin = Math.floor((window.innerWidth - SCALEDCANVASWIDTH) / 2);


    if (window.innerHeight < window.innerWidth) { landscape = true; } else { landscape = false; };

    document.getElementById("gameCanvas").setAttribute("width", SCALEDCANVASWIDTH);
    document.getElementById("gameCanvas").setAttribute("height", SCALEDCANVASHEIGHT);

    ctx.scale(SCALE,SCALE);

}


//initialise the sound





try
{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.audioContext = new window.AudioContext();
} catch (e)
{
    console.log("No Web Audio support");
}


var soundJump, soundStomp, musicLevel0;

soundJump = new WebAudioAPISound("sounds/jump.wav");
soundStomp = new WebAudioAPISound("sounds/stomp.wav");
musicLevel0 = new WebAudioAPISound("sounds/music_platformer2.mp3",{loop: true});
musicLevel0.setVolume(20);

setTimeout(function(){ musicLevel0.play(); }, 3000);




document.getElementById("gameCanvas").setAttribute("width", SCALEDCANVASWIDTH);
document.getElementById("gameCanvas").setAttribute("height", SCALEDCANVASHEIGHT);

window.addEventListener("resize", onWindowResize);



var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");


var buffer = document.createElement('canvas');
buffer.width = 1024;
buffer.height = 768;
var bctx = buffer.getContext('2d');

//bctx.scale(0.,0.50);
ctx.scale(SCALE,SCALE);




var touchable = 'createTouch' in document;
if(touchable)
{
	canvas.addEventListener( 'touchstart', onTouchStart, false );
	canvas.addEventListener( 'touchmove', onTouchMove, false );
	canvas.addEventListener( 'touchend', onTouchEnd, false );
}
var touches = [];
var t = 0;


var pps = 500; //pixels movement per second
var dx = 2;
var dy = -2;

var framerate;
var timeindex=0;
var counter=0;
var lastTimeIndex=0;
var gameFrame=0;
var gameTimeInFrame=0;

var level = 0; //current level, beginning at 0.
var maxlevel = 5; //the last level, after which you win.

var gameState = "PLAYING";
var gamePaused=false;
var levelComplete=false;
var playerDied=false;

var cheatmode = false;


bctx.font = "30px Arial";

const PADDLEWIDTH=5;
const PADDLEHEIGHT=30;
const PADDLEMOVEMENT=3;
const PADDLESTARTXGAP=20;
const PLAYERJUMP= -28;

const GRAVITY = 2.5;

var paddle1_X=PADDLESTARTXGAP;
var paddle1_Y=canvas.height/2;

var paddle2_X=canvas.width-PADDLESTARTXGAP-PADDLEWIDTH;
var paddle2_Y=canvas.height/2;

var mapOffsetX = 0;
var mapOffsetY = 0;

var player1_UpPressed=false;
var player1_DownPressed=false;
var player1_LeftPressed=false;
var player1_RightPressed=false;

var player2_UpPressed=false;
var player2_DownPressed=false;

var bricks = [];

var compareRect = [];


const BALLRADIUS = 5;
const BALLDIAMETER = BALLRADIUS * 2;

const ANIMATIONSPEED = 125;

//to build bricks to shape the level
const BRICKCOLS = 60;
const BRICKROWS = 40;
const BRICKCOUNT = BRICKROWS * BRICKCOLS;
const BRICKHEIGHT = 64;
const BRICKWIDTH = 64;
const BRICKSTARTX = 0;
const BRICKSTARTY = 0;

const SPRITESTARTCORRECTIONX = 0;
const SPRITESTARTCORRECTIONY = -64;


//game debug variables
var showTargetRect = false;


tiles = new Image();
tiles.src = "tiles/platform_tiles.png";


var titletextbox = new Textbox(0,0,1024,64,"PANCHO THE EXPLORER","CENTRE");
var messagebox = new Textbox(0,672, 1024, 64, "", "CENTRE" );
var versionbox = new Textbox(0,600, 1024, 64, "ONLINE ALPHA     TECH DEMO", "CENTRE" );





var player1;
var enemies = [];


var touch = { x:0, y:0, type:"NONE", id:0 };

var touchButtons = {  left:{pressed:false, touchId:-1},
                      right:{pressed:false, touchId:-1},
                      up:{pressed:false, touchId:-1},
                      resetlevel:{pressed:false, touchId:-1}
                    }


var gameloopStart;
var gameloopEnd;





function setAttributes(elem, obj)
{
    for (var prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            elem[prop] = obj[prop];
        }
    }
}





function initBricks()
{

    //test sounds
    //music = new Audio('sounds/music_level1.wav');
    //music.onended=function(){ music.play(); };
    //music.play();




    var i = 0; //array counter
    var a = 0; //array x
    var b = 0; //array y
    var x = 0; //target brick x
    var y = 0; //target brick y
    var p = 0; //Position in the level array
    var c = 0; //the type of the brick
    var rectMain; //to be the collision rectangle
    var tileName;

    maxlevel = levels.length - 1;

    enemies = [];

    for (var l=0; l < levels[level].layers.length; l++)
    {
        if (levels[level].layers[l].name == "Map")
        {
            level1 = levels[level].layers[l].data;
        }

        if (levels[level].layers[l].name == "Objects")
        {
            var enemyCounter = 0;

            for (var o=0; o < levels[level].layers[l].objects.length; o++)
            {

                if (levels[level].layers[l].objects[o].name == "Player")
                {
                    player1 = new Sprite();
                    setAttributes(player1, {
                        name:"Player1",
                        img:"tiles/spritesheet_player.png",
                        image_src:"tiles/spritesheet_player.png",
                        rectOffset:{top:0,bottom:63,left:8,right:55}
                        });

                    player1.init(levels[level].layers[l].objects[o]);

                }
                if (levels[level].layers[l].objects[o].name == "Enemy1")
                {
                    enemies[enemyCounter] = new Enemy1();
                    enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
                    enemyCounter++;

                }
                if (levels[level].layers[l].objects[o].name == "Enemy2")
                {
                    enemies[enemyCounter] = new Enemy2();
                    enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
                    enemyCounter++;
                }

                if (levels[level].layers[l].objects[o].name == "Enemy3")
                {
                    enemies[enemyCounter] = new Enemy3();
                    enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
                    enemyCounter++;

                }
               if (levels[level].layers[l].objects[o].name == "Bridge1")
                {
                    enemies[enemyCounter] = new Bridge1();
                    enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
                    enemyCounter++;

                }



            }
        }
    }


    //Due to the level editor being used, sprite start positions may not be as expected.
    //Game engine requires that all rendering starts in the top left corner, so positions are updated here to compensate if necessary
    for (e=0; e < enemies.length; e++)
    {
        enemies[e].x = enemies[e].x + SPRITESTARTCORRECTIONX;
        enemies[e].y = enemies[e].y + SPRITESTARTCORRECTIONY;
    }

    player1.x = player1.x + SPRITESTARTCORRECTIONX;
    player1.y = player1.y + SPRITESTARTCORRECTIONY;
    //end of sprite update.





    levelPlatformData = levels[level].layers[0].data;


    i = 0;

    var nB; //New Brick

    //set the brick positions
    for (b=0; b < BRICKROWS; b++){
      for (a=0; a < BRICKCOLS; a++){

          p = b * BRICKCOLS + a;

          x = BRICKSTARTX + (a * BRICKWIDTH);
          y = BRICKSTARTY + (b * BRICKHEIGHT);



          switch(levelPlatformData[i])
          {

            case 1:  nB = new Brick();   nB.tileName="rock1";   nB.rectMain = {top:y+16, bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:0};   nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 2:  nB = new Brick();   nB.tileName="exit1";   nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:64};  nB.deadly = false; nB.exit=true;  nB.moveable=false; break;
            case 3:  nB = new Brick();   nB.tileName="exit2";   nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:128}; nB.deadly = false; nB.exit=true;  nB.moveable=false; break;
            case 4:  nB = new Brick();   nB.tileName="dirt1";   nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:192}; nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 5:  nB = new Brick();   nB.tileName="brick1";  nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:256}; nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 6:  nB = new Brick();   nB.tileName="spikes1"; nB.rectMain = {top:y+32, bottom:y+63, left:x+8, right:x+55}; nB.spritesheetPos = {x:0,y:320}; nB.deadly = true;  nB.exit=false; nB.moveable=false; break;
            case 7:  nB = new Brick();   nB.tileName="stone2";  nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:384}; nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 8:  nB = new Brick();   nB.tileName="stone3";  nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:448}; nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 9:  nB = new Brick();   nB.tileName="stone4";  nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:512}; nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 10: nB = new Brick();   nB.tileName="stone4";  nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:576}; nB.deadly = false; nB.exit=false; nB.moveable=false; break;
            case 11: nB = new Bridge1(); nB.tileName="bridge1"; nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:640}; nB.deadly = false; nB.exit=false; nB.moveable=true;  break;
            default: nB = new Brick();   nB.tileName="none";    nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63}; nB.spritesheetPos = {x:0,y:0};   nB.deadly = false; nB.exit=false; nB.moveable=false; break;

          }

          nB.x = x;
          nB.y = y;
          nB.type = level1[p];

          bricks[i] = nB;

          i++;
      }
    }
}





function intersectRect(r1, r2)
{

  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}


function setLocalBricks(sprite)
{
    currentBrick = Math.floor((((sprite.x + 32) / 64) + (Math.floor(((sprite.y + 32 + 64) / 64))-1) * BRICKCOLS));

    //how will this work if the sprites are moving more than one pixel at a time!
    if (((sprite.x) % 64) == 0) { sprite.localBricks.xLinedUp = true } else { sprite.localBricks.xLinedUp = false };
    if (((sprite.y) % 64) == 0) { sprite.localBricks.yLinedUp = true } else { sprite.localBricks.yLinedUp = false };



    sprite.localBricks.current = currentBrick;
    sprite.localBricks.left = currentBrick - 1;
    sprite.localBricks.right = currentBrick + 1;
    sprite.localBricks.up = currentBrick - BRICKCOLS;
    sprite.localBricks.down = currentBrick + BRICKCOLS;

    sprite.localBricks.leftUp = currentBrick - BRICKCOLS - 1;
    sprite.localBricks.leftDown = currentBrick + BRICKCOLS - 1;
    sprite.localBricks.rightUp = currentBrick - BRICKCOLS + 1;
    sprite.localBricks.rightDown = currentBrick + BRICKCOLS + 1;


}


function checkWorldCollisions(sprite)
{

    //Checks a sprite's targetX and targetY positions for collisions

    //First, reset the sprite's collision array
    //As this will be called separately for X and Y movement, this needs to be reset separately
    if(sprite.targetX != sprite.x)
    {
        //moving in X axis
        sprite.collisionLeft = false;
        sprite.collisionRight = false;
    }

    if(sprite.targetY != sprite.y)
    {
        //moving in Y axis
        sprite.collisionTop = false;
        sprite.collisionBottom = false;
    }



    spriteTargetRect=sprite.getCollisionRect();

    if (showTargetRect)
    {
          bctx.beginPath();
          bctx.rect( spriteTargetRect.left,
                    spriteTargetRect.top,
                    spriteTargetRect.right - spriteTargetRect.left,
                    spriteTargetRect.bottom - spriteTargetRect.top);

          bctx.fillStyle = "#fffaaa";
          bctx.fill();
          bctx.closePath();

    }



    var i = 0;
    for (i=0; i < BRICKCOUNT; i++)
    {
        if(bricks[i].type > 0)
        {
            if (intersectRect(spriteTargetRect, bricks[i].rectMain))
            {
                bricks[i].hit = true;

                if(sprite.targetX > sprite.x)
                {
                    //All sprites are animated from the top left corner, so need to add the width when moving right
                    sprite.targetX = bricks[i].rectMain.left - sprite.collisionWidth;

                }
                else if(sprite.targetX < sprite.x)
                {
                    //the player is moving left

                    //All sprites are animated from the top left corner, so brick right + 1 is correct
                    sprite.targetX = bricks[i].rectMain.right - 7;

                }

                if(sprite.targetY > sprite.y)
                {
                    //if the y target is higher - so moving down

                    //All sprites are animated from the top left corner, so need to add the hight when moving down
                    sprite.targetY = bricks[i].rectMain.top - sprite.collisionHeight;

                    //If moving down, the collision must be below, so set collision parameter
                    sprite.collisionBottom = true;

                }

                else if(sprite.targetY < sprite.y)
                {
                    //the player is moving up

                    //All sprites are animated from the top left corner, so brick bottom + 1 is correct
                    sprite.targetY = bricks[i].rectMain.bottom + 1;

                    sprite.collisionTop = true;
                }

                if(bricks[i].exit == true)
                {
                    sprite.collisionExit = true;
                    console.log("Collision - Exit");
                }
                else if (bricks[i].deadly == true)
                {
                    sprite.collisionDeath = true;
                    console.log("Collision - deadly tile: " + bricks[i].tileName);
                }

                sprite.collision = true;
                return true;
            }

        }

    }

    sprite.collision = false;
    return false;
}


function checkEnemyCollisions(playerSprite)
{

    //when looping through all the sprites, use "name" to check the sprite being checked isn't "this" sprites

    //get the Rect for this sprite
        //Build a rectangle based on the overall sprite's collision offset
    var playerRect = playerSprite.getCollisionRect();
    var playerTopRect = playerSprite.getTopCollisionRect();
    var playerBottomRect = playerSprite.getBottomCollisionRect();
    var playerLeftRect = playerSprite.getLeftCollisionRect();
    var playerRightRect = playerSprite.getRightCollisionRect();

    for (i=0; i < enemies.length; i++)
    {
        var enemyRect = enemies[i].getCollisionRect();
        var enemyTopRect = enemies[i].getTopCollisionRect();


        if (intersectRect(playerRect, enemyRect) && enemies[i].name == "Bridge1")
        {

            console.log("HIT BRIDGE");
            // Has hit a bridge



            if (intersectRect(playerBottomRect, enemyTopRect))
            {
                //Start the bridge falling
                enemies[i].hit = true;
                enemies[i].yDirection = 1;
                enemies[i].ySpeed = 1;

                playerSprite.yDirection = 0;
                playerSprite.y = enemies[i].y - playerSprite.collisionHeight;
                playerSprite.collisionBottom = true;
            }
            else if (intersectRect(playerTopRect, enemyRect))
            {
                playerSprite.yDirection = 0;
                playerSprite.y = enemies[i].y + enemies[i].collisionHeight;
                playerSprite.collisionTop = true;
            }
            else if (intersectRect(playerLeftRect, enemyRect))
            {
                playerSprite.xDirection = 0;
                playerSprite.x = enemies[i].x + playerSprite.collisionWidth;
                playerSprite.collisionLeft = true;
            }
            else if (intersectRect(playerRightRect, enemyRect))
            {
                playerSprite.xDirection = 0;
                playerSprite.x = enemies[i].x - playerSprite.collisionWidth;
                playerSprite.collisionRight = true;
            }

        }

        if (intersectRect(playerRect, enemyRect) && enemies[i].name == "Enemy3")
        {
            //Enemy3 cannot be killed.
            playerSprite.hit = true;
        }



        if(intersectRect(playerRect, enemyRect) && enemies[i].deadly == true)
        {

            if(intersectRect(playerBottomRect, enemyTopRect) && enemies[i].hit == false)
            {


                //player on top of enemy

                enemies[i].hit = true;
                enemies[i].deadly = false;
                enemies[i].xSpeed = 3;
                enemies[i].xDirection = enemies[i].xDirection * -1;

                soundJump.play();
                playerSprite.yDirection = PLAYERJUMP - 4;



            }
            else
            {

                //player hit by enemy
                playerSprite.hit = true;

            }



        }
    }
}





function movePlayerX()
{

    //reset the player targets before moving.
    player1.targetX = player1.x;
    player1.targetY = player1.y;





    if(player1_LeftPressed)
    {
        player1.xSpeed = player1.xSpeed - 0.1;
        if (player1.xSpeed < -1) { player1.xSpeed = -1; }
        player1.xDirection = -1;
    }
    else if(player1_RightPressed)
    {
        player1.xSpeed = player1.xSpeed + 0.1;
        if (player1.xSpeed > 1) { player1.xSpeed = 1; }
        player1.xDirection = 1;
    }
    else
    {
        //player needs to slow down and stop
        if (player1.xSpeed > 0)
        {
            player1.xSpeed = player1.xSpeed -0.1;
            //due to rounding issues in binary
            if (player1.xSpeed > 0 && player1.xSpeed < 0.1) {player1.xSpeed = 0};
        }
        else if (player1.xSpeed < 0)
        {
            player1.xSpeed = player1.xSpeed +0.1;
            //due to rounding issues in binary
            if (player1.xSpeed < 0 && player1.xSpeed > -0.1) {player1.xSpeed = 0};
        }
    }
    player1.targetX = player1.x + (pixelmove * player1.xSpeed);

    checkWorldCollisions(player1);
    player1.x = player1.targetX;

   // console.log(player1.xSpeed);

}

function movePlayerY()
{



    //reset the player targets before moving.
    player1.targetX = player1.x;
    player1.targetY = player1.y;


    if(player1_UpPressed && player1.collisionBottom)
    {
      soundJump.play();

      player1.yDirection = PLAYERJUMP;
      player1.targetY = player1.y + player1.yDirection;

    }
    else
    {
        player1.yDirection = player1.yDirection + GRAVITY;
        if (player1.yDirection > 20) {player1.yDirection = 20;}
        player1.targetY = player1.y + player1.yDirection;
    }

    if (checkWorldCollisions(player1))
    {
        player1.yDirection = 0;
    }

    player1.targetY = Math.floor(player1.targetY);
    if (player1.targetY < 0)
    {
        player1.y = 0
    }
    else
    {
        player1.y = player1.targetY;
    }

}


function moveEnemiesY()
{
    //1. Set target movement
    //2. Check target for collisions
    //3. Correct target if necessary
    //4. Set new position
    //5. Update sprite attributes based on collision or not and new position


    for(i=0; i < enemies.length; i++)
    {

        // 1 //
        enemies[i].setMoveTargetY();


        // 2 & 3 //
        checkWorldCollisions(enemies[i]);


        // 4 //
        enemies[i].y = enemies[i].targetY;


        // 5 //
        setLocalBricks(enemies[i]);

        enemies[i].updateMoveAttributesY(bricks);
    }
}

function moveEnemiesX()
{
    //1. Set target movement
    //2. Check target for collisions
    //3. Correct target if necessary
    //4. Set new position
    //5. Update sprite attributes based on collision or not and new position


    for(i=0; i < enemies.length; i++)
    {

        // 1 //
        enemies[i].setMoveTargetX();



        // 2 & 3 //
        checkWorldCollisions(enemies[i]);


        // 4 //
        enemies[i].x = enemies[i].targetX;


        // 5 //
        setLocalBricks(enemies[i]);

        enemies[i].updateMoveAttributesX(bricks);


    }
}



function drawBricks(){

    var image;

    if (player1.x - mapOffsetX > 576) { mapOffsetX = player1.x - 576; }
    if (player1.x - mapOffsetX < 320) { mapOffsetX = player1.x - 320; }
    if (mapOffsetX < 0) { mapOffsetX = 0; }
    if (player1.y - mapOffsetY > 448) { mapOffsetY = player1.y - 448; }
    if (player1.y - mapOffsetY < 256) { mapOffsetY = player1.y - 256; }
    if (mapOffsetY < 0) { mapOffsetY = 0; }




    for (i=0; i < BRICKCOUNT; i++){
        if(bricks[i].type != 0){

            if (bricks[i].tileName != "none")
            {
               bctx.drawImage(tiles, bricks[i].spritesheetPos.x, bricks[i].spritesheetPos.y, 64, 64, bricks[i].x - mapOffsetX, bricks[i].y - mapOffsetY, 64, 64);
            }
        }

    }

}

function drawRect(rect, sprite, colour)
{
      bctx.beginPath();
      bctx.rect( sprite.x + rect.left,
                sprite.y + rect.top,
                rect.right - rect.left,
                rect.bottom - rect.top);

      bctx.fillStyle = colour;
      bctx.fill();
      bctx.closePath();
}

function drawPlayer()
{
   var animXOffset = 0;
   var animYOffset = 0;

    if(player1.xDirection == -1)
    {
        animYOffset = 64;
    }
    else if(player1.xDirection == 1)
    {
        animYOffset = 0;
    }


   if(player1_LeftPressed)
   {
        animYOffset = 64;
        //animXOffset = player1.animFrame=gameFrame * 64;
        animXOffset = (gameFrame % 5) * 64;
   }

   if(player1_RightPressed)
   {
        animYOffset = 0;
        //animXOffset = player1.animFrame=gameFrame * 64;
        animXOffset = (gameFrame % 5) * 64;
   }

   bctx.drawImage(player1.image, animXOffset,animYOffset,64,64, player1.x - mapOffsetX, player1.y - mapOffsetY,64,64);
}


function drawEnemies()
{

   for(i=0; i < enemies.length; i++)
   {
       var animXOffset = 0;
       var animYOffset = 0;


       if (enemies[i].name == "Enemy1" || enemies[i].name == "Enemy2" )
       {
           if (enemies[i].hit == true)
           {
               animYOffset = 64;
           }
       }
       if (enemies[i].name == "Enemy3" )
       {
           var e = enemies[i];

                if (e.rotation == 0) { animYOffset = 0; }
           else if (e.rotation == 90) { animYOffset = 64; }
           else if (e.rotation == 180) { animYOffset = 128; }
           else if (e.rotation == 270) { animYOffset = 192; }
           else { animYOffset == 0; }


       }

       //sets position in the spritesheet
       //the 4 is because there are only 4 animations in the enemy
       animXOffset = (gameFrame % enemies[i].animMaxFrame) * 64;

       bctx.drawImage(enemies[i].image, animXOffset, animYOffset,64,64, enemies[i].x - mapOffsetX, enemies[i].y - mapOffsetY,64,64);
   }
}

function drawControls()
{
    controls = new Image();
    controls.src = "tiles/spritesheet_controls.png";

    if (gameState == "PLAYING")
    {
        bctx.drawImage(controls,   0, 0, 64, 64, 32,  672, 64, 64);
        bctx.drawImage(controls,  64, 0, 64, 64, 128, 672, 64, 64);
        bctx.drawImage(controls, 128, 0, 64, 64, 928, 672, 64, 64);
    }
    else if (gameState == "PAUSED")
    {
        ctx.drawImage(controls, 192, 0, 64, 64, 928, 672, 64, 64);
    }


}


function calculateFrameRate() {
    var d = new Date();
    var n = d.getTime();

    counter++;

    if ((n - timeindex) > 1000){

      framerate = counter;
      counter=0;
      timeindex = n;

    }
    bctx.fillStyle = "#000000";

    bctx.fillText(framerate,10,50);

}



function gameLoop()
{


    var date = new Date();
    var text;
    gameloopStart = date.getTime();


    text = gameloopStart - gameloopEnd;
    //console.log("Loop Wait Time = " + text);

    if (!landscape)
    {
       ctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH);
       messagebox.setText("PLEASE ROTATE DEVICE");
       messagebox.draw(ctx);

    }
    else
    {
        if (!gamePaused && !levelComplete && !playerDied)
        {
            var loopTimeIndex = date.getTime();




            loopTimeGap = loopTimeIndex - lastTimeIndex;
            lastTimeIndex = loopTimeIndex;

            gameTimeInFrame = gameTimeInFrame + loopTimeGap;

            if(gameTimeInFrame > ANIMATIONSPEED)
            {
                gameTimeInFrame = 0;
                gameFrame = gameFrame + 1;
                if (gameFrame > 19)
                {
                    gameFrame=0;
                }
            }



            //can optimise this and only erase and redraw the parts which change.
            bctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
            ctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH);


            pixelmove = Math.trunc(pps * (loopTimeGap / 1000));
                    bctx.fillStyle = "#ffffff";

            bctx.fillText(Math.round(pixelmove),75,50);

            if (pixelmove > 10)
            {
                bctx.fillStyle = "#ffffff";
                bctx.fillText("Frame rate dropped below normal game operation!",150,50);
            }



            moveEnemiesX();
            moveEnemiesY();



            movePlayerX();
            movePlayerY();

            checkEnemyCollisions(player1);



            if (player1.collisionExit == true)
            {
                levelComplete = true;
            }

            drawBricks();
            drawEnemies();  //and other sprites
            drawPlayer();
            if (true) { drawControls(); }

            if(level == 0)
            {
                titletextbox.draw(bctx);
                versionbox.draw(bctx);
            }

            calculateFrameRate();


            if (! cheatmode)
            {
                if (player1.hit)
                {
                    gamePaused = true;
                    gameState = "PAUSED";
                    playerDied = true;
                }
                else if (player1.collisionDeath == true)
                {
                    gamePaused = true;
                    gameState = "PAUSED";
                    playerDied = true;
                }
            }
            else
            {
                //cheatmode is on
                playerDied = false;
                player1.hit = false;
                player1.collisionDeath = false;

                bctx.fillStyle = "#AAAAAA";
                bctx.fillText("Cheat Mode On", 100, 50);
            }


            ctx.drawImage(buffer, 0, 0, 1024, 768, 0, 0, 1024, 768);

        }
        else if (playerDied == true)
        {
            var text = "Oooops";
            if (player1.collisionDeath) { titletextbox.setText("CAREFUL WHERE YOU STAND"); }
            if (player1.hit)            { titletextbox.setText("WATCH OUT FOR THE BADDIES"); }

            titletextbox.draw(ctx);
            playerDied = false;

            messagebox.setText("PRESS R TO RESET LEVEL");
            messagebox.draw(ctx);

            if (true) { drawControls(); }


        }
        else if (levelComplete == true)
        {
            level++;
            levelComplete = false;
            if ( level <= maxlevel )
            {

                initBricks();
            }
            else
            {
                gamePaused = true;

                titletextbox.setText("WELL DONE   GAME COMPLETED");
                titletextbox.draw(ctx);

            }


        }

    //end landscape check
    }

    var date2 = new Date();

    gameloopEnd = date2.getTime();


    text = gameloopEnd - gameloopStart;

    //console.log("Loop Time = " + text);

}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
    switch(e.keyCode)
    {
      case 37: player1_LeftPressed = true; break;
      case 38: player1_UpPressed = true; break;
      case 39: player1_RightPressed = true; break;
      case 40: player1_DownPressed = true; break;

    }
}

function keyUpHandler(e)
{
    switch(e.keyCode)
    {
      case 37: player1_LeftPressed = false; break;
      case 38: player1_UpPressed = false; break;
      case 39: player1_RightPressed = false; break;
      case 40: player1_DownPressed = false; break;
      case 67: /* c */ if (cheatmode == false) {cheatmode=true;} else {cheatmode=false;};break;
      case 84: /* t */ if (showTargetRect == false) {showTargetRect=true;} else {showTargetRect=false;}; break;
      case 80: /* p */ if (gamePaused == false) { gamePaused = true;} else {gamePaused=false;}; break;
      case 82: /* r */ initBricks(); gamePaused=false; gameState = "PLAYING"; break;
    }
}

function onTouchStart(event) {
	//do stuff
    var x;
    var y;
    var id;

    var iMax = event.changedTouches.length;


    for(var i=0; i<iMax; i++)
    {

        x = event.changedTouches[i].clientX;
        y = event.changedTouches[i].clientY;
        id = event.changedTouches[i].identifier;

        if (gameState == "PLAYING")
        {
            if (x>(16 * SCALE + margin) &&  x<(112 * SCALE + margin))   { touchButtons.left.pressed = true; touchButtons.left.touchId = id }
            if (x>(112 * SCALE + margin) &&  x<(224 * SCALE + margin))  { touchButtons.right.pressed = true; touchButtons.right.touchId = id }
            if (x>(900 * SCALE + margin) &&  x<(1020 * SCALE + margin)) { touchButtons.up.pressed = true; touchButtons.up.touchId = id }
        }
        else if (gameState == "PAUSED")
        {
            if (x>(900 * SCALE + margin) &&  x<(1020 * SCALE + margin)) { touchButtons.resetlevel.pressed = true; touchButtons.resetlevel.touchId = id }
        }

    }


    if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
    if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
    if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }


    if (touchButtons.resetlevel.pressed == true)
    {
        resetlevelPressed = true;
        gamePaused=false;
        gameState = "PLAYING";
        initBricks(); }
    else { resetlevelPressed = false; }


}

function onTouchMove(event) {
	 // Prevent the browser from doing its default thing (scroll, zoom)
	event.preventDefault();

    var id;

    var iMax = event.changedTouches.length;

    for(var i=0; i<iMax; i++)
    {
        x = event.changedTouches[i].clientX;
        y = event.changedTouches[i].clientY;
        id = event.changedTouches[i].identifier;

        if ( touchButtons.left.touchId == id ) { touchButtons.left.pressed = false; }
        if ( touchButtons.right.touchId == id ) { touchButtons.right.pressed = false; }
        if ( touchButtons.up.touchId == id ) { /* do nothing - even if moves off the up button */ }

        if (x>(16 * SCALE + margin) &&  x<(112 * SCALE + margin))   { touchButtons.left.pressed = true; touchButtons.left.touchId = id }
        if (x>(112 * SCALE + margin) &&  x<(224 * SCALE + margin))  { touchButtons.right.pressed = true; touchButtons.right.touchId = id }

    }

    if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
    if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
    if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }



}

function onTouchEnd(event) {

    var id;

    var iMax = event.changedTouches.length;

    for(var i=0; i<iMax; i++)
    {
        id = event.changedTouches[i].identifier;

        if ( touchButtons.left.touchId == id ) { touchButtons.left.pressed = false; }
        if ( touchButtons.right.touchId == id ) { touchButtons.right.pressed = false; }
        if ( touchButtons.up.touchId == id ) { touchButtons.up.pressed = false; }
        if ( touchButtons.resetlevel.touchId == id ) { touchButtons.resetlevel.pressed = false; }


    }

    if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
    if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
    if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }

}



//titletextbox.setText("CLICK TO START");
//titletextbox.draw(ctx);

initBricks();
setInterval(gameLoop, 20);