const CANVASWIDTH = 1024;
const CANVASHEIGHT = 768;

const SND_JUMP = 0;
const SND_STOMP = 1;
const SND_PLAYERDIE = 2;
const SND_CHILLI = 3;
const SND_EXTRALIFE = 4;

//some direction constants for general use
const DOWN = 0;
const UP = 1;
const LEFT = 2;
const RIGHT = 3;

const ISMOBILE = isMobile();

//initialise the sound engine
gameSound = true;
gameMusic = true;
var sound = new Sound();
sound.soundsOn();          //start the game with the sounds enabled
sound.loadSound(SND_JUMP, "sounds/jump.wav");
sound.loadSound(SND_STOMP, "sounds/stomp.wav");
sound.loadSound(SND_CHILLI, "sounds/sound_chilli.wav");
sound.loadSound(SND_PLAYERDIE, "sounds/sound_playerdie.wav");
sound.loadSound(SND_EXTRALIFE, "sounds/sound_extralife.wav");
sound.loadMusic(0,"sounds/music_conejo-rapido-1-5.mp3")
sound.loadMusic(1,"sounds/music_african-rhythm-africa-groovy-sport-stomping-music-20622.mp3");
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
var levelTimeTaken = 0;
var attempts = 1; //this is the number of attempts to complete current level
var extraLivesUsed = new Map(); //this tracks whether the extra lives have been found or not


//Can't remember why I put this in, but possibly so that at the end of the
//game it can show how many attempts it took to complete each level in game.
//var attemptsHistory = new Array(); // history of attempts



var gameState = "INTRO";
var prePortraitGameState = "NOT_SET"

var cheatmode = false;
var introOff = false;
var gamePaused = false;
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
var player1_ScreenTouched = false;

var player1_ResetLevelPressed=false;

var player2_UpPressed=false;
var player2_DownPressed=false;

var bricks = [];
var background = [];


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

const MAPOFFSETY_UPPER = 140;  
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
player1 = new Player();

var enemies = [];
var chilliCounter = 0;


var touch = { x:0, y:0, type:"NONE", id:0 };

var touchButtons = {    
						left:{pressed:false, touchId:-1},
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
		/*
		while ( attemptsHistory.length )
		{
			attemptsHistory.pop();
		}
		*/

		gameState = "PLAYING";

		titletextbox.updateTextArea(0,"PANCHO THE EXPLORER", 1, "CENTRE", 0, 0);

		//Start the game at the begining
		level = 0;
		player1.lives = 3;
		extraLivesUsed.clear();
		loadLevel();
}

function resetLevel()
{
	player1_ResetLevelPressed = false;
	attempts++;
	loadLevel();
	resetTouchButtons();
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
					//Same music as level 0
					break;
			case 4:
					sound.playNextTrack();
					break;
			case 5:
					//No change to music
					break;
			case 6:
					//No change to music
					break;
			case 7:
					sound.playNextTrack();
					break;
			case 8:
					//No change to music;
					break;
			case 8:
					//No change to music;
					break;
			case 10:
					sound.playNextTrack();
					break;
			default: //Do nothing

		}
}




function loadLevel()
{
		var foregroundMap = []; //holds the map data integers before creating objects
		var backgroundMap = []; //holds the map data integers before creating objects

		levelTimeStart = new Date().getTime();

		for (var l=0; l < levels[level].layers.length; l++)
		{
			switch( levels[level].layers[l].name )
			{
				case "Map": 		foregroundMap = levels[level].layers[l];
									break;

				case "Background": 	backgroundMap = levels[level].layers[l];
									break;

				case "Objects":     loadObjects( levels[level].layers[l].objects );
									break;
			}
		}
		loadMap(foregroundMap,backgroundMap);
}


function loadObjects(objects)
{
	var enemyCounter = 0;

	//reset global variables
	enemies = [];
	chilliCounter = 0;
	stompableEnemiesCounter = 0;
	maxStompableEnemyCounter = 0;
	maxChilliCounter = 0;

	for (var o=0; o < objects.length; o++)
	{
		//PART OF A HACK TO FIX GAME RESETS WHERE EXTRA LIVES NEED RESETING DUE TO BAD FORESIGHT.
		changedObjectName = false;

		if (objects[o].name == "Player")
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

			player1.init(objects[o]);
			player1.xSpeed = 0;
		}
		else
		{
			if (objects[o].name != "")
			{
				//console.log("Level = " + level);
				//console.log("Name  = " + objects[o].name);
				//rename the Extra Life object if it has already been used.
				if(objects[o].name == "ChilliEL")
				{
					extraLifeId = level + "-" + objects[o].x + "-" + objects[o].y;
					if (extraLivesUsed.has(extraLifeId))
					{
						if (extraLivesUsed.get(extraLifeId))
						{
							//BAD DESIGN DECISION HERE AS THIS EDITS THE ACTUAL MAP
							//RATHER THEN DOING SOMETHING TEMPORARY!
							//TO FIX, THERE IS A BIT OF A HACK... CHANGING THE NAME HERE...
							changedObjectName = true;
							var originalObjectName = objects[o].name;
							//Rather than an extra life, change to be invincible chilli
							objects[o].name = "ChilliINV";
						}
					}
					else
					{
						extraLivesUsed.set(extraLifeId, false);
					}
				}
				eval("enemies[enemyCounter] = new " + objects[o].name + "()");
				enemies[enemyCounter].init(objects[o]);

				//...AND CHANGING IT BACK HERE, LEAVING THE LEVEL DATA INTACT.
				if (changedObjectName)
				{
					objects[o].name = originalObjectName;
					changedObjectName=false;
				}
				if ( enemies[enemyCounter].stompable ) { stompableEnemiesCounter++; };
				if ( enemies[enemyCounter].name == "Chilli1") { chilliCounter++; }
				enemyCounter++;
			}
			else
			{
				console.log("WARNING game.js --- Enemy Object creation attempt with no name set - cannot create object");
				console.log("                --- Object ID = " + o);

			}
		}
	}
	maxStompableEnemyCounter = stompableEnemiesCounter;
	maxChilliCounter = chilliCounter;
}


