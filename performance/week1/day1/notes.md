#Intro

* Amazon's calculated that a page load slowdown of just one second could cost it $1.6 billion in sales each year.
* Google ...

# Network optimization
### Image Formats
Important to know which format to use in the right situation. 

* Reduce PNG with TinyPNG
* Reduce JPG with JPEG-optimizer
* Simple illustrations > Highly detailed images
* Lower JPG image quality to 30-60% if you can!
* Resize images bades on size needed!
* Different Media Queries for different backgrounds
* imgix
* Remove img metadata (verexif.com)
    * In general take out all the private information!
    
    
### new Formats

* webP
* jpgG


# FrontEnd optimization

### HTML optimization
* load JS as late as possible
* load CSS as early as possible

### CSS optimization
* CSS is render blocking
* Only load whatever is needed
  * Get rid of unused rules in your code
* Use above the fold loading
  * A user is only interested in what they see
* media attributes
  * HTML media attributes
* Less specificity
  * specificity takes time to calculate
  
### JS optimization
* Once a script tag is discovered, DOM construction is paused
* Script can's be executed until CSSOM is loaded.
* Thus JS is called a 'Parse Blocker'
  * we can
* Load script asynchronously
* defer loading of script
* minimize DOM manipulation
* avoid long running JS 








