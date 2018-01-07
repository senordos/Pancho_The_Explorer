function Textbox(x, y, width, height, text, alignment, left_tabs, right_tabs)
{


    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = new Array();
    this.backgroundColour = "#fffaaa";

    this.textgraphics = new Image();

    this.addTextArea(text,1, alignment, left_tabs, right_tabs);


    this.loaded = false;
    var self = this;
    this.textgraphics.onload = function() { console.log('Textbox - Font loaded!'); self.loaded = true; };

    this.textgraphics.src = "tiles/gfont1_working.png";

}


Textbox.prototype.draw = function(context)
{
    //draw a square where to draw the text
    context.beginPath();
    context.rect( this.x, this.y, this.width, this.height);
    context.fillStyle = this.backgroundColour;
    context.fill();
    context.closePath();


    this.drawTextAreas(context);


}

Textbox.prototype.setBackgroundColour = function( bc )
{
    this.backgroundColour = bc;
}

Textbox.prototype.drawTextAreas = function( context )
{
  var i = 0;
  var j = 0;
  var lineX = 0;
  //var lineY = 0;
  var letter = 0;

  if (this.text.length == 0)
  {
    console.log("Textbox ERROR - text length = 0");
  }
  else
  {
    for ( j = 0; j < this.text.length; j++ )
    {
      textArea = this.text[j];
      lineX = 0;
      for ( i = 0; i < textArea.text.length; i++ )
      {
          letter = textArea.text.charCodeAt(i);
          this.drawChar( textArea.rel_text_start_x + lineX , textArea.rel_text_start_y, letter, context );
          lineX = lineX + 1;
      }

    }
  }
}

//draws a character relative to the bounding box x and y coord
//the x and y are letter spaces, not pixels
Textbox.prototype.drawChar = function( rel_char_x, rel_char_y, letter, context )
{
    //ASCII CODES
    // 10 or 13 = new line      --not handled
    // 37       = %
    // 48 - 57  = 0 - 9
    // 58       = :
    // 65 - 90  = A - Z

    //Game Font 2 = 0123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ
    var xpos = 0 //this is the position of the letter in the graphics image
    if (letter == 37) { xpos = letter - 37; }
    else if (letter >= 48 && letter <= 58) { xpos = letter - 47; }
    else if (letter >= 65 && letter <= 90) { xpos = letter - 53; }
    else { xpos = -1; }

    if (xpos != -1)
    {
      xpos = xpos * 28; //each letter is 28 pixels wide (7 blocks rather than 8)
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      context.drawImage(this.textgraphics, xpos+1, 0, 26, 32, this.x + (rel_char_x * 32), this.y + (rel_char_y * 32) + 16, 26, 32 );
    }

}




Textbox.prototype.setTitle = function(text)
{

    this.text[0].text = text;

}

Textbox.prototype.addTextArea = function(text, line, alignment, left_tabs, right_tabs)
{
  return this.updateTextArea(-1, text, line, alignment, left_tabs, right_tabs);
}

Textbox.prototype.updateTextAreaText = function(areaId, text)
{
  return this.updateTextArea(areaId, text, this.text[areaId].line, this.text[areaId].alignment, this.text[areaId].left_tabs, this.text[areaId].right_tabs);
}


//tabs are the number of characters to be tabbed. These are converted to absolute positions
Textbox.prototype.updateTextArea = function(areaId, text, line, alignment, left_tabs, right_tabs)
{

    //Set the relative X position - relative to the overall textbox X
    if (alignment == "CENTRE")
    {
      rel_text_start_x = Math.floor( ((this.width / 32) - (text.length)) / 2 );
    }
    else if (alignment == "LEFT")
    {
      rel_text_start_x = Math.floor( left_tabs );
    }
    else if (alignment == "RIGHT")
    {
      rel_text_start_x = Math.floor( (this.width / 32) - right_tabs - text.length );
    }
    else
    {
      //if not specified, lock to left side
      rel_text_start_x = 0;
    }


    //set the relative Y position - relative to the overall textbox Y
    line = line - 1;
    if (line < 0) { console.log("Textbox ERROR - line cannot be < 0"); }
    rel_text_start_y = ( (line ) ); //the characters are 32 pixels tall, so add a space between each line

    var textArea = {"text":text, "line":line+1, "alignment":alignment, "left_tabs":left_tabs, "right_tabs":right_tabs,
                    "rel_text_start_x":rel_text_start_x, "rel_text_start_y":rel_text_start_y};

    if(areaId == -1)
    {
      this.text.push(textArea);
      return this.text.length - 1;
    }
    else
    {
      this.text[areaId] = textArea;
      return areaId;
    }


}
