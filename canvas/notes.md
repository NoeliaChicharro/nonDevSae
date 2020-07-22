#CANVAS

### HTML5 Canvas - Text
* ctx.font="italic small-caps bold 12px Arial";  (context = ctx; an object delivered by html5)
* every font that works in a browser, works in canvas too. U don't have to install it separately.
* canvas is a pixel based board, this means the fonts/text should also be set up in px. Otherwise it will be calculated.
* ctx.textBaseline="alphabetic|top|hanging| middle|ideographic|bottom";
* ctx.fillText(text,x,y,maxWidth);
* cty.strokeText(text,x,y,maxWidth);
* the maxWidth does mean that the text cannot be longer than the set amount of pixels. It does not mean that the text will be rendered smaller, 
    it means the text will be cut at the set width.
    
### HTML5 Canvas - Images
* ctx.drawImage(img,x,y);
* the image will by default rendered at the top left.
* ctx.drawImage(img, x, y, width, height); keep in mind.. this can stretch the image
* ctx.drawImage(img, sx, sy, swidth, sheight, w, y, width, height); this cuts out a specific part of the image

### Animation Loops
* setTimeout(function, milliseconds, params);
    * runs only one time
    * the timeout is has a min of 500 milliseconds!
* setInterval(function, milliseconds, params);
    * runs till clearInterval(); is called
* this can lag a lot, if the computer is busy
    
### Request Animation Frame
* works since html 5
* this provides less lagging
* will be executed when needed. (no have to, to do it 60 times)
* no fix reloads
* synchronizes with the browsers refresh-rate
* THe performance issue will depend on the refresh-rate
* function repeatOften(){ 
    // do something
    requestAnimationFrame(repeatOften);
    // do something
    }
  requestAnimationFrame(repeatOften);
  
### Object oriented programming (OOP)
#### Prozedurale Programming
* basically 'normal' programming.. with functions and its calls

#### OOP
* Programmingstyle
* Based on the real world
* everything will be described as an object (almost everything)
 
#### Classes
* a blueprint of an object (behaviors an methods of an object will be declared)
* each object has its own class




















