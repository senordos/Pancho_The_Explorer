


const CANVASWIDTH = 1024;
const CANVASHEIGHT = 768;

const SND_JUMP = 0;
const SND_STOMP = 1;
const SND_PLAYERDIE = 2;
const SND_CHILLI = 3;
const SND_EXTRALIFE = 4;

var gameStarted = false;

//initialise the sound engine
gameSound = true;
gameMusic = false;
var sound = new Sound();
sound.soundsOn();          //start the game with the sounds enabled
sound.loadSound(SND_JUMP, "sounds/jump.wav");
sound.loadSound(SND_STOMP, "sounds/stomp.wav");
sound.loadSound(SND_CHILLI, "sounds/sound_chilli.wav");
sound.loadSound(SND_PLAYERDIE, "sounds/sound_playerdie.wav");
sound.loadSound(SND_EXTRALIFE, "sounds/sound_extralife.wav");
sound.loadMusic(0,"sounds/music_beachfront-celebration.mp3")
sound.loadMusic(1,"sounds/music_robosocks-chiptune-lead.mp3");
sound.loadMusic(2,"sounds/music_bassfreak-another-chiptune.mp3");



var canvasScale = 1; //initial scaling is set to 1

//drawIntroScreen();

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;


var buffer = document.createElement('canvas');
buffer.width = CANVASWIDTH;
buffer.height = CANVASHEIGHT;
var bctx = buffer.getContext('2d');

bctx.mozImageSmoothingEnabled = false;
bctx.webkitImageSmoothingEnabled = false;
bctx.msImageSmoothingEnabled = false;
bctx.imageSmoothingEnabled = false;



//Initial call "onWindowResize" to set up window scaling
onWindowResize();
//Event listener if the window is resized
window.addEventListener("resize", onWindowResize);





