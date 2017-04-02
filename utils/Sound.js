function Sound()
{
    this.sound = 0;
}

Sound.prototype.load = function(name, path)
{
    this.sound = new Audio(path);
}

Sound.prototype.getSound = function()
{
    while(this.sound == 0)
    {
        //do nothing.
    }
    return this.sound;
}

Sound.prototype.play = function(name)
{
    /* Disabling sound until find an IOS solution
    
    for (var i = 0; i < this.soundarray.length; i++)
    {
        if ( this.soundarray[i].name == name)
        {
            
            //Create a copy of the sound and play the copy.
            //This so the sound can be played over and over.
            //Destroy the object after the sound has finished playing.
            

            var tempsound = this.soundarray[i].sound.cloneNode();
            tempsound.onended=function(){ delete tempsound; };
            tempsound.play();

        }
    }
    */
    if (this.sound != 0)
    {
        this.sound.play();
    }
}
