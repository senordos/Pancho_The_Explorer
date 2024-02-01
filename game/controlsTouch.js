
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
				else if (gameState == "PLAYER_DIED_WAIT_FOR_RESETLEVEL")
				{
						
					    //if (x>(900 * canvasScale + margin) &&  x<(1020 * canvasScale + margin)) { touchButtons.resetlevel.pressed = true; touchButtons.resetlevel.touchId = id }
						player1_ResetLevelPressed = true;
				}
				else if (gameState == "LEVEL_COMPLETE")
				{
						//if (x>(0 * canvasScale + margin) &&  x<(1024 * canvasScale + margin)) { touchButtons.continue.pressed = true; touchButtons.continue.touchId = id }
						player1_ContinuePressed = true;

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