var touchable = 'createTouch' in document;
console.log("screen touchable status=" + touchable);
if(touchable)
{

	document.addEventListener( 'touchstart', onTouchStart, false );
	document.addEventListener( 'touchmove', onTouchMove, false );
	document.addEventListener( 'touchend', onTouchEnd, false );
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


//Progress tracking variables
var level = 0; //current level, beginning at 0.
var maxLevel = levels.length - 1; //the last level, after which you win

var maxStompableEnemyCounter = 0;
var stompableEnemiesCounter = 0;
var maxChilliCounter = 0;
var levelTimeStart = 0;
var attempts = 1; //this is the number of attempts to complete current level
var attemptsHistory = new Array(); // history of attempts



var gameState = "PLAYING";
var gamePaused=false;
var levelComplete=false;
var playerDied=false;

var cheatmode = false;
var debugmode = false;


bctx.font = "30px Arial";

const PADDLEWIDTH=5;
const PADDLEHEIGHT=30;
const PADDLEMOVEMENT=3;
const PADDLESTARTXGAP=20;
const PLAYERJUMP= -30;

const GRAVITY = 4;

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
var player1_ContinuePressed=false;
var player1_ResetLevelPressed=false;

var player2_UpPressed=false;
var player2_DownPressed=false;

var bricks = [];

var compareRect = [];


const BALLRADIUS = 5;
const BALLDIAMETER = BALLRADIUS * 2;

const ANIMATIONSPEED = 125;

//to build bricks to shape the level
var brickcols = 0;
var brickrows = 0;
var brickcount = 0;

var lastBrickX = 0;

const BRICKHEIGHT = 64;
const BRICKWIDTH = 64;
const BRICKSTARTX = 0;
const BRICKSTARTY = 0;

const SPRITESTARTCORRECTIONX = 0;
const SPRITESTARTCORRECTIONY = -64;

const MAPOFFSETY_UPPER = 158;
const MAPOFFSETY_LOWER = 384;

//game debug variables
var showTargetRect = false;


tiles = new Image();
//tiles.src = "tiles/platform_tiles.png";

bricksSpritesheet = new Image();

imageSprites = new Image();
imageSprites.src = "tiles/spritesheet_objects_64.png";



var titletextbox = new Textbox(0,0, CANVASWIDTH, 64,"PANCHO THE EXPLORER","CENTRE",0,0);
var messagebox = new Textbox(0,672, CANVASWIDTH, 64, "HELLO", "CENTRE",0,0 );
var versionbox = new Textbox(0,600, CANVASWIDTH, 64, "EPISODE 1:  MEXICO", "CENTRE",0,0 );
var progressbox = new Textbox(0,0, CANVASWIDTH, 54,"", "RIGHT",0,13);
var livestext = progressbox.addTextArea("LIVES: ", 1, "LEFT", 1, 0);


var levelcompletebox = new Textbox(0,0,CANVASWIDTH,CANVASHEIGHT,"INITIAL LEVEL TEXT","CENTRE",0,0);
levelcompletebox.setBackgroundColour("#FFFFAA");
var levelcompletebox_levelTextArea = 0;  //the title text area is always 0
levelcompletebox.updateTextArea(levelcompletebox_levelTextArea,"INITIAL LEVEL TEXT", 2, "CENTRE", 0, 0);

levelcompletebox.addTextArea("CHILLIES FOUND: ", 6, "LEFT", 2, 2);
var levelcompletebox_chilliTextArea =
levelcompletebox.addTextArea("1 OF 1", 6, "RIGHT", 2, 2);

levelcompletebox.addTextArea("BADDIES STOMPED: ", 8, "LEFT", 2, 2);
var levelcompletebox_baddiesTextArea =
levelcompletebox.addTextArea("1 OF 1", 8, "RIGHT", 2, 2);

levelcompletebox.addTextArea("SECRETS FOUND: ", 10, "LEFT", 2, 2);
var levelcompletebox_secretsTextArea =
levelcompletebox.addTextArea("0", 10, "RIGHT", 2, 2);

levelcompletebox.addTextArea("ATTEMPTS: ", 12, "LEFT", 2, 2);
var levelcompletebox_attemptsTextArea =
levelcompletebox.addTextArea("1ST", 12, "RIGHT", 2, 2);

levelcompletebox.addTextArea("LEVEL TIME: ", 14, "LEFT", 2, 2);
var levelcompletebox_timeTextArea =
levelcompletebox.addTextArea("00:00", 14, "RIGHT", 2, 2);


levelcompletebox.addTextArea("PRESS SPACE TO CONTINUE", 21, "CENTRE",0,0);




var player1;
player1 = new Sprite();

var enemies = [];
var chilliCounter = 0;


var touch = { x:0, y:0, type:"NONE", id:0 };

var touchButtons = {  left:{pressed:false, touchId:-1},
											right:{pressed:false, touchId:-1},
											up:{pressed:false, touchId:-1},
											resetlevel:{pressed:false, touchId:-1},
											continue:{pressed:false, touchId:-1}
										}


var gameLoopStart;
var gameLoopEnd;


function resetGame()
{
		attempts = 1; //this is the number of attempts to complete current level
		//clear all the entries in attemptsHistory
		while ( attemptsHistory.length )
		{
			attemptsHistory.pop();
		}

		gameState = "PLAYING";
		gamePaused=false;
		levelComplete=false;
		playerDied=false;



		titletextbox.updateTextArea(0,"PANCHO THE EXPLORER", 1, "CENTRE", 0, 0);

		//Start the game at the begining
		level = 0;
		player1.lives = 1;
		initBricks();
}



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


function initMusic(level)
{
		switch(level)
		{
			case 0:
					//Music already started on game init
					break;
			case 1:
					//Same music as level 0
					break;
			case 2:
					//Same music as level 0
					break;
			case 3:
					sound.playNextTrack();
					break;

			default:

					//Do nothing

		}

}




function initBricks()
{


		var i = 0; //array counter
		var a = 0; //array x
		var b = 0; //array y
		var x = 0; //target brick x
		var y = 0; //target brick y
		var p = 0; //Position in the level array
		var c = 0; //the type of the brick

		brickcols = 0;
		brickrows = 0;

		var rectMain; //to be the collision rectangle
		var tileName;

		enemies = [];
		chilliCounter = 0;
		levelTimeStart = new Date().getTime();

		mapOffsetY = 0;  //set the map to start with more sky showing

		for (var l=0; l < levels[level].layers.length; l++)
		{
				if (levels[level].layers[l].name == "Map")
				{
						level1 = levels[level].layers[l].data;
				}

				if (levels[level].layers[l].name == "Objects")
				{
						var enemyCounter = 0;
						stompableEnemiesCounter = 0;
						maxStompableEnemyCounter = 0;
						maxChilliCounter = 0;

						for (var o=0; o < levels[level].layers[l].objects.length; o++)
						{

								if (levels[level].layers[l].objects[o].name == "Player")
								{
										setAttributes(player1, {
												name:"Player1",
												img:"tiles/spritesheet_player_v2.png",
												image_src:"tiles/spritesheet_player_v2.png",
												rectOffset:       {top:0,  bottom:63, left:7,  right:55},
												rectTopOffset:    {top:0,  bottom:31, left:7, right:55},
												rectBottomOffset: {top:32, bottom:63, left:7, right:55},
												rectLeftOffset:   {top:19, bottom:43, left:7,  right:19},
												rectRightOffset:  {top:19, bottom:43, left:43, right:55}
										});

										player1.init(levels[level].layers[l].objects[o]);
										player1.xSpeed = 0;

								}
								if (levels[level].layers[l].objects[o].name == "Enemy1")
								{
										enemies[enemyCounter] = new Enemy1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										//if this enemy can be stomped, update the counter
										if ( enemies[enemyCounter].stompable ) { stompableEnemiesCounter++; };
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "Enemy2")
								{
										enemies[enemyCounter] = new Enemy2();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										if ( enemies[enemyCounter].stompable ) { stompableEnemiesCounter++; };
										enemyCounter++;
								}

								if (levels[level].layers[l].objects[o].name == "Enemy3")
								{
										enemies[enemyCounter] = new Enemy3();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "Enemy4")
								{
										enemies[enemyCounter] = new Enemy4();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										//if this enemy can be stomped, update the counter
										if ( enemies[enemyCounter].stompable ) { stompableEnemiesCounter++; };
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "EnemyBlock1")
								{
										enemies[enemyCounter] = new EnemyBlock1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "EnemyEagle1")
								{
										enemies[enemyCounter] = new EnemyEagle1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										if ( enemies[enemyCounter].stompable ) { stompableEnemiesCounter++; };
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "EnemyPiranha1")
								{
										enemies[enemyCounter] = new EnemyPiranha1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "EnemyMonkey1")
								{
										enemies[enemyCounter] = new EnemyMonkey1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "EnemyMonkey2")
								{
										enemies[enemyCounter] = new EnemyMonkey2();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "EnemySpikes1")
								{
										enemies[enemyCounter] = new EnemySpikes1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "Bridge1")
								{
										enemies[enemyCounter] = new Bridge1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "Bridge2")
								{
										enemies[enemyCounter] = new Bridge2();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "Chilli1")
								{
										enemies[enemyCounter] = new Chilli1();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;

										chilliCounter++;

								}
								if (levels[level].layers[l].objects[o].name == "ChilliEL")
								{
										enemies[enemyCounter] = new ChilliEL();
										enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										enemyCounter++;


								}
								if (levels[level].layers[l].objects[o].name == "Exit1")
								{
										 enemies[enemyCounter] = new Exit1();
										 enemies[enemyCounter].init(levels[level].layers[l].objects[o]);
										 enemyCounter++;

								}
						}

						maxStompableEnemyCounter = stompableEnemiesCounter;
						maxChilliCounter = chilliCounter;

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

		brickcols = levels[level].layers[0].width;
		brickrows = levels[level].layers[0].height;
		brickcount = brickrows * brickcols;

		lastBrickX = (brickcols * 64) - 64; //furthest right brick

		//Load bricks spritesheets
		bricksSpritesheet.src = "tiles\/spritesheet_mexico.png";


		i = 0;

		var nB; //New Brick

		//set the brick positions
		for (b=0; b < brickrows; b++){
			for (a=0; a < brickcols; a++){

					p = b * brickcols + a;

					x = BRICKSTARTX + (a * BRICKWIDTH);
					y = BRICKSTARTY + (b * BRICKHEIGHT);


					nB = new Brick();
					var tileId = levels[level].layers[0].data[i];
					var backgroundId = levels[level].layers[1].data[i];
					var columns = levels[level].tilesets[0].columns;

					switch(tileId)
					{
						case 0:
										if (backgroundId == 0) //if there is no backgound, it's blank
										{
											nB.tileName="none";
											nB.spritesheetPosX = 0;
											nB.spritesheetPosY = 0;
											nB.type = tileId;

										}
										else  //but if there is a background, load it.
										{
											nB.tileName="background";
											nB.type = backgroundId;
											nB.spritesheetPosX = Math.trunc(((backgroundId - 1) % columns)) * 64;
											nB.spritesheetPosY = Math.trunc((backgroundId - 1)/ columns) * 64;
											nB.isBackground = true;
										}
										nB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63};
										nB.deadly = false;
										nB.exit=false;
										nB.moveable=false;
										nB.x = x;
										nB.y = y;

						break;

						case 1: nB.tileName="spikes1";
										nB.rectMain = {top:y+32, bottom:y+63, left:x+8, right:x+55};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = true;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						case 2: nB.tileName="vine1";
										nB.rectMain = {top:y, bottom:y+63, left:x+24, right:x+38};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = false;
										nB.exit=false;
										nB.moveable=false;
										nB.blocker=false;
										nB.climbable=true;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						case 3: nB.tileName="spikes2";
										nB.rectMain = {top:y+32, bottom:y+63, left:x+8, right:x+55};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = true;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						case 4: nB.tileName="spikes3";
										nB.rectMain = {top:y, bottom:y+32, left:x+8, right:x+55};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = true;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						case 5: nB.tileName="vine1";
										nB.rectMain = {top:y, bottom:y+63, left:x+24, right:x+38};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = false;
										nB.exit=false;
										nB.moveable=false;
										nB.blocker=false;
										nB.climbable=true;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						case 7: nB.tileName="enemyboundary";
										nB.rectMain = {top:y, bottom:y+63, left:x,   right:x+63};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = false;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.enemyBoundary = true;
										nB.blocker = true;
										nB.x = x;
										nB.y = y;
						break;

						case 8: nB.tileName="water1";
										nB.rectMain = {top:y+32, bottom:y+63, left:x+8, right:x+55};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = true;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						case 9: nB.tileName="water2";
										nB.rectMain = {top:y, bottom:y+63, left:x+8, right:x+55};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = true;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;

						default: nB.tileName="brick";
										nB.rectMain = {top:y, bottom:y+63, left:x,   right:x+63};
										nB.spritesheetPosX = Math.trunc(((tileId - 1) % columns)) * 64;
										nB.spritesheetPosY = Math.trunc((tileId - 1)/ columns) * 64;
										nB.deadly = false;
										nB.exit=false;
										nB.moveable=false;
										nB.type = tileId;
										nB.x = x;
										nB.y = y;
						break;
					}



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
		currentBrick = Math.floor((((sprite.x + 32) / 64) + (Math.floor(((sprite.y + 32 + 64) / 64))-1) * brickcols));

		//how will this work if the sprites are moving more than one pixel at a time!
		if (((sprite.x) % 64) == 0) { sprite.localBricks.xLinedUp = true } else { sprite.localBricks.xLinedUp = false };
		if (((sprite.y) % 64) == 0) { sprite.localBricks.yLinedUp = true } else { sprite.localBricks.yLinedUp = false };



		sprite.localBricks.current = currentBrick;
		sprite.localBricks.left = currentBrick - 1;
		sprite.localBricks.right = currentBrick + 1;
		sprite.localBricks.up = currentBrick - brickcols;
		sprite.localBricks.down = currentBrick + brickcols;

		sprite.localBricks.leftUp = currentBrick - brickcols - 1;
		sprite.localBricks.leftDown = currentBrick + brickcols - 1;
		sprite.localBricks.rightUp = currentBrick - brickcols + 1;
		sprite.localBricks.rightDown = currentBrick + brickcols + 1;


}


function checkWorldCollisions(sprite)
{

		//Checks a sprite's targetX and targetY positions for collisions

		//First, reset the sprite's collision array
		//As this will be called separately for X and Y movement, this needs to be reset separately

		if (sprite.interactsWithWorld)
		{
			var moveAxis = "";
			if(sprite.targetX != sprite.x)
			{
					//moving in X axis
					sprite.collisionLeft = false;
					sprite.collisionRight = false;
					moveAxis = "X";
			}

			if(sprite.targetY != sprite.y)
			{
					//moving in Y axis
					sprite.collisionTop = false;
					sprite.collisionBottom = false;
					moveAxis = "Y";
			}

			sprite.collisionClimb = false;



			//Get the sprites collision rectangles
			var spriteTargetRect=sprite.getCollisionRect();

			var spriteTopRect = sprite.getTopCollisionRect();
			var spriteBottomRect = sprite.getBottomCollisionRect();
			var spriteLeftRect = sprite.getLeftCollisionRect();
			var spriteRightRect = sprite.getRightCollisionRect();

			//draw the target on the screen if toggled
			if (showTargetRect)
			{
						bctx.beginPath();
						bctx.rect( spriteTargetRect.left - mapOffsetX,
											 spriteTargetRect.top - mapOffsetY,
											 spriteTargetRect.right - spriteTargetRect.left,  //width
											 spriteTargetRect.bottom - spriteTargetRect.top); //height

						bctx.fillStyle = "#fffaaa";
						bctx.fill();
						bctx.closePath();

			}



			var i = 0;
			var collisionHasHappened = false;
			var collisionObjectIsBlocker = true;

			for (i=0; i < brickcount; i++)
			{
					if((bricks[i].type > 0 && bricks[i].isBackground == false && bricks[i].enemyBoundary == false)
						|| (bricks[i].enemyBoundary == true && sprite.name != "Player1"))
					{
							if (intersectRect(spriteTargetRect, bricks[i].rectMain))
							{

									bricks[i].hit = true;

									//only set collision and reposition sprite if the brick is a blocker
									if ( bricks[i].blocker )
									{
											if(sprite.targetX > sprite.x)
											{
													//Find left edge of brick and the right offset of the sprite collision (e.g. 55ish) (not 64 as usually thinner)
													//The brick edge minus the collision thickness, plus 1 so there is no collision.
													sprite.targetX = bricks[i].rectMain.left - (sprite.rectOffset.right + 1);

													sprite.collisionRight = true;
											}
											else if(sprite.targetX < sprite.x)
											{
													//the player is moving left

													//Find the right edge of the brick, the left offset of the sprite collision rect (e.g. 7 or 8)
													//The brick edge minus the sprite will overlap slightly with wall (e.g. 7 or 8) - add 1 so not colliding
													sprite.targetX = bricks[i].rectMain.right - (sprite.rectOffset.left - 1);

													sprite.collisionLeft = true;
											}

											if(sprite.targetY > sprite.y)
											{
													//if the y target is higher - so moving down

													//All sprites are animated from the top left corner, so need to add the height when moving down
													sprite.targetY = bricks[i].rectMain.top - sprite.rectOffset.bottom - 1;

													//If moving down, the collision must be below, so set collision parameter
													sprite.collisionBottom = true;

											}

											else if(sprite.targetY < sprite.y)
											{
													//the player is moving up

													//All sprites are animated from the top left corner, so brick bottom + 1 is correct
													//Plus, if there is an offet at the top, need to remove this in.
													sprite.targetY = bricks[i].rectMain.bottom + 1 - sprite.rectOffset.top;

													sprite.collisionTop = true;
											}
									}

									//Do not else-if this, as will become invincible!
									if (bricks[i].deadly == true)
									{
											if (bricks[i].tileName == 'spikes1' || bricks[i].tileName == 'spikes2'
											 || bricks[i].tileName == 'water1'  || bricks[i].tileName == 'water2' )
											{
												//Ground Spikes

													//Only if player falls onto spikes does it trigger
													if (intersectRect(spriteBottomRect, bricks[i].rectMain) && moveAxis == "Y")
													{
														sprite.collisionDeath = true;
														console.log("Collision - deadly tile: " + bricks[i].tileName);
													}

											}
											else if (bricks[i].tileName == 'spikes3')
											{
												//Ceiling spikes
												if (intersectRect(spriteTopRect, bricks[i].rectMain) && moveAxis == "Y")
												{
													sprite.collisionDeath = true;
													console.log("Collision - deadly tile: " + bricks[i].tileName);
												}
											}
									}



									//
									//  All checks up to this point are blocking tiles
									//
									collisionObjectIsBlocker = true;
									collisionHasHappened = true;


									//
									//  All checks after this point are not blocking
									//
									if (bricks[i].climbable == true)
									{
											sprite.collisionClimb = true;
											collisionObjectIsBlocker = false;
											console.log("Collision - climbable tile: " + bricks[i].tileName);
									}


							}

					}

			}


			if (collisionHasHappened && collisionObjectIsBlocker)
			{
				sprite.collision = true;
				return true;
			}
			else
			{
				sprite.collision = false;
				return false;
			}
	}
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

		var playerStompedEnemy = false; //use this to check if the player hit one or more enemys

		for (i=0; i < enemies.length; i++)
		{
				if (enemies[i].active && enemies[i].alive)
				{

					var enemyRect = enemies[i].getCollisionRect();
					var enemyTopRect = enemies[i].getTopCollisionRect();
					var enemyLeftRect = enemies[i].getLeftCollisionRect();
					var enemyRightRect = enemies[i].getRightCollisionRect();
					var enemyBottomRect = enemies[i].getBottomCollisionRect();


					if (intersectRect(playerRect, enemyRect) && enemies[i].name == "Exit1")
					{
							playerSprite.collisionExit = true;
							console.log("Collision - Exit");
					}

					if (intersectRect(playerRect, enemyRect) && enemies[i].name == "Chilli1")
					{
							console.log("HIT CHILLI");

							enemies[i].hit = true;
							enemies[i].active = false;
							enemies[i].alive = false;

							chilliCounter--;

							sound.playSound(SND_CHILLI);

							if (chilliCounter == 0)
							{
									extraLife();
							}

					}

					if (intersectRect(playerRect, enemyRect) && enemies[i].name == "ChilliEL")
					{
							console.log("HIT CHILLI");

							enemies[i].hit = true;
							enemies[i].active = false;
							enemies[i].alive = false;

							sound.playSound(SND_CHILLI);
							extraLife();
					}


					if (intersectRect(playerRect, enemyRect) &&
								( enemies[i].name == "Bridge1" || enemies[i].name == "Bridge2"))
					{

							// Player has hit a bridge



							if (intersectRect(playerBottomRect, enemyTopRect))
							{
									//Start the bridge falling
									enemies[i].hit = true;
									enemies[i].yDirection = 1;
									enemies[i].ySpeed = 1;

									playerSprite.yDirection = 1;
									playerSprite.ySpeed = 1;
									playerSprite.targetY = enemies[i].y - playerSprite.rectOffset.bottom -1;
									playerSprite.collisionBottom = true;
							}
							else if (intersectRect(playerTopRect, enemyBottomRect))
							{
									playerSprite.yDirection = 0;
									playerSprite.ySpeed = 0;
									playerSprite.targetY = enemies[i].y + enemies[i].rectOffset.bottom - playerSprite.rectOffset.top;
									playerSprite.collisionTop = true;
							}
							else if (intersectRect(playerLeftRect, enemyRightRect))
							{
								//Player has hit bridge from right
								playerSprite.xDirection = 0;
								playerSprite.targetX = enemies[i].x + playerSprite.collisionWidth;
								playerSprite.collisionLeft = true;

							}
							else if (intersectRect(playerRightRect, enemyLeftRect))
							{
								//Player has hit bridge from left
								playerSprite.xDirection = 0;
								playerSprite.targetX = enemies[i].x - playerSprite.collisionWidth;
								playerSprite.collisionRight = true;
							}
					}

					if (intersectRect(playerRect, enemyRect) && enemies[i].name == "Enemy3" ||
							intersectRect(playerRect, enemyRect) && enemies[i].name == "EnemyPiranha1" )
					{
							//These enemies cannot be killed.
							playerSprite.hit = true;
					}

					if(intersectRect(playerRect, enemyRect) && enemies[i].deadly == true)
					{

							if(intersectRect(playerBottomRect, enemyTopRect) && enemies[i].hit == false && playerSprite.ySpeed > 0 )
							{

									//player on top of enemy
									enemies[i].updateAttributesAfterStomped(bricks, player1);

									if (enemies[i].stompable) { stompableEnemiesCounter--; }

									sound.playSound(SND_JUMP);
									playerStompedEnemy = true;

							}
							else
							{
									playerSprite.hit = true;
							}
					}
				}
		}

		if (playerStompedEnemy)
		{
				//if one or more enemys are stomped, bounce the player.
				playerSprite.ySpeed = PLAYERJUMP - 8;
		}

}


function demoMovePlayerX()
{
		//add demo player movement at some point
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

		player1.targetX = Math.trunc(player1.x + (pixelmove * player1.xSpeed));


		checkWorldCollisions(player1);
		checkEnemyCollisions(player1);


		player1.x = Math.trunc(player1.targetX);

		if ( player1.x < 0 ) { player1.x = 0; };
		if ( player1.x > lastBrickX ) { player1.x = lastBrickX; };

}

function movePlayerY()
{



		//reset the player targets before moving.
		player1.targetX = player1.x;
		player1.targetY = player1.y;


		if(player1_UpPressed && player1.collisionBottom)
		{
			sound.playSound(SND_JUMP);

			player1.ySpeed = PLAYERJUMP;
			player1.targetY = player1.y + player1.ySpeed;

		}
		else if (player1_UpPressed && player1.collisionClimb)
		{
			player1.ySpeed = -8;
			player1.targetY = player1.y + player1.ySpeed;

		}
		else
		{

				if (player1_UpPressed)
				{
					//slows the effect of gravity
					player1.ySpeed = player1.ySpeed + (GRAVITY / 2);
				}
				else if (player1.collisionClimb)
				{
					player1.ySpeed = 2;  //Player is on climbable object, but always sliding down
				}
				else
				{
					//Player is falling (or player is on the ground and trying to fall)
					player1.ySpeed = player1.ySpeed + GRAVITY;  //player speeds up

				}
				if (player1.ySpeed > 20) {player1.ySpeed = 20;}
				player1.targetY = player1.y + player1.ySpeed;
		}

		if (checkWorldCollisions(player1))
		{
				player1.ySpeed = 0;
		}
		checkEnemyCollisions(player1);


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
				enemies[i].setMoveTargetY(bricks, player1);
				// 2 & 3 //
				checkWorldCollisions(enemies[i]);
				// 4 //
				enemies[i].y = enemies[i].targetY;
				// 5 //
				setLocalBricks(enemies[i]);
				enemies[i].updateMoveAttributesY(bricks, player1);
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
				enemies[i].setMoveTargetX(bricks, player1);
				// 2 & 3 //
				checkWorldCollisions(enemies[i]);
				// 4 //
				enemies[i].x = enemies[i].targetX;
				// 5 //
				setLocalBricks(enemies[i]);
				enemies[i].updateMoveAttributesX(bricks, player1);
		}
}

function performEmeniesActions()
{

	for(i=0; i < enemies.length; i++)
	{
			gameEvent = enemies[i].updateActions();

			if (gameEvent != null)
			{
				if(gameEvent.eventType == "SPAWN")
				{
					spawnObject(gameEvent.eventObject.spawnObject, gameEvent.eventObject.x, gameEvent.eventObject.y, gameEvent.eventObject.params);
				}
			}
	}
}

function spawnObject(objectType,xPos,yPos,params)
{
	newEnemyPosition = enemies.length;
	switch(objectType)
	{
		case "EnemyMonkeyRock1":
			enemies[newEnemyPosition] = new EnemyMonkeyRock1();
			break;
		case "EnemyMonkeyBanana1":
			enemies[newEnemyPosition] = new EnemyMonkeyBanana1();
			break;
		default:
			//do nothing
	}
	enemies[newEnemyPosition].init({"x":xPos,"y":yPos,"properties":params});
}

function cleanEnemyArray()
{
	for(i=0; i < enemies.length; i++)
	{
		maxX = bricks[bricks.length-1].x + 64;
		maxY = bricks[bricks.length-1].y + 64;

		if(  enemies[i].alive == false
			|| enemies[i].x > maxX
			|| enemies[i].y > maxY
			|| enemies[i].x < 0
			|| enemies[i].y < 0 )
		{
			enemies.splice(i,1);
			i--; //the array will now be shorter at the point just removed!
		}
	}
}


//
// DRAW FUNCTIONS
//

function drawBricks()
{

		var image;

		//This controls if the map moves while the player is moving left and right
		if (player1.x - mapOffsetX > 448) { mapOffsetX = player1.x - 448; }
		if (player1.x - mapOffsetX < 320) { mapOffsetX = player1.x - 320; }
		if (mapOffsetX < 0) { mapOffsetX = 0; }


		if (player1.y - mapOffsetY > MAPOFFSETY_LOWER) { mapOffsetY = player1.y - MAPOFFSETY_LOWER; }
		if (player1.y - mapOffsetY < MAPOFFSETY_UPPER) { mapOffsetY = player1.y - MAPOFFSETY_UPPER; }



		//due to lack of foresight when setting up the playable area,
		//the map offset is set to -64 rather than 0 so player doesn't
		//disappear behind the progress box
		if (mapOffsetY < -64) { mapOffsetY = -64; }

		mapOffsetX = Math.trunc(mapOffsetX);
		mapOffsetY = Math.trunc(mapOffsetY);

		for (i=0; i < brickcount; i++){
				if(bricks[i].type != 0){

						//only draw the bricks if they're on the screen and not blank
						if (bricks[i].tileName != "none" &&
							  bricks[i].tileName != "enemyboundary" &&   //enemyBoundary tiles are not drawn
								bricks[i].x < mapOffsetX + CANVASWIDTH &&
								bricks[i].x > mapOffsetX - 64 &&
								bricks[i].y < mapOffsetY + CANVASHEIGHT &&
								bricks[i].y > mapOffsetY )
						{
							 bctx.drawImage(bricksSpritesheet, bricks[i].spritesheetPosX, bricks[i].spritesheetPosY, 64, 64, bricks[i].x - mapOffsetX, bricks[i].y - mapOffsetY, 64, 64);
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
				animXOffset = (gameFrame % 9) * 64;
	 }

	 if(player1_RightPressed)
	 {
				animYOffset = 0;
				//animXOffset = player1.animFrame=gameFrame * 64;
				animXOffset = (gameFrame % 9) * 64;
	 }


	 bctx.drawImage(imageSprites, animXOffset,animYOffset,64,64, player1.x - mapOffsetX, player1.y - mapOffsetY,64,64);
}


function drawEnemies()
{

	 for(i=0; i < enemies.length; i++)
	 {

			//Only draw the sprites if they are alive
			if ( enemies[i].alive && enemies[i].visible )
			{
				 var animXOffset = enemies[i].animXOffset;
				 var animYOffset = enemies[i].animYOffset;

				 var e = enemies[i];

				 if (  enemies[i].name == "Enemy1"
						|| enemies[i].name == "Enemy2"
						)
				 {
						 if (enemies[i].hit == true)
						 {
								 animYOffset = animYOffset + 64;
						 }
				 }
				 if (enemies[i].name == "Enemy3" )
				 {

									if (e.rotation == 0) { animYOffset = animYOffset + 0; }
						 else if (e.rotation == 90) { animYOffset = animYOffset + 64; }
						 else if (e.rotation == 180) { animYOffset = animYOffset + 128; }
						 else if (e.rotation == 270) { animYOffset = animYOffset + 192; }
						 else { animYOffset = animYOffset + 0; }
				 }
				 if ( enemies[i].name == "Enemy4" )
				 {
								 if ( e.xDirection == 1  ) { animYOffset = animYOffset + 0; }
						else if ( e.xDirection == -1 ) { animYOffset = animYOffset + 64; }

						if (e.hit == true)
						{
								animYOffset = animYOffset + 128;
						}
				 }
				 if ( enemies[i].name == "EnemyEagle1" )
				 {
								 if ( e.hit == false && e.xDirection == 1  ) { animYOffset = animYOffset + 0; }
						else if ( e.hit == false && e.xDirection == -1 ) { animYOffset = animYOffset + 64; }
						else if ( e.hit == true)
						{
								animYOffset = animYOffset + 128;
						}
				 }
				 if ( enemies[i].name == "EnemyPiranha1" )
				 {
						if ( e.yDirection == 1 ) { animYOffset = animYOffset + 64; }
				 }
				 if (enemies[i].name == "EnemyMonkey1"
				  || enemies[i].name == "EnemyMonkey2"
  			  || enemies[i].name == "EnemySpikes1")
				 {
					 animYOffset = enemies[i].getDrawYCoord(gameFrame);
				 }


				 //sets position in the spritesheet
				 //animXOffset = (gameFrame % enemies[i].animMaxFrame) * 64 + enemies[i].animXOffset;

				 animXOffset = enemies[i].getDrawXCoord(gameFrame);
				 //bctx.drawImage(enemies[i].image, animXOffset, animYOffset,64,64, enemies[i].x - mapOffsetX, enemies[i].y - mapOffsetY,64,64);

				 bctx.drawImage(imageSprites, Math.floor(animXOffset), Math.floor(animYOffset),64,64, Math.floor(enemies[i].x - mapOffsetX), Math.floor(enemies[i].y - mapOffsetY),64,64);


			}
	 }
}

function drawControls()
{
		controls = new Image();
		controls.src = "tiles/spritesheet_controls.png";

		if (gameState == "PLAYING")
		{
				bctx.drawImage(controls,   0, 0, 64, 64, 64,  672, 64, 64); //left
				bctx.drawImage(controls,  64, 0, 64, 64, 256, 672, 64, 64); //right
				bctx.drawImage(controls, 128, 0, 64, 64, 928, 672, 64, 64); //up
		}
		else if (gameState == "PLAYER_DIED")
		{
				ctx.drawImage(controls, 192, 0, 64, 64, 928, 672, 64, 64);
		}


}


function calculateFrameRate()
{
		var d = new Date();
		var n = d.getTime();

		counter++;

		if ((n - timeindex) > 1000){

			framerate = counter;
			counter=0;
			timeindex = n;

		}
		bctx.fillStyle = "#000000";

		bctx.fillText(framerate,10,100);

}

function extraLife()
{
		player1.lives ++;
		sound.playSound(SND_EXTRALIFE);
}

function gameLoop()
{


		var date = new Date();
		var text;
		gameLoopStart = date.getTime();


		text = gameLoopStart - gameLoopEnd;
		//console.log("Loop Wait Time = " + text);

		/*
		if (!landscape)
		{
			 bctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH);
			 clearIntroScreen();

			 messagebox.updateTextAreaText(0, "PLEASE ROTATE DEVICE");
			 messagebox.draw(bctx);

		}
		else
		*/
		{
				if (!gameStarted)
				{
					//Draw the intro screen
					//This only draws once - if already on screen, it will remain
					drawIntroScreen();
				}

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



						bctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
						ctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH);


						pixelmove = Math.trunc(pps * (loopTimeGap / 1000));
										bctx.fillStyle = "#000000";


						if (debugmode)
						{
							bctx.fillText(Math.round(pixelmove),75,50);

							if (pixelmove > 10)
							{
									bctx.fillStyle = "#000000";
									bctx.fillText("Frame rate dropped below normal game operation!",170,50);
							}
						}




						moveEnemiesY();
						moveEnemiesX();
						performEmeniesActions();
						cleanEnemyArray();   //garbage collects the enemy array

						if (gameStarted)
						{
								movePlayerX();
								movePlayerY();
						}
						else
						{
								demoMovePlayerX();
						}



						if (player1.collisionExit == true)
						{
								levelComplete = true;
						}

						drawBricks();
						drawEnemies();  //and other sprites
						drawPlayer();
						drawControls();

						progressbox.setTitle("CHILLIES: " + chilliCounter);
						progressbox.updateTextArea(livestext,"LIVES: " + player1.lives, 1, "LEFT", 1, 0);

						progressbox.draw(bctx);


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
						if (player1.collisionDeath) { titletextbox.updateTextArea(0,"CAREFUL WHERE YOU STAND", 1, "CENTRE", 0, 0); }
						if (player1.hit)            { titletextbox.updateTextArea(0, "WATCH OUT FOR THE BADDIES", 1, "CENTRE", 0, 0); }

						titletextbox.draw(ctx);

						sound.playSound(SND_PLAYERDIE);

						player1.lives --;

						if ( player1.lives <= 0 )
						{
							gameState = "GAME_OVER";
							titletextbox.updateTextArea(0,"GAME OVER", 1, "CENTRE", 0, 0);
							titletextbox.draw(ctx);
							level = 1;

						}
						else
						{

							gameState = "PLAYER_DIED";

						}


						messagebox.updateTextArea(0,"PRESS R TO RESET LEVEL", 1, "CENTRE", 0, 0);
						messagebox.draw(ctx);

						playerDied = false;
						drawControls();


				}
				else if (gameState == "PLAYER_DIED" && player1_ResetLevelPressed)
				{
					player1_ResetLevelPressed = false;
					attempts++;
					initBricks();
					resetTouchButtons();
					gamePaused=false;
					gameState = "PLAYING";
				}
				else if (gameState == "GAME_OVER" && player1_ResetLevelPressed)
				{
					player1_ResetLevelPressed = false;
					resetTouchButtons();
					resetGame();
				}
				else if (levelComplete == true)
				{
						var chilliPercent = Math.round(100-(chilliCounter / maxChilliCounter) * 100);
						var baddiesPercent = Math.round(100-(stompableEnemiesCounter / maxStompableEnemyCounter) * 100);

						if ( isNaN(chilliPercent) ) { chilliPercent = 100; }
						if ( isNaN(baddiesPercent) ) { baddiesPercent = 100; }

						var attemptsText = "ST";
						if      ( attempts == 2 ) { attemptsText = "ND"; }
						else if ( attempts == 3 ) { attemptsText = "RD"; }
						else if ( attempts >= 4 ) { attemptsText = "TH"; }
						attemptsText = attempts + attemptsText;

						var timeNow = new Date().getTime();
						var timeTaken = Math.floor((timeNow - levelTimeStart) / 1000);
						var timeMins = Math.floor(timeTaken / 60);
						var timeSecs = Math.floor(timeTaken % 60);


						levelcompletebox.updateTextAreaText(levelcompletebox_levelTextArea,   "LEVEL " + level + " COMPLETE");
						levelcompletebox.updateTextAreaText(levelcompletebox_chilliTextArea,  chilliPercent + "%");
						levelcompletebox.updateTextAreaText(levelcompletebox_baddiesTextArea, baddiesPercent + "%");
						levelcompletebox.updateTextAreaText(levelcompletebox_attemptsTextArea, attemptsText );
						levelcompletebox.updateTextAreaText(levelcompletebox_timeTextArea,    timeMins + " MIN " + timeSecs + " SECS");

						if (level > 0 ) // don't draw the completion screen for startup level
						{
							levelcompletebox.draw(ctx);

						}
						else
						{
								player1_ContinuePressed = true; //automatically continue to level 1
						}

						levelComplete = false;
						gamePaused = true;
						gameState = "LEVEL_COMPLETE";

				}
				else if ( gameState == "LEVEL_COMPLETE" && player1_ContinuePressed == true )
				{

					console.log("SPACE CONT...");

					level++;

					player1_ContinuePressed = false;


					if ( level <= maxLevel )
					{
							attemptsHistory.push(attempts);
							attempts = 1;
							initMusic(level);
							initBricks();
							resetTouchButtons();
							gamePaused = false;
							gameState = "PLAYING";
					}
					else
					{
							gamePaused = true;
							resetTouchButtons();
							titletextbox.setTitle("WELL DONE   GAME COMPLETED");
							titletextbox.draw(ctx);

					}
				}
		//end landscape check
		}

		var date2 = new Date();

		gameLoopEnd = date2.getTime();


		text = gameLoopEnd - gameLoopStart;

		//console.log("Loop Time = " + text);

}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
		switch(e.keyCode)
		{
			case 32: player1_ContinuePressed = true; break;

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
			case 82: /* r */ player1_ResetLevelPressed = true; break;
		}
}

function onTouchStart(event)
{


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
						if (x>(0 ) &&  x<=(160 * canvasScale + margin))   { touchButtons.left.pressed = true; touchButtons.left.touchId = id }
						if (x>(160 * canvasScale + margin) &&  x<(512 * canvasScale + margin))  { touchButtons.right.pressed = true; touchButtons.right.touchId = id }
						if (x>(512 * canvasScale + margin) /*&&  x<(1020 * canvasScale + margin)*/) { touchButtons.up.pressed = true; touchButtons.up.touchId = id }
				}
				else if (gameState == "PLAYER_DIED")
				{
						if (x>(900 * canvasScale + margin) &&  x<(1020 * canvasScale + margin)) { touchButtons.resetlevel.pressed = true; touchButtons.resetlevel.touchId = id }
				}
				else if (gameState == "LEVEL_COMPLETE")
				{
						if (x>(0 * canvasScale + margin) &&  x<(1024 * canvasScale + margin)) { touchButtons.continue.pressed = true; touchButtons.continue.touchId = id }
				}

		}


		if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
		if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
		if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }


		if (touchButtons.resetlevel.pressed == true)
		{
				player1_ResetLevelPressed = true;
				touchButtons.resetlevel.pressed == false;
		}
		else { resetlevelPressed = false; }

		if (touchButtons.continue.pressed == true)
		{
				player1_ContinuePressed = true;
				touchButtons.continue.pressed = false;
		}
		else { touchButtons.continue.pressed = false; }


}

