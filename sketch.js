function customImage(){
  
  // Window
  noStroke();  
  fill(211);
  rect(166, 175, 70, 50);
  
  fill(128);
  rect(168, 177, 68, 48)
  
  fill(211);
  rect(170, 180, 20, 20);
  rect(170, 202, 20, 20);
  rect(192, 180, 20, 20);
  rect(192, 202, 20, 20);
  rect(214, 180, 20, 20);
  rect(214, 202, 20, 20);
  
  
  fill(173, 216, 230);
  rect(170, 180, 18, 18);
  rect(170, 202, 18, 18);
  rect(192, 180, 18, 18);
  rect(192, 202, 18, 18);
  rect(214, 180, 18, 18);
  rect(214, 202, 18, 18);
  images.push(get(0,0,width,height));
}




class antiGravMonsObj{
  constructor(x, y, h){
    this.position = new p5.Vector(x,y);
    this.velocity = new p5.Vector(0, 0);
    this.heightBuild = h;
    this.acceleration = new p5.Vector(0, -0.1);
    this.size = 20;
    this.bounceCoeff = -(100 - this.size) / 100;
    this.heightToJump =  400 - this.heightBuild - 60;
    this.falling = false;
  }
  
  updatePosition() {
    
    if(keyArray[32] == 1){
      this.jump();
    }
    
    if(keyArray[LEFT_ARROW] == 1){
      this.position.x--;
    }
    if(keyArray[RIGHT_ARROW] == 1){
      this.position.x++;
    }
    
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if (this.position.y > 200) {
      this.position.y = this.heightToJump - this.size/2;
      this.velocity.y *= this.bounceCoeff;
      
    }else if(this.position.y < 0){
      this.position.y = 0;
    }
      
    if(this.velocity.y < 0){
      this.falling = true;
    }else{
      this.falling = false;
    }
  }
  
    jump(){
      if (this.position.y == 0) { 
        this.velocity.y = sqrt(-1 * this.heightBuild * 2 * this.acceleration.y);

      }
    }

  
  
  draw(){
        
    push();
    strokeWeight(1)
    translate(this.position.x, this.position.y + 3);
    rotate(180);
    fill(0,255,0);
    quad( + 6,  - 6,  - 6, -6, - 9, + 6,  + 9,  + 6);
    fill(220);
    stroke(0);
    square(-6, -1, 4.5);
    square(+4, -1, 4.5);
    fill(0,255,0);
    if(this.falling){
      triangle(-9, +6, 0, +6, -9, +4);
      triangle(+9, +6, 0, +6, +9, +4);
    }else{
      triangle(-9, +6, 0, +6, -9, +14);
      triangle(+9, +6, 0, +6, +9, +14);
    }
    pop();
    

  }
} // antiGravMonsObj

class buildingObj{
  constructor(x, y){
    this.heightBuild = random(50, 250);
    this.position = new p5.Vector(x,y - this.heightBuild);
    this.velocity = new p5.Vector(-1, 0);
    this.acceleration = new p5.Vector(0, -0.1);
    this.widthBuild = 60;
    this.deleteThis = false;
    this.createNewBuild = true;
    this.adjustScore = true;
    this.colorBuild = [random(0, 255), random(0, 255), random(0, 255)]
    this.cannon = new cannonObj(this.position.x + 150, 380, this.heightBuild);
  }
  
  updatePosition(){
    if(this.position.x < -170){
       this.deleteThis = true;
    }
    if(this.position.x < 150 && this.createNewBuild){
       buildings.push(new buildingObj(400, 400));
       this.createNewBuild = false;
    }
    this.position.x -= 2;
    this.cannon.position.x -= 2;
    this.cannon.ball.position.x -= 2;
  }
  
  draw(){
    strokeWeight(2);
    stroke(128);
    fill(this.colorBuild);
    rect(this.position.x, this.position.y, this.widthBuild, this.heightBuild);
    
    var howManyWins = (this.heightBuild - 40) / 15; // Wins = Windows
    
    for(var i = 0; i < howManyWins; i++){
      image(images[0], this.position.x - 33, (this.position.y - 28) + (i * 15), 100, 75);
      image(images[0], this.position.x - 7, (this.position.y - 28) + (i * 15), 100, 75);
    }
    
    fill(128);
    stroke(0);
    strokeWeight(0.5);
    rect(this.position.x + 25, 385, 10, 15);
    
  }
} // buildingObj


