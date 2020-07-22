/* 
 * Copyright 2017 by Pascal Stoop
 */

function GameEngine(canvasId) {
  //methods
  this.initGameEngine = function(canvasId) {
    this.refCanvas = document.getElementById(canvasId);
    if (this.refCanvas.getContext) {
      this.ctx = this.refCanvas.getContext('2d', {alpha: true});
      this.resizeCanvas();
      this.initListeners();

      const tempThis = this;
      const tempImg = new Image();
      tempImg.src = "media/spritesheet_money.png";
      tempImg.onload = function (){
        tempThis.spriteImg = this;
        tempThis.checkGameStart();
      };

      this.bgSound = new Howl({
        src: "media/audio/backgroundSound.mp3",
        autoplay: false,
        loop: false,
        onload: tempThis.checkGameStart(),
        onplay: function () {console.log("playing background sound!")}
      });

      this.positiveSound = new Howl({
        src: "media/audio/positiv.wav",
        autoplay: false,
        loop: false,
        onload: tempThis.checkGameStart(),
        onplay: function () {console.log("playing positive sound!")}
      });

      this.negativeSound = new Howl({
        src: "media/audio/nagativ.wav",
        autoplay: false,
        loop: false,
        onload: tempThis.checkGameStart(),
        onplay: function () {console.log("playing negative sound!")}
      });

      this.overSound = new Howl({
        src: "media/audio/gameOver.wav",
        autoplay: false,
        loop: false,
        onload: tempThis.checkGameStart(),
        onplay: function () {console.log("playing over sound!")}
      });
      
    } else {
      alert("Your browser doesn't support the canvas-tag.");
    }
  };

  this.checkGameStart = function () {
    this.counterSound++;
    if (this.counterSound >= 5){
      this.restartGame();
      console.log("all loaded");
    }
  };
  
  this.resizeCanvas = function() {
    let boxWidth = this.refCanvas.clientWidth;
    let boxHeight = this.refCanvas.clientHeight;
    this.refCanvas.width = boxWidth;
    this.refCanvas.height = boxHeight;
  };
  
  this.initListeners = function() {
    let my = this;
    window.addEventListener("resize", function() {
      my.resizeCanvas();
    });

    $("#" + canvasId).on("mousedown", function (evt) {
      let cPos = getPositionFromEvent(evt, my.refCanvas);
      console.log("x:" + cPos.x + ", y:" + cPos.y);
      my.checkPlayerClickPosition(cPos);
    });
  };
  
  this.restartGame = function() {

    this.startTime = Date.now();
    this.totalScore = this.successObj = 0;
    this.allMoneyObjects = [];
    this.render();
    this.bgSound.play();
  };
  
  this.checkPlayerClickPosition = function(cPos) {
    for (let i = 0; i < this.allMoneyObjects.length; i++){
      if (this.allMoneyObjects[i].isPosInside(cPos)){
        this.positiveSound.pause();
        console.log("click true");
        this.allMoneyObjects.splice(i, 1);
        i--;
        this.totalScore+=5;
        this.successObj++;
        this.positiveSound.play();
      }
    }
  };
  
  this.render = function() {
    //clear canvas
   this.ctx.clearRect(0, 0, this.refCanvas.width, this.refCanvas.height);


    //time since last paint
    let actMSTime = Date.now();
    
    //create new MoneyObjects
    if (actMSTime > this.nextTimeGenerateObj) {
      this.nextTimeGenerateObj = actMSTime;

      let tempX = (Math.floor(Math.random() * (this.refCanvas.width-64)));
      let tempObj = new MoneyObject(tempX, this);
      this.allMoneyObjects.push(tempObj);

      if (this.successObj > 50) {
        this.nextTimeGenerateObj +=150;

      } else if (this.successObj > 40) {
        this.nextTimeGenerateObj +=250;

      } else if (this.successObj > 30) {
        this.nextTimeGenerateObj +=350;

      } else if (this.successObj > 20) {
        this.nextTimeGenerateObj +=450;

      } else if (this.successObj > 10) {
        this.nextTimeGenerateObj +=550;

      } else {
        this.nextTimeGenerateObj +=650;
      }
    }
    
    //move/render all Money-Objects
    for (let i = 0; i < this.allMoneyObjects.length; i++){
      const obj = this.allMoneyObjects[i];

      if (obj.move()){
        obj.render();

      } else {
        this.allMoneyObjects.splice(i, 1);
        this.negativeSound.pause();
        i--;
        this.totalScore-=5;
        this.negativeSound.play();
      }
    }
    
    //render total score & time
    this.ctx.font = "bold 18px tstar";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "end";
    this.ctx.fillText(
      `Success Objects: ${this.successObj} Score: ${this.totalScore}, Playtime: ${((actMSTime - this.startTime)/1000).toFixed(1)}`,
      this.refCanvas.width,
      this.refCanvas.height - 500,
      300);

    if (this.totalScore >= 0) {
      window.requestAnimationFrame(this.render.bind(this));
    } else {
      this.ctx.font = "bold 30px tstar";
      this.ctx.fillStyle = "hotpink";
      this.ctx.fillText(`GAME OVER!`, this.refCanvas.width/1.8, this.refCanvas.height/1.8, 400);
      this.overSound.play();
    }
  };
  
  this.allMoneyObjects = [];
  this.nextTimeGenerateObj = 0;
  this.totalScore = 0;
  this.startTime = 0;
  
  this.successObj = 0;
  
  this.refCanvas = null;
  this.ctx = null;
  
  this.refRAF = null;
  
  this.spriteImg = null;

  this.bgSound = null;
  this.positiveSound = null;
  this.negativeSound = null;
  this.overSound = null;
  this.counterSound = 0;
  
  //constructor
  this.initGameEngine(canvasId);
}

function MoneyObject(startX, gEngine) {
  this.isPosInside = function(cPos) {
    if ((cPos.x <= this.x + this.width) && (cPos.x >= this.x) && (cPos.y <= this.y + this.height) && (cPos.y >= this.y)){
      return true;
    }
    return false;
  };
  
  this.move = function() {
    this.y += 2;

    if (this.y >= this.engine.refCanvas.height){
      return false;
    }
    return true;
  };
  
  this.render = function() {
    this.engine.ctx.drawImage(this.engine.spriteImg, this.spriteFrameAct * 64, 0, 64, 64, this.x, this.y, this.width, this.height);

    this.spriteFrameRendCount++;
    if (this.spriteFrameRendCount >= 3){
      this.spriteFrameRendCount = 0;
      this.spriteFrameAct++;
      if (this.spriteFrameAct >= this.spriteFrameMax){
        this.spriteFrameAct = 0;
      }
    }
  };
  
  this.score = 5;
  
  this.x = startX;
  this.y = -64;
  this.width = 64;
  this.height = 64;
  
  this.spriteFrameMax = 10;
  this.spriteFrameAct = 0;
  this.spriteFrameRendCount = 0;
  
  this.engine = gEngine;
}
