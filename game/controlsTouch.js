
function getTouchPoints(event)
{
	if (event && event.changedTouches && event.changedTouches.length) {
		return event.changedTouches;
	}

	if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
		return [{
			clientX: event.clientX,
			clientY: event.clientY,
			identifier: event.pointerId
		}];
	}

	return [];
}

function syncTouchButtonState()
{
	if (touchButtons.left.pressed == true) { player1_LeftPressed = true; } else { player1_LeftPressed = false; }
	if (touchButtons.right.pressed == true) { player1_RightPressed = true; } else { player1_RightPressed = false; }
	if (touchButtons.up.pressed == true) { player1_UpPressed = true; } else { player1_UpPressed = false; }

	if (touchButtons.resetlevel.pressed == true)
	{
		player1_ResetLevelPressed = true;
		touchButtons.resetlevel.pressed = false;
	}
	else { resetlevelPressed = false; }

	if (touchButtons.continue.pressed == true)
	{
		player1_ContinuePressed = true;
		touchButtons.continue.pressed = false;
	}
	else { touchButtons.continue.pressed = false; }
}

function clearTouchButtonForId(id)
{
	if (touchButtons.left.touchId == id) {
		touchButtons.left.pressed = false;
		touchButtons.left.touchId = -1;
	}
	if (touchButtons.right.touchId == id) {
		touchButtons.right.pressed = false;
		touchButtons.right.touchId = -1;
	}
	if (touchButtons.up.touchId == id) {
		touchButtons.up.pressed = false;
		touchButtons.up.touchId = -1;
	}
	if (touchButtons.resetlevel.touchId == id) {
		touchButtons.resetlevel.pressed = false;
		touchButtons.resetlevel.touchId = -1;
	}
	if (touchButtons.continue.touchId == id) {
		touchButtons.continue.pressed = false;
		touchButtons.continue.touchId = -1;
	}
}

function onTouchStart(event)
{
	// Keep the active pointer captured so browser gestures do not interrupt the
	// control while the finger is still down. This is especially useful on Safari.
	if (event && typeof event.pointerId === 'number' && event.target && event.target.setPointerCapture) {
		try { event.target.setPointerCapture(event.pointerId); } catch (e) {}
	}

	// Avoid default browser behavior (scroll/selection/zoom) but only when
	// interacting with the canvas/game area. Allow touches on HTML buttons
	// to generate normal click events.
	try {
		var targ = event.target;
		var tag = targ && targ.tagName && targ.tagName.toUpperCase();
		var insideButton = (tag === 'BUTTON') || (targ.closest && targ.closest('button'));
		if (!insideButton) {
			if (event && event.preventDefault) { event.preventDefault(); }
		}
	} catch (e) {}

	var points = getTouchPoints(event);
	var iMax = points.length;

	for (var i = 0; i < iMax; i++)
	{
		var x = points[i].clientX;
		var y = points[i].clientY;
		var id = points[i].identifier;

		clearTouchButtonForId(id);

		if (gameState == "PLAYING")
		{
			if (x > 0 && x <= (160 * canvasScale + margin)) {
				touchButtons.left.pressed = true;
				touchButtons.left.touchId = id;
			}
			if (x > (160 * canvasScale + margin) && x < (512 * canvasScale + margin)) {
				touchButtons.right.pressed = true;
				touchButtons.right.touchId = id;
			}
			if (x > (512 * canvasScale + margin)) {
				touchButtons.up.pressed = true;
				touchButtons.up.touchId = id;
			}
		}
		else if (gameState == "PLAYER_DIED_WAIT_FOR_RESETLEVEL" || gameState == "GAME_OVER" || gameState == "LEVEL_COMPLETE_WAIT_FOR_RESET")
		{
			player1_ScreenTouched = true;
		}
	}

	syncTouchButtonState();
}

function onTouchMove(event)
{
	// Prevent the browser from doing its default thing (scroll, zoom)
	if (event && event.preventDefault) { event.preventDefault(); }

	var points = getTouchPoints(event);
	var iMax = points.length;

	for (var i = 0; i < iMax; i++)
	{
		var x = points[i].clientX;
		var y = points[i].clientY;
		var id = points[i].identifier;

		clearTouchButtonForId(id);

		if (x > 0 && x <= (160 * canvasScale + margin)) {
			touchButtons.left.pressed = true;
			touchButtons.left.touchId = id;
		}
		if (x > (160 * canvasScale + margin) && x < (512 * canvasScale + margin)) {
			touchButtons.right.pressed = true;
			touchButtons.right.touchId = id;
		}
		if (x > (512 * canvasScale + margin)) {
			touchButtons.up.pressed = true;
			touchButtons.up.touchId = id;
		}
	}

	syncTouchButtonState();
}

function onTouchEnd(event)
{
	if (event && typeof event.pointerId === 'number' && event.target && event.target.releasePointerCapture) {
		try { event.target.releasePointerCapture(event.pointerId); } catch (e) {}
	}

	// preventDefault on touchend only when touch started on canvas
	try {
		var targ = event.target;
		var tag = targ && targ.tagName && targ.tagName.toUpperCase();
		var insideButton = (tag === 'BUTTON') || (targ.closest && targ.closest('button'));
		if (!insideButton) {
			if (event && event.preventDefault) { event.preventDefault(); }
		}
	} catch (e) {}

	var points = getTouchPoints(event);
	var iMax = points.length;

	for (var i = 0; i < iMax; i++)
	{
		var id = points[i].identifier;
		clearTouchButtonForId(id);
	}

	syncTouchButtonState();
}

function onTouchCancel(event)
{
	if (event && typeof event.pointerId === 'number' && event.target && event.target.releasePointerCapture) {
		try { event.target.releasePointerCapture(event.pointerId); } catch (e) {}
	}

	if (event && event.preventDefault) { event.preventDefault(); }

	var points = getTouchPoints(event);
	for (var i = 0; i < points.length; i++)
	{
		clearTouchButtonForId(points[i].identifier);
	}

	syncTouchButtonState();
}

function resetTouchButtons()
{
	touchButtons.left.pressed = false;
	touchButtons.left.touchId = -1;
	touchButtons.right.pressed = false;
	touchButtons.right.touchId = -1;
	touchButtons.up.pressed = false;
	touchButtons.up.touchId = -1;
	touchButtons.resetlevel.pressed = false;
	touchButtons.resetlevel.touchId = -1;
	touchButtons.continue.pressed = false;
	touchButtons.continue.touchId = -1;

	player1_LeftPressed = false;
	player1_RightPressed = false;
	player1_UpPressed = false;
	player1_ContinuePressed = false;
	player1_ResetLevelPressed = false;
	player1_ScreenTouched = false;

}