class cannonObj{
  constructor(x, y, h){
    this.position = new p5.Vector(x,y);
    this.heightBuild = h;
    this.oneRadian = 0.0174533;
    this.angle = random(-45, -10);
    this.ball = new ballObj(this.position.x, this.position.y, this.angle, this.heightBuild);
  }
  
  draw(){
    
    fill(0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    ellipse(0, 0, 25, 25);
    quad(-10, -35,10, -35, 12.5, 0, -12.5, 0);
    pop();


    noStroke();
    fill(70);
    push();
    translate(this.position.x, this.position.y);
    rect(-5, 0, 10, 15);
    rect(-20, 15, 40, 3);
    fill(128);
    circle(0, 0, 10);
    circle(-20, 15, 12);
    circle(20, 15, 12);
    fill(0);
    circle(-20, 15, 4);
    circle(20, 15, 4);
    pop();
    
  }
  
} // cannonObj


class ballObj{
  constructor(x, y, a, h){
    this.angle = a;
    this.position = new p5.Vector(x + (35 * cos(this.angle - 90)),y + (35 * sin(this.angle - 90)));
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0.05);
    this.bounceCoeff = -(100 - 20) / 100;
    this.heightToJump = h;
    this.intialVelocity = -sqrt((this.heightToJump + 60) * 2 * this.acceleration.y);
    this.rotationAngle = 10;
    this.fired = false;
    this.toDraw = true;
  }
  
  updatePosition(){  
    
    if(this.position.x < 375 && !this.fired ){
      this.velocity.y =  this.intialVelocity * sin(this.angle + 90);
      this.velocity.x =  this.intialVelocity * cos(this.angle + 90);
      this.fired = true;
    }
    
    if(this.fired){
      
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
    }
  }
  
  draw(){
    if(this.toDraw){
      angleMode(DEGREES);
      push();
      translate(this.position.x, this.position.y);
      if(this.fired){
        rotate(this.rotationAngle * this.velocity.y * this.velocity.y * this.velocity.y);
      }
      push();
      fill(255)
      strokeWeight(1);
      circle(0, 0, 20.5);
      rotate(18)
      fill(0);
      polygon(0, 0, 4, 5);
      pop()


      fill(255);
      strokeWeight(1);
      rotate(-18)
      polygon(2, -6, 4, 5);
      polygon(2, 6, 4, 5);
      polygon(6, 0, 4, 5);
      polygon(-5, -4, 4, 5);
      polygon(-5, 4, 4, 5);
      pop();
    }
  }
  
} // ballObj


class flappyBirdObj {
  constructor(x,y) {
    this.position = new p5.Vector(x,y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0.2);
    this.size = 30;
    this.bounceCoeff = -(100 - this.size) / 100;
    this.c1 = random(0, 255);
    this.c2 = random(0, 255);
    this.c3 = random(0, 255);
    this.isJumping = false; 
    this.gameOver = false;
    this.gameWon = false;
    this.canJumping = true;
    this.dodgeLeft = false;
    this.dodgeRight = false;
    this.state = [new borderState(), new buildState(), new monstState(), new ballState(), new noThreatState()];
    this.currState = 4;
    this.stateDis = 4;
  }
 
  updatePosition() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
//     if (this.position.y > (height - this.size/2)) {
//       this.position.y = height - this.size/2;
//       this.velocity.y *= this.bounceCoeff;
      
//     }
    if(this.velocity.y > 0){
       this.isJumping = false;
     }  
  }
  
  jump(){
    if (!this.isJumping && this.canJumping) { 
      this.velocity.y = -5; 
      this.isJumping = true; 
    }
  }
  
  moveLeft(){
    this.position.x--;
  }  
   moveRight(){
    if(this.position.x < 185){
      this.position.x += 3;
    }
  } 
  changeState(x) {
    this.currState = x;
  }
  
  draw() {
    angleMode(DEGREES);
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(3)
    ellipse(this.position.x, this.position.y, 30, 26)

    fill(255); // The wing
    push();
    translate(this.position.x - 9, this.position.y);
    if(this.isJumping){
      rotate(-20);
    }else{
      rotate(20);
    }
    ellipse(0, 0, 18, 12);
    pop()


    push();
    translate(this.position.x + 9, this.position.y - 4);
    rotate(50);
    ellipse(0, 0, 12, 9);
    fill(0);
    ellipse(2, -2, 2, 1);
    pop()

  }
} // flappyBirdObj


