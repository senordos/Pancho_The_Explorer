
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
      var introY = Math.trunc((window.innerHeight * 0.75 / 2) - (0.5 * (buttonSizeNum * 2)));
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


function button_startGameClicked()
{
    //Play a sound after the user clicks - only plays if the music is toggled.
    var context = new window.AudioContext();
    // create a dummy sound - and play it immediately in same 'thread'
    var oscillator = context.createOscillator();
    oscillator.frequency.value = 400;
    oscillator.connect(context.destination);
    oscillator.start(0);
    oscillator.stop(0);

    //Turn introScreen off and gameCanvas on
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    if (gameMusic == true)
    {
      sound.playMusic(0); //play level 0 music
    }
    gameStarted = true;

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

    SCALEDCANVASWIDTH = Math.floor(CANVASWIDTH * canvasScale);
    SCALEDCANVASHEIGHT = Math.floor(CANVASHEIGHT * canvasScale);

    margin = Math.floor((window.innerWidth - SCALEDCANVASWIDTH) / 2);


    if (window.innerHeight < window.innerWidth) { landscape = true; } else { landscape = false; };

    document.getElementById("gameCanvas").setAttribute("width", SCALEDCANVASWIDTH);
    document.getElementById("gameCanvas").setAttribute("height", SCALEDCANVASHEIGHT);

    ctx.scale(canvasScale,canvasScale);

    //Also re-draw the intro game menu if it is active


}
