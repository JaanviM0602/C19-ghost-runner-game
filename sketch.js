var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = createGroup();

}

function draw() {
  background(0);
  
  if(gameState=="play") {


 

  if(tower.y > 600){
      tower.y = 300
    }
     
    if(keyDown("left_arrow")) {
      ghost.x -= 3
    }
    if(keyDown("right_arrow")) {
      ghost.x += 3
    }
    if(keyDown("space")) {
      ghost.velocityY = -10;
    }
    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      gameState="end"
      ghost.destroy();
    }
    ghost.velocityY += 0.8;
    spawn_doors();
    drawSprites();
  }
  if(gameState=="end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameover", 230,250);
  
  }

}


function spawn_doors() {
    if(frameCount%240==0) {
      r = Math.round(random(120,400));
      door = createSprite(r,-50);
      door.addImage(doorImg);
      door.velocityY = 1;

      climber = createSprite(r,10);
      climber.addImage(climberImg);
      climber.velocityY = 1;
      door.lifetime = 800;
      climber.lifetime = 800;
      doorsGroup.add(door);
      climbersGroup.add(climber);

      invisibleBlock = createSprite(r,15,climber.width,2);
      invisibleBlock.visible = false;
      invisibleBlock.velocityY = 1;
      invisibleBlockGroup.add(invisibleBlock);
      invisibleBlock.lifetime = 800;
      ghost.depth = door.depth;
      ghost.depth++;
    }
}