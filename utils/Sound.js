function Sound()
{
    this.soundarray = new Array();



}

Sound.prototype.load = function(name, path)
{
    //Disabling sound until find IOS solution
    //var sound = new Audio(path);
    //var soundmap = {name, sound};
    //this.soundarray.push(soundmap);
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
}
