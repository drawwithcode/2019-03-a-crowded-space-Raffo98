//instances
var Ball;
var Rett;
var Blocks = [];
var textGameOver = "Game Over";
var diameter = 20;
var rettWidth = 150;
var rettHeight = 20;
var blockWidth = 90;
var blockHeight = 40;
var incX;
var incY;

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //implementazione pallina e barra
  Ball = new RandBall(windowWidth / 2, windowHeight / 2, diameter);
  Rett = new Bar(windowWidth / 2, windowHeight - 175, rettWidth, rettHeight);

  //implementazione blocchi
  for (incX = 0; incX <= windowWidth - 350; incX += 100) {
    for (incY = 0; incY <= windowHeight - 800; incY += 50) {
      var a = random(0, 4);
      var Block = new createBlock(150 + incX, 200 + incY, blockWidth, blockHeight);
      Blocks.push(Block);
    }
  }
}

function draw() {

  background(25);
  Ball.move();
  Ball.display();

  //movimento barra
  if (keyIsDown(LEFT_ARROW)) {
    Rett.scrollLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    Rett.scrollRight();
  }
  Rett.display();

  //Controllo collisioni della palla con la barra
  if (Ball.y + (diameter / 2) >= Rett.y && Ball.x >= Rett.x && Ball.x <= Rett.x + rettWidth) {
    Ball.hitY();
  }

  //Controllo collisione palla-blocchi
  for (var j = 0; j < Blocks.length; j++) {
    Blocks[j].display();
    Blocks[j].collide();
    if (Blocks[j].visible == false) {
      Blocks.splice(j, 1);
    }
  }

  //GAME OVER
  if (Ball.over) {
    fill('white');
    textAlign(CENTER);
    textSize(50);
    text('Game Over', windowWidth / 2, windowHeight / 1.8);
    textSize(20);
    text('Click to restart', windowWidth / 2, windowHeight / 1.6);
    if(mouseIsPressed) {
      location.reload();
    }
  }



}

function RandBall(_x, _y, _diameter) {
  this.size = _diameter;
  this.x = _x;
  this.y = _y;
  this.speed = 4;
  this.color = "white";
  this.over = false;

  var xVar = 1;
  var yVar = 1;

  this.move = function() {
    this.x += xVar * this.speed;
    this.y += yVar * this.speed;

    if (this.y < 0 + (_diameter / 2)) {
      yVar = -yVar;
    }

    if (this.y > windowHeight - 175) {
      this.over = true;
    }

    if (this.x < 0 + (_diameter / 2) || this.x > windowWidth - (_diameter / 2)) {
      xVar = -xVar;
    }
  }

  this.hitY = function() {
    yVar = -yVar;
  }

  this.hitX = function() {
    xVar = -xVar;
  }

  this.display = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

}

function Bar(_x, _y, _w, _h) {
  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;
  this.speed = 0;

  this.scrollLeft = function() {
    var i = 1;
    this.speed = 4;
    do {
      i++;
      this.x -= (this.speed * i);
    } while (frameCount == 10);
    this.x -= this.speed;
  }

  this.scrollRight = function() {
    var i = 1;
    this.speed = 4;
    do {
      i++;
      this.x += (this.speed * i);
    } while (frameCount == 10);
    this.x += this.speed;
  }

  this.display = function() {
    rect(this.x, this.y, this.w, this.h);
  }
}

function createBlock(_x, _y, _w, _h) {

  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;
  this.visible = true;

  this.display = function() {
    rect(this.x, this.y, this.w, this.h);
  }

  this.collide = function() {
    if (Ball.x < this.x + this.w && (Ball.x) >= this.x) {
      if (Ball.y < this.y + this.h && Ball.y >= this.y) {
        Ball.hitY();
        this.visible = false;
      }
    }
  }
}
