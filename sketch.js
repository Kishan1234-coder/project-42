var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime = 0;
var background2;
var background2Image; 

function preload(){
  
  background2Image = loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_10.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}

function setup() {
  createCanvas(600,350);
  //making  the back ground 
  background2 = createSprite(0,0,600,350);
  background2.x = background2.width/2;
  background2.addImage(background2Image);
  background2.velocityX = -3;
  background2.scale =1.3; 
  

  //creating monkey ,moving the monkey and scaling the monkey 
  monkey = createSprite(80,250,20,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  //making the ground 
  ground = createSprite(400,250,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.scale = 2;
  
  //creating the obstacle group and bananaGroup 
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  //making the ground invisible 
  ground.visible = false;
  
    score = 0;
 
}

function draw() {
background("180");
  
  if(gameState === PLAY){
    //moving the ground 
    if(ground.x <0){
     ground.x = ground.width/2; 
  }
    
    if(background2.x<0){
    background2.x = background2.width/2;  
   
  }
    //making the monkey jump 
    if(keyDown("space")&& monkey.y >=100){
     monkey.velocityY = -12
  }
    monkey.velocityY = monkey.velocityY + 0.8;

    //colliding the monkey with ground 
    monkey.collide(ground);
    
    //destoying the banana 
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score = score+2;
  }
    //making the survival time 
    //stroke("black");
    //textSize(20);
    //fill("black");
    //survivalTime = Math.ceil(frameCount/frameRate())
    //text("Survival Time: "+ survivalTime,100,50);
    // bananaGroup.visible = false;
    //obstacleGroup.visible = false;
     
     spawnObstacle();
     spawnBanana();
  
    if(score === 50 ){
      gameState = END;
  }
      //making the monkey bigger 
  switch(score){
    case 10: monkey.scale = 0.12;
         break;
    case 20: monkey.scale = 0.14;
         break;
    case 30: monkey.scale = 0.16;
        break; 
    case 40: monkey.scale = 0.18;
        break;
    default: break;
   }
         
     //making the monkey smaller when it touches the obstacle 
    if(obstacleGroup.isTouching(monkey)){
       monkey.scale = 0.1;
    }
 }

  drawSprites();
  
  //making the score 
    stroke("yellow");
    textSize(17);
    fill("yellow");
    text("Score: "+ score,250,40);
  
   if(gameState === END){
     
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    background2.velocityX = 0;
    
     //making the game over text 
    stroke("white");
    textSize(50);
    fill("white");
    text("Game over",190,200);
     
     //destoying the obstacles group 
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.destroy();
     
  }
        
}
  
//making the obstacle 
function spawnObstacle(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,200,10,10);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 200;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}

//making the banana 
function spawnBanana(){
  if(frameCount % 160 === 0){
    var banana = createSprite(600,200,40,10);
    banana.velocityX = -3;
    banana.y = Math.round(random(100,120))
    banana.addImage(bananaImage);
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  }
}


    
  