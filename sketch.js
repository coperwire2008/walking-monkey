var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup
var survivalTime =0, score ;
var ground, invisibleGround, groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 200);
  
  //Local scope
  
 
  

  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
 
  

  monkey.scale = 0.1;
  
  ground = createSprite(200,180,10000,20);

 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
 monkey.setCollider("rectangle",0,100,700,700);
  monkey.debug = true;
  
  score = 0;
  
}

function draw() {
  
  background(180);
   //console.log(message);
  
  //displaying score

  
 
 
 
  
  
  if(gameState === PLAY){
   
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
      text("SURVIVAL TIME: "+ score,235,15);
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")){
    monkey.velocityY = -15;
     }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  

  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnBanana();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
      
    }
      if(monkey.isTouching(bananaGroup)){
     score = score+1
   }
   
  }
   else if (gameState === END) {
      
      ground.velocityX = 0;
      monkey.velocityY = 0
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
  
     
     
     if(keyDown("r")){
       reset();
        }
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  

  drawSprites();
}
function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0;  
}



function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.addImage("hitting",obstaclesImage);
   obstacle.scale = 0.1
    obstacle.velocityX = -(6 + score/100);
   
   obstacle.x = 600;
   
   obstaclesGroup.add(obstacle);
   if(monkey.isTouching(obstaclesGroup)){
     
     reset();
     
   }
   
   
   
 }
} 

function spawnBanana(){
 if (frameCount % 80 === 0){
   var banana = createSprite(600,50,10,10);
   banana.addImage("yolo",bananaImage);
   banana.scale = 0.1
   banana.velocityX = -(6 + score/100);
   
   banana.x = 600;
   
  bananaGroup.add(banana);
 
   
 }
}