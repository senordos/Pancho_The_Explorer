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
				ctx.drawImage(controls, 192, 0, 64, 64, 928, 672, 64, 64);
		}
}


function drawTextBoxes()
{
	
}