/*
State classes
*/


class borderState{
  constructor(){}
  
  execute(me){
    if(me.position.y < 80){
      me.canJump = false;
    }
    
  }
} // borderState

class buildState{
  constructor(){}
  
  execute(me){
    me.jump();
  }
  
  
  
} // buildState

class monstState{
  constructor(){
    this.monstInJump = false;
  }
  
  execute(me){
    
    var xVect = me.position.x - monster.position.x
    
    // Check quadrants around the bird
    if(me.position.y > monster.position.y && Math.sign(xVect) == -1){ 
       me.moveRight();
    }else if(me.position.y > monster.position.y && Math.sign(xVect) == 1){ // behind and above
      if(monster.velocity.y > 0){ // monster jumping towards bird
        me.moveRight();
        me.moveRight();
      }
    }else if(me.position.y < monster.position.y && Math.sign(xVect) == -1){
      if(monster.velocity.y > 0){
        me.moveRight();
        me.jump();
      }else{
        me.moveLeft();
      }
    }else if(me.position.y < monster.position.y && Math.sign(xVect) == -1){
        me.moveRight();
        me.jump();
    }
     
  }
  
  
} // monstState


class ballState{
  constructor(){}
  
  execute(me){
    if(me.dodgeLeft){
       me.moveLeft();
    }
    if(me.canJump){
      me.jump();
    }else{
      me.moveLeft();
    }
    if(me.dodgeRight){
       me.moveRight();
    }
  
    
  }
  
} // ballState

class noThreatState{
  constructor(){
    
  }
  
  execute(me){
    if(me.position.y > 200){
       me.jump();
       me.moveRight();
    }
    
  }
} // noThreatState


/*
End state classes
*/







/* 
Section for helper functions
*/

function checkState() {

  
 
  


  // Check Building State
  for(var i = 0; i < buildings.length; i++){

      xVector = buildings[i].position.x - bird.position.x ;
      secondXVector = buildings[i].position.x + 80 - bird.position.x ;
      changeInY = buildings[i].position.y - bird.position.y - 10;

      ballXVector = buildings[i].cannon.ball.position.x - bird.position.x ;
      distance = dist(bird.position.x, bird.position.y, buildings[i].cannon.ball.position.x, buildings[i].cannon.ball.position.y);
    
      bird.dodgeLeft = false;
      bird.dodgeRight = false;
    
      if(distance < 50 && Math.sign(ballXVector) == 1){
        if(buildings[i].cannon.ball.velocity.y < 0){
          if(buildings[i].cannon.ball.position.y >= bird.position.y){
             bird.dodgeLeft = true;
          }
          if(buildings[i].cannon.ball.position.y < bird.position.y - 10){
              bird.canJump = false;
              bird.dodgeLeft = true;
          }
        }
        bird.changeState(3);
        return;
      }
    
      if(Math.sign(secondXVector) == 1 && Math.sign(xVector) == -1){
        if(changeInY < 15){
          bird.changeState(1);
          return;
        }
         
      }

      if(abs(xVector) < 150 && Math.sign(xVector) == 1){
        if(bird.position.y > buildings[i].position.y - 40){
          bird.changeState(1);
          return;
        }
      }


      
      
  }
  
  
  
  
  // Check Border State
  if(bird.position.y > 290 || bird.position.y < 70){
     bird.changeState(0);
    return;
  }else{
    bird.canJump = true;
  }

 if(dist(bird.position.x, bird.position.y, monster.position.x, monster.position.y) < 80){
    print("HERE");
    bird.changeState(2);
    return;
     
  }
  
  
  
  
  // Default State: No Threats
  bird.changeState(4);
}



function checkCollisionMonsterBuilding(){
  
   
  for(var i = 0; i < buildings.length; i++){
    
    // monster collision
    if(dist(bird.position.x, bird.position.y, monster.position.x, monster.position.y) < 20){
      bird.gameWon = true;
    }
    
    
    // building collision with bird
      if(bird.position.x + 15 > buildings[i].position.x && bird.position.x - 12 < buildings[i].position.x + 60){ 
         if(bird.position.y + 15 > buildings[i].position.y){
            bird.gameWon =   true;
         }
      }

      // building collision with monster
      if(monster.position.x + 10 > buildings[i].position.x && monster.position.x - 12 < buildings[i].position.x + 60){ 
         if(monster.position.y + 10 > buildings[i].position.y){
            bird.gameOver =   true;
         }
      }
    
  }
  
  // border collision 
  
  if(bird.position.y > 384 || bird.position.y < 16){
     bird.gameWon = true;
  }

  if(monster.position.x > 392 || monster.position.x < 10){
     bird.gameOver = true;
  }
  
  
} // checkCollisionMonsterBuilding

