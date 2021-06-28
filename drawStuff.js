//
// DRAW FUNCTIONS
//
function drawIntroScreen()
{
    //Only draw the intro screen if it doesn't already exist
    var hasIntroScreen = document.getElementById('introScreen');
    if(!hasIntroScreen)
    {
      console.log("DRAWING INTRO SCREEN");

      //setup the intro screen
      var buttonSizeNum =  Math.trunc(96 * canvasScale / 1.5);
      var textWidthNum = Math.trunc(480 * canvasScale / 1.5);
      buttonSize = buttonSizeNum.toString() + "px";
      textWidth = textWidthNum.toString() + "px";

      //set up the intro screen position, based on the size of the buttonSize etc.
      var introX = Math.trunc((window.innerWidth / 2) - (0.5 * (buttonSizeNum + textWidthNum)));
      var introY = Math.trunc((window.innerHeight * 0.75 / 2) - (0.5 * (buttonSizeNum * 2)) - buttonSizeNum);
      introX = introX.toString() + "px";
      introY = introY.toString() + "px";

      var div_introScreen = document.createElement("div");
          div_introScreen.id = "introScreen";
          div_introScreen.style.position = "absolute";
          div_introScreen.style.top = introY;
          div_introScreen.style.left = introX;
      document.getElementById("fullscreen").appendChild(div_introScreen);

      var image_textSound = document.createElement("IMG");
          image_textSound.src = "tiles/text_sound.png";
          image_textSound.style.width = textWidth;
          image_textSound.style.height = buttonSize;
          image_textSound.style.display = "inline";
      document.getElementById("introScreen").appendChild(image_textSound);


      var button_toggleSound = document.createElement("button");
          button_toggleSound.id = "button_toggleSound";
          button_toggleSound.style.width = buttonSize;
          button_toggleSound.style.height = buttonSize;
          button_toggleSound.style.display = "inline";
          button_toggleSound.style.backgroundImage = "url('tiles/button_soundon.png')";
          button_toggleSound.style.backgroundSize = buttonSize;
          button_toggleSound.style.border = "none";
          button_toggleSound.style.padding = "0px 0px";
      document.getElementById("introScreen").appendChild(button_toggleSound);

      button_toggleSound.addEventListener ("click", function() { button_toggleSoundClicked(); } );

      var linebreak1 = document.createElement("br");
      document.getElementById("introScreen").appendChild(linebreak1);

      var image_textMusic = document.createElement("IMG");
          image_textMusic.src = "tiles/text_music.png";
          image_textMusic.style.width = textWidth;
          image_textMusic.style.height = buttonSize;
          image_textMusic.style.display = "inline";
      document.getElementById("introScreen").appendChild(image_textMusic);

      var button_toggleMusic = document.createElement("button");
          button_toggleMusic.id = "button_toggleMusic";
          button_toggleMusic.style.width = buttonSize;
          button_toggleMusic.style.height = buttonSize;
          button_toggleMusic.style.display = "inline";
          button_toggleMusic.style.backgroundImage = "url('tiles/button_soundoff.png')";
          button_toggleMusic.style.backgroundSize = buttonSize;
          button_toggleMusic.style.border = "none";
          button_toggleMusic.style.padding = "0px 0px";
      document.getElementById("introScreen").appendChild(button_toggleMusic);

      button_toggleMusic.addEventListener ("click", function() { button_toggleMusicClicked(); } );

      var linebreak2 = document.createElement("br");
      document.getElementById("introScreen").appendChild(linebreak2);


      var image_textPlay = document.createElement("IMG");
          image_textPlay.src = "tiles/text_play.png";
          image_textPlay.style.width = textWidth;
          image_textPlay.style.height = buttonSize;
          image_textPlay.style.display = "inline";
      document.getElementById("introScreen").appendChild(image_textPlay);


      var button_startGame = document.createElement("button");
          button_startGame.id = "button_toggleGame";
          button_startGame.style.width = buttonSize;
          button_startGame.style.height = buttonSize;
          button_startGame.style.display = "inline";
          button_startGame.style.backgroundImage = "url('tiles/button_go.png')";
          button_startGame.style.backgroundSize = buttonSize;
          button_startGame.style.border = "none";
          button_startGame.style.padding = "0px 0px";
      document.getElementById("introScreen").appendChild(button_startGame);

      button_startGame.addEventListener ("click", function() { button_startGameClicked(); } );
    }
}