function loadMap(foregroundMap, backgroundMap)
{
	var i = 0; //array counter
	var a = 0; //array x
	var b = 0; //array y
	var x = 0; //target brick x
	var y = 0; //target brick y
	var p = 0; //Position in the level array
	var c = 0; //the type of the brick

	var rectMain; //to be the collision rectangle
	var tileName;


	//reset global variables
	brickcols = 0;
	brickrows = 0;
	mapOffsetY = 0;  //set the map to start with more sky showing


	brickcols = foregroundMap.width;
	brickrows = foregroundMap.height;
	brickcount = brickrows * brickcols;

	lastBrickX = (brickcols * 64) - 64; //furthest right brick

	//Load spritesheet images and set the total columns in sheet
	bricksSpritesheet.src = "tiles\/spritesheet_mexico_64.png";
	var columns = levels[level].tilesets[0].columns;

	//reset the arrays
	bricks = [];
	background = [];

	i = 0;

	var nB; //New Brick
	var nBB; //New Background Brick

	//set the brick positions
	for (b=0; b < brickrows; b++)
	{
		for (a=0; a < brickcols; a++)
		{

				p = b * brickcols + a;

				x = BRICKSTARTX + (a * BRICKWIDTH);
				y = BRICKSTARTY + (b * BRICKHEIGHT);


				nB = new Brick();
				nBB = new Brick();

				var tileId = foregroundMap.data[i];
				var backgroundId = backgroundMap.data[i];

				switch(tileId)
				{
					case 0: //set a blank tile

									nB.tileName="none";
									nB.spritesheetPosX = 0;
									nB.spritesheetPosY = 0;
									nB.type = tileId;
									nB.isBackground = true;
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

				//Set Background Structure
				nBB.tileName="background";
				nBB.type = backgroundId;
				nBB.spritesheetPosX = Math.trunc(((backgroundId - 1) % columns)) * 64;
				nBB.spritesheetPosY = Math.trunc((backgroundId - 1)/ columns) * 64;
				nBB.isBackground = true;
				nBB.rectMain = {top:y,    bottom:y+63, left:x,   right:x+63};
				nBB.deadly = false;
				nBB.exit=false;
				nBB.moveable=false;
				nBB.x = x;
				nBB.y = y;


				bricks[i] = nB;
				background[i] = nBB;

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
											//console.log("Collision - climbable tile: " + bricks[i].tileName);
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


function checkEnemyCollisions(player)
{
		var colevt = false; //variable for the CollisionEvent

		for (i=0; i < enemies.length; i++)
		{
				if (enemies[i].active && enemies[i].alive)
				{
					colevt = enemies[i].getCollisionEvent(player);
					if (colevt)
					{
						switch(colevt.name)
						{
							case "Chilli1":
										chilliCounter--;
										break;
							case "ChilliEL":
										//get Chilli ID
										extraLifeId = level + "-" + enemies[i].x + "-" + enemies[i].y;
										extraLivesUsed.set(extraLifeId,true);
										extraLife();
										break;
							case "Exit1":
										player.collisionExit = true;
										break;
						}
						if (colevt.sound != "NO_SOUND") { sound.playSound(SND_CHILLI); }
						if (colevt.playerHit) { player.hit = true; }
						if (colevt.enemyHit)
						{
							enemies[i].updateAttributesAfterStomped(bricks, player1);
							sound.playSound(SND_JUMP);
							playerStompedEnemy = true;
							player.ySpeed = PLAYERJUMP - 8;
							if (enemies[i].stompable) { stompableEnemiesCounter--; }
						}
					}
				}
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

		player1.targetX = Math.trunc(player1.x + (10 * player1.xSpeed));


		checkWorldCollisions(player1);
		checkEnemyCollisions(player1);

		player1.targetX = player1.targetX + player1.groundSpeed;
		player1.groundSpeed = 0;  //set this to 0 after contact. Will set again if still in contact

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

function performEnemiesActions()
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

	eval("enemies[newEnemyPosition] = new " + objectType + "()");
	if ( enemies[newEnemyPosition].stompable ) { stompableEnemiesCounter++; };
	if ( enemies[newEnemyPosition].name == "Chilli1") { chilliCounter++; }
	//enemyCounter++;

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
			i--; //the array will now be shorter at the point just removed
		}
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
}

function extraLife()
{
		player1.lives ++;
		sound.playSound(SND_EXTRALIFE);
}

function checkPlayerReachedLevelEnd()
{
	if (player1.collisionExit == true)
	{
			return true;
	}
	return false;
}

function checkIfLandscape()
{
   if (window.innerHeight < window.innerWidth)
	 {
		 return true;
	 }
	 else
	 {
		 return false;
	 }
}

function checkPlayerKilled()
{
	if (! cheatmode)
	{
			if (player1.hit)
			{
				  //player hit by a baddie
					return true;
			}
			else if (player1.collisionDeath == true)
			{
				  //player walked into an obstacle, like spikes
					return true;
			}
			return false;
	}
	else
	{
			//cheatmode is on
			player1.hit = false;
			player1.collisionDeath = false;

			bctx.fillStyle = "#AAAAAA";
			bctx.fillText("Cheat Mode On", 100, 50);

			return false;
	}
}

function handleStatePlayerDied()
{
	sound.playSound(SND_PLAYERDIE);
	player1.lives --;
}

function gameLoop()
{

		var date = new Date();
		var text;
		gameLoopStart = date.getTime();

		text = gameLoopStart - gameLoopEnd;

		if (!checkIfLandscape())
		{
			if (gameState != "NOT_LANDSCAPE") { prePortraitGameState = gameState; }
			gameState = "NOT_LANDSCAPE";

			//screen size changed, call resize function.
			onWindowResize();
		}
		else
		{
			if (gameState == "NOT_LANDSCAPE")
			{
				gameState = prePortraitGameState;
				//screen size changed, call resize function.
				onWindowResize();
			}

			if (gameState == "INTRO")
			{
				//Draw the intro screen
				//State will draw HTML controls to screen.
				//Clicking / touching a control will change the state.
				demoMovePlayerX();
			}
			else if ( gameState == "PLAYING" )
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
					moveEnemiesY();
					performEnemiesActions();
					moveEnemiesX();
					performEnemiesActions();
					cleanEnemyArray();   //garbage collects the enemy array

					movePlayerX();
					movePlayerY();

					if ( checkPlayerReachedLevelEnd() ) { gameState = "LEVEL_COMPLETE"; }
					else if ( checkPlayerKilled() ) { gameState = "PLAYER_DIED"; }
			}
			else if (gameState == "PLAYER_DIED")
			{
				handleStatePlayerDied();

				if ( player1.lives <= 0 )
				{
					gameState = "GAME_OVER";

					level = 1;
					console.log("Setting gameState = GAME OVER");
				}
				else
				{
					gameState = "PLAYER_DIED_WAIT_FOR_RESETLEVEL";
					console.log("Setting gameState =  PLAYER_DIED_WAIT_FOR_RESETLEVEL");
				}
			}
		    else if (gameState == "PLAYER_DIED_WAIT_FOR_RESETLEVEL" && (player1_ScreenTouched || player1_ResetLevelPressed))
			{
				//player1_ScreenTouched = false;
				resetTouchButtons();
				resetLevel();
				gameState = "PLAYING"
			}
			else if (gameState == "GAME_OVER" && ( player1_ScreenTouched || player1_ResetLevelPressed ))
			{
				//player1_ResetLevelPressed = false;
				resetTouchButtons();
				resetGame();
			}
			else if (gameState == "LEVEL_COMPLETE")
			{
				var timeNow = new Date().getTime();
				levelTimeTaken = Math.floor((timeNow - levelTimeStart) / 1000);

				if ( level == 0 ) // don't draw the completion screen for startup level
				{
						player1_ContinuePressed = true; //automatically continue to level 1
				}

				if (level == maxLevel)
				{
						gameState = "GAME_COMPLETE";
						resetTouchButtons();
				}
				else
				{
						gameState = "LEVEL_COMPLETE_WAIT_FOR_RESET";
				}

			}
			else if ( gameState == "LEVEL_COMPLETE_WAIT_FOR_RESET" && ( player1_ScreenTouched 
																		|| player1_ContinuePressed 
																		|| player1_ResetLevelPressed ) )
			{
				
				level++;
				//player1_ScreenTouched = false;
				resetTouchButtons();

				//attemptsHistory.push(attempts);
				attempts = 1;
				initMusic(level);
				loadLevel();
				gameState = "PLAYING";
			}			
		}
		calculateFrameRate();
		renderScreen();

		var date2 = new Date();
		gameLoopEnd = date2.getTime();
		text = gameLoopEnd - gameLoopStart;
		//console.log("Gameloop time: " + text);

}

loadLevel();
setInterval(gameLoop, 20);
