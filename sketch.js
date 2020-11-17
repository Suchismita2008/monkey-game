var PLAY = 1;
var END = 0;
var gameState = 1;
var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, monsterGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(400,350,900,10);
  
  monkey = createSprite(200,200,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.y = 350;
  monkey.x = 35;
  
  foodGroup = createGroup();
  monsterGroup = createGroup();

  score = 0;
}


function draw() {
  background("white");
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival time - "+score, 130, 25);
    
  
  if(foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
    }
  
  if(monsterGroup.isTouching(monkey))
    {
      gameState = END;
    }
  
  if(gameState === PLAY)
    {
      if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
      }
       score = score + Math.round(getFrameRate()/60);
     
    }
  else if(gameState === END  )
    {
      monsterGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      
      monsterGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
monster();   
food();  
  drawSprites();
}

function food()
{
  
  if (frameCount % 80 === 0) {
     banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
   banana.lifetime = 200;
    foodGroup.add(banana);
  }
    
}

function monster()
{
  if(frameCount % 300 === 0)
    {
      obstacle = createSprite(600,320,40,10);
      obstacle.velocityX = -6;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.15;
      obstacle.lifetime = 200;
      monsterGroup.add(obstacle);
    }
}