function drawBricks()
{

		var image;

		//This controls if the map moves while the player is moving left and right
		if (player1.x - mapOffsetX > 448) { mapOffsetX = player1.x - 448; }
		if (player1.x - mapOffsetX < 320) { mapOffsetX = player1.x - 320; }
		if (mapOffsetX < 0) { mapOffsetX = 0; }
		if (mapOffsetX > lastBrickX - 960) { mapOffsetX = lastBrickX - 960; }


		if (player1.y - mapOffsetY > MAPOFFSETY_LOWER) { mapOffsetY = player1.y - MAPOFFSETY_LOWER; }
		if (player1.y - mapOffsetY < MAPOFFSETY_UPPER) { mapOffsetY = player1.y - MAPOFFSETY_UPPER; }



		//due to lack of foresight when setting up the playable area,
		//the map offset is set to -64 rather than 0 so player doesn't
		//disappear behind the progress box
		if (mapOffsetY < -64) { mapOffsetY = -64; }

		mapOffsetX = Math.trunc(mapOffsetX);
		mapOffsetY = Math.trunc(mapOffsetY);

		for (i=0; i < brickcount; i++)
		{
				//Draw the background
				if(background[i].type != 0)
				{
						//only draw the bricks if they're on the screen and not blank
						if (background[i].tileName != "none" &&
								background[i].tileName != "enemyboundary" &&   //enemyBoundary tiles are not drawn
								background[i].x < mapOffsetX + CANVASWIDTH &&
								background[i].x > mapOffsetX - 64 &&
								background[i].y < mapOffsetY + CANVASHEIGHT &&
								background[i].y > mapOffsetY )
						{
							 bctx.drawImage(bricksSpritesheet, background[i].spritesheetPosX, background[i].spritesheetPosY, 64, 64, background[i].x - mapOffsetX, background[i].y - mapOffsetY, 64, 64);
						}
				}

				//Draw Level Bricks
				if(bricks[i].type != 0)
				{
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
  			  || enemies[i].name == "EnemySpikes1"
					|| enemies[i].name == "EnemyArrowTrap1")
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
				bctx.drawImage(controls, 192, 0, 64, 64, 928, 672, 64, 64);
		}
}


function drawTextBoxes()
{
	progressbox.setTitle("CHILLIES: " + chilliCounter);
	progressbox.updateTextArea(livestext,"LIVES: " + player1.lives, 1, "LEFT", 1, 0);
	progressbox.draw(bctx);

	if(level == 0)
	{
			titletextbox.draw(bctx);
			versionbox.draw(bctx);
	}

	switch (gameState)
	{

		case "LEVEL_COMPLETE_WAIT_FOR_RESET":
												if (level > 0)
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

													var timeMins = Math.floor(levelTimeTaken / 60);
													var timeSecs = Math.floor(levelTimeTaken % 60);
													levelcompletebox.updateTextAreaText(levelcompletebox_levelTextArea,   "LEVEL " + level + " COMPLETE");
													levelcompletebox.updateTextAreaText(levelcompletebox_chilliTextArea,  chilliPercent + "%");
													levelcompletebox.updateTextAreaText(levelcompletebox_baddiesTextArea, baddiesPercent + "%");
													levelcompletebox.updateTextAreaText(levelcompletebox_attemptsTextArea, attemptsText );
													levelcompletebox.updateTextAreaText(levelcompletebox_timeTextArea,    timeMins + " MIN " + timeSecs + " SECS");
													levelcompletebox.draw(bctx);
												}
		break;
		case "GAME_OVER":
												titletextbox.updateTextArea(0,"GAME OVER", 1, "CENTRE", 0, 0);
												titletextbox.draw(bctx);
												messagebox.updateTextArea(0,"PRESS R TO RESET LEVEL", 1, "CENTRE", 0, 0);
												messagebox.draw(bctx);
	  break;
		case "PLAYER_DIED_WAIT_FOR_RESETLEVEL":
												if (player1.collisionDeath) { titletextbox.updateTextArea(0,"CAREFUL WHERE YOU STAND", 1, "CENTRE", 0, 0); }
												if (player1.hit)            { titletextbox.updateTextArea(0, "WATCH OUT FOR THE BADDIES", 1, "CENTRE", 0, 0); }
												titletextbox.draw(bctx);

												messagebox.updateTextArea(0,"PRESS R TO RESET LEVEL", 1, "CENTRE", 0, 0);
												messagebox.draw(bctx);
		break;
		case "NOT_LANDSCAPE":
												bctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH);
												clearIntroScreen();

												messagebox.updateTextAreaText(0, "PLEASE ROTATE DEVICE");
												messagebox.draw(bctx);
		break;
		case "GAME_COMPLETE":
												titletextbox.updateTextArea(0,"WELL DONE   GAME COMPLETED", 1, "CENTRE", 0, 0);
												titletextbox.draw(bctx);

		default:

	}
}

function renderScreen()
{
	drawBricks();
	drawEnemies();  //and other sprites
	drawPlayer();
	drawControls();
	drawTextBoxes();

	ctx.clearRect(0, 0, CANVASWIDTH, CANVASWIDTH);            //Clear screen ready for new buffer
	ctx.drawImage(buffer, 0, 0, 1024, 768, 0, 0, 1024, 768);  //Flip buffer into screen
	bctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);					//Clear buffer ready for new images
}