function onTouchMove(event)
{
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

				if (x> 0                           &&  x<=(160 * canvasScale + margin)) { touchButtons.left.pressed = true; touchButtons.left.touchId = id }
				if (x>(160 * canvasScale + margin) &&  x<(512 * canvasScale + margin))  { touchButtons.right.pressed = true; touchButtons.right.touchId = id }

		}

		if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
		if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
		if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }



}

function onTouchEnd(event)
{

		var id;

		var iMax = event.changedTouches.length;

		for(var i=0; i<iMax; i++)
		{
				id = event.changedTouches[i].identifier;

				if ( touchButtons.left.touchId == id ) { touchButtons.left.pressed = false; }
				if ( touchButtons.right.touchId == id ) { touchButtons.right.pressed = false; }
				if ( touchButtons.up.touchId == id ) { touchButtons.up.pressed = false; }
				if ( touchButtons.resetlevel.touchId == id ) { touchButtons.resetlevel.pressed = false; }
				if ( touchButtons.continue.touchId == id ) { touchButtons.continue.pressed = false; }


		}

		if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
		if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
		if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }

}

function resetTouchButtons()
{


	touchButtons.left.pressed = false;
	touchButtons.right.pressed = false;
	touchButtons.up.pressed = false;
	touchButtons.resetlevel.pressed = false;
	touchButtons.continue.pressed = false;

	player1_LeftPressed = false;
	player1_RightPressed = false;
	player1_UpPressed = false;
	player1_ContinuePressed = false;
	player1_ResetLevelPressed = false;
}



//titletextbox.setTitle("CLICK TO START");
//titletextbox.draw(ctx);

//fullscreen();
//disableScroll();
initBricks();
setInterval(gameLoop, 20);
