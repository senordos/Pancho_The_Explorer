function Textbox(x, y, width, height, text, alignment)
{


    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.alignment = alignment;
    this.padding = 64;
    this.indent = 32;

    this.textgraphics = new Image();

    this.setText(text);


    this.loaded = false;
    var self = this;
    this.textgraphics.onload = function() { console.log('loaded!'); self.loaded = true; };

    this.textgraphics.src = "tiles/gfont1_working.png";

}

Textbox.prototype.draw = function(context)
{
    //draw a square where to draw the text
    context.beginPath();
    context.rect( this.x, this.y, this.width, this.height);
    context.fillStyle = "#fffaaa";
    context.fill();
    context.closePath();



    var i;
    if (this.loaded)
    {
       for ( i = 0; i < this.text.length; i++ )
       {
           //Check that the text won't write past the end of the text block defined (including 32 padding at start and 32 padding at end).
           if (((i * 32) + 96 ) < this.width)
           {
                var letter = this.text.charCodeAt(i);

                //ASCII CODES
                // 48 - 57 = 0 - 9
                // 58      = :
                // 65 - 90 = A - Z

                //Game Font 2 = 0123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ
                if (letter >= 48 && letter <= 58) { xpos = letter - 48; }
                else if (letter >= 65 && letter <= 90) { xpos = letter - 54; }
                else { xpos = -1; }

                if (xpos != -1)
                {
                  xpos = xpos * 28; //each letter is 28 pixels wide (7 blocks rather than 8)
                  context.drawImage(this.textgraphics, xpos, 0, 28, 32, this.x + this.indent + (i * 32), this.y + 16, 28, 32);
                }
           }
       }

    }

}

Textbox.prototype.setText = function(text)
{

    this.text = text;

    //check whether to centre or not
    if (this.alignment == "CENTRE")
    {
        this.padding = this.width - (this.text.length * 32);
        this.indent = Math.floor(this.padding / 2);
    }
    else if (this.alignment == "RIGHT")
    {
      this.padding = this.width - (this.text.length * 32);
      this.indent = this.padding - 64;
    }
    else
    {
        this.padding = 0;
        this.indent = 32;
    }
}
