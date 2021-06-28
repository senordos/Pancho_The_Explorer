
console.log("INFO: Adding keyboard event listeners");
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
