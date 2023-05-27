
function removeElementById(id)
{
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function clearIntroScreen()
{
  var hasIntroScreen = document.getElementById('introScreen');
  if(hasIntroScreen)
  {
    console.log("HERE");

    removeElementById("introScreen");
  }

}



function button_startGameClicked()
{
    var context = new window.AudioContext();
    context.resume();

    sound.playSound(SND_JUMP);

    //Turn introScreen off and gameCanvas on
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    if (gameMusic == true)
    {
      sound.playMusic(0); //play level 0 music
    }
    gameState = "PLAYING";
}


function button_toggleSoundClicked()
{
    sound.toggleSound();
    if (gameSound == true )
    {
      gameSound = false;
      document.getElementById("button_toggleSound").style.backgroundImage = "url('tiles/button_soundoff.png')";
    }
    else
    {
      gameSound = true;
      document.getElementById("button_toggleSound").style.backgroundImage = "url('tiles/button_soundon.png')";
    }
}


function button_toggleMusicClicked()
{
    sound.toggleMusic();
    if (gameMusic == true )
    {
      gameMusic = false;
      document.getElementById("button_toggleMusic").style.backgroundImage = "url('tiles/button_soundoff.png')";
    }
    else
    {
      gameMusic = true;
      document.getElementById("button_toggleMusic").style.backgroundImage = "url('tiles/button_soundon.png')";
    }
}



function onWindowResize()
{
    //Resize the game canvas...
    heightRatio = window.innerHeight / CANVASHEIGHT;
    if (heightRatio > 1) { heightRatio = 1 };

    canvasScale = heightRatio; ///size to canvasScale to fit screen

    if (canvasScale * CANVASWIDTH > window.innerWidth)
    {
      //then the screen is probably in Portrait mode on a mobile
      canvasScale = window.innerWidth / CANVASWIDTH;
    }

    SCALEDCANVASWIDTH = Math.floor(CANVASWIDTH * canvasScale);
    SCALEDCANVASHEIGHT = Math.floor(CANVASHEIGHT * canvasScale);

    margin = Math.floor((window.innerWidth - SCALEDCANVASWIDTH) / 2);

    document.getElementById("gameCanvas").setAttribute("width", SCALEDCANVASWIDTH);
    document.getElementById("gameCanvas").setAttribute("height", SCALEDCANVASHEIGHT);

    //ctx.scale(canvasScale,canvasScale);
    ctx.setTransform(canvasScale,0,0,canvasScale,0,0);

}
