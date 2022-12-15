function Sound()
{
    this.sounds = new Array();
    this.music = new Array();
    this.lastTrackPlayed = 0;

    this.soundson = true;
    this.musicon = false;

    try
    {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new window.AudioContext();
    } catch (e)
    {
        console.log("No Web Audio support");
    }
}

Sound.prototype.loadSound = function(id, path)
{
    this.sounds[id] = new WebAudioAPISound(path);
}

Sound.prototype.loadMusic = function(id, path)
{
    this.music[id] = new WebAudioAPISound(path,{loop: true});
    this.music[id].setVolume(10);
}

Sound.prototype.soundsOn = function()
{
    this.soundson = true;
}

Sound.prototype.soundsOff = function()
{
    this.soundson = false;
}

Sound.prototype.musicOn = function()
{
    this.musicon = true;
}

Sound.prototype.musicOff = function()
{
    this.musicon = false;
}


Sound.prototype.playNextTrack = function()
{

    var nextTrack = this.lastTrackPlayed + 1;

    if (nextTrack < this.music.length)
    {
        this.music[this.lastTrackPlayed].stop();

        this.playMusic(nextTrack);
        this.lastTrackPlayed = nextTrack;
    }
    else
    {
        //Do nothing... keep playing the last track in list
    }
}

Sound.prototype.toggleSound = function()
{
    if (this.soundson == true)
    {
        this.soundsOff();
    }
    else
    {
        this.soundsOn();
    }
}

Sound.prototype.toggleMusic = function()
{
    if (this.musicon == true)
    {
        this.musicOff();
    }
    else
    {
        this.musicOn();
    }

}


Sound.prototype.playSound = function(id)
{
    if ( this.soundson )
    {
        if ( ! this.sounds[id].play())
        {
            console.log("ERROR in Sound.playSound - cannot play id: " + id);
        }
    }

}

Sound.prototype.playMusic = function()
{
  if (this.musicon)
  {
    playMusic(this.lastTrackPlayed);
  }

}

Sound.prototype.playMusic = function(id)
{
    if ( this.musicon )
    {

        var playingMusic = false;
        var tries = 6;

        this.lastTrackPlayed = id;

        playingMusic = this.music[id].play();

        //if the first try didn't work, wait half second and try again
        if ( ! playingMusic )
        {
            this.waitToPlayMusic(tries, id);
        }
    }

}

Sound.prototype.waitToPlayMusic = function(tries, id)
{
    if ( this.musicon )
    {

        tries--;
        //only allow a set number of tries before givine up
        if (tries > 0)
        {

          var playingMusic = this.music[id].play();

          //if the first try didn't work, wait half second and try again
          if ( ! playingMusic )
          {
              var that = this;
              setTimeout( function() { that.waitToPlayMusic(tries, id); }, 500);
          }
        }
        else
        {
            console.log("ERROR in Music.playMusic - cannot play id: " + id);
        }
    }
}