function checkBallCollision(){
  for(var i = 0; i < buildings.length; i++){ // Ball index
    for(var j = 0; j < buildings.length; j++){ // Building index
      
      // Check if the ball hits a side of a building 
      if(buildings[i].cannon.ball.position.x - 10 < buildings[j].position.x + 60 && buildings[i].cannon.ball.position.x + 10 > buildings[j].position.x)
          if(buildings[i].cannon.ball.position.y > buildings[j].position.y){
            buildings[i].cannon.ball.velocity.x *=  -1;
          }
      }

      // Check if the ball hits the bottom of the canvas
      if(buildings[i].cannon.ball.position.y + 10 > 400){
         buildings[i].cannon.ball.toDraw = false;
      }
    
      // Check if the ball hits the bird
      if(dist(buildings[i].cannon.ball.position.x, buildings[i].cannon.ball.position.y, bird.position.x, bird.position.y) < 20){
        bird.gameWon = true;
      }
    
      // Check if the ball hits the monster
      if(dist(buildings[i].cannon.ball.position.x, buildings[i].cannon.ball.position.y, monster.position.x, monster.position.y) < 20){
        bird.gameOver = true;
      }


    }
  
  
  
  
} // checkBallCollision



function displayScore(){
  textSize(12)
  textAlign(RIGHT)
  text("Score: " + score, 370, 10);
}

function displayState(){
  textSize(12)
  textAlign(LEFT)
  if(frameCount % 10 == 0){
    bird.stateDis = bird.currState;
  }  
  text("State [" + bird.stateDis +"]", 10, 10);
}

// Check building position then if it is past the left border delete it from the list
function checkBuildingPos(){
  for(var i = 0; i < buildings.length; i++){
    if(buildings[i].deleteThis){
      buildings.splice(i, 1); //delete the building when the flag is set
    }
    if(buildings[i].position.x < -50 && buildings[i].adjustScore){
      score++;
      buildings[i].adjustScore = false; // Only give one point per building
    }
  }
}

// Taken from p5.js reference example 
// Link: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


function keyPressed() {
  keyArray[keyCode] = 1;
} // func keyreleased
function keyReleased() {
  keyArray[keyCode] = 0;
} // func keyReleased

function mouseClicked(){
    if(mouseX < 400 && mouseX > 0  ){
      if(mouseY < 400 && mouseY > 0){
        resetGame();
    }
  }
} // func mouseClicked

function resetGame() {
    // Reset game state
  if(!startGame){
    bird = new flappyBirdObj(100, 200);
    buildings = [];
    score = 0;
    for(var i = 0; i < 1; i++){
      buildings.push(new buildingObj(350, 400))
    } 
    monster = new antiGravMonsObj(200, 0, 200);
    startGame = true;
  }
}

/*
End section for helper functions
*/

var startGame = false;
var bird;
var buildings = [];
var score = 0;
var images = [];
var monster;
var keyArray = [];

function setup() {
    createCanvas(400, 400);
    bird = new flappyBirdObj(100, 200);
    for(var i = 0; i < 1; i++){
      buildings.push(new buildingObj(350, 400))
    } 
    customImage();
    monster = new antiGravMonsObj(200, 0, 200);
}

function draw() {
  if(startGame){
    checkCollisionMonsterBuilding();
    if(bird.gameOver){
      textSize(36);
      textAlign(CENTER);
      text("Game Over", 200, 200);
      startGame = false;
    }else if(bird.gameWon){
      textSize(36);
      textAlign(CENTER);
      text("You Won", 200, 200);
      startGame = false;
    }else{
      background(173, 216, 230);
      checkState();
      bird.state[bird.currState].execute(bird);
      bird.updatePosition();
      bird.draw();
      checkBuildingPos();
      checkBallCollision();
      displayScore();
      displayState();
      monster.draw();
      monster.updatePosition();
      for(var i = 0; i < buildings.length; i++){
        buildings[i].draw();
        buildings[i].updatePosition();
        buildings[i].cannon.ball.draw();
        buildings[i].cannon.ball.updatePosition();
        buildings[i].cannon.draw();

      }
    }
  }
}
