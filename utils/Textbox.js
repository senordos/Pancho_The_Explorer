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

    this.textgraphics.src = "tiles/gfont1.png";

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
                var xpos = letter - 65;
                xpos = xpos * 28;
                context.drawImage(this.textgraphics, xpos, 0, 28, 32, this.x + this.indent + (i * 32), this.y + 16, 28, 32);  
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
    else
    {
        this.padding = 0;
        this.indent = 32;
    }
}