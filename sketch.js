var PLAY = 1;
var END = 0;
gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var backgroundImage

function preload() 
{

  monkey_running =
    loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup()
{
  createCanvas(600, 600);
  PLAY = 1;
  GameState = PLAY;
  END = 0;

  bananaGroup = new Group();
  obstacleGroup = new Group();

  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  
  invisible = createSprite(250, 407, 1000, 10);
  invisible.x = ground.width / 2;
}

function draw() {
  background("green");
  if (GameState === PLAY) 
  {
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    if (invisible.x < 0)
    {
      invisible.x = invisible.width / 2;
    }
    invisible.velocityX = -2;
    if (keyDown("space") && monkey.isTouching(ground)) 
    {
      monkey.velocityY = -20;
    }
    score = Math.round(frameCount / 3);
    survivalTime = Math.round(frameCount / frameRate());
    ground.velocityX = -(5 + 2 + score / 100);
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
    }
    Food();
    Obstacle();
    if (monkey.isTouching(obstacleGroup)) 
    {
      GameState = END;
    } 
    else if (GameState === END)
    {
      ground.velocityX = 0;
      invisible.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      bananaGroup.setlifetimeEach(-1);
      obstacleGroup.setlifetimeEach(-1);
    }
    monkey.velocityY = monkey.velocityY + 0.9;
    monkey.collide(invisible);
    stroke("black");
    textSize(20);
    fill("red");
    text("score:" + score, 400, 50);
    stroke("black");
    textSize(20);
    fill("black");
    text("survival Time:" + survivalTime, 100, 50);
    drawSprites();
  }
}

function Food() 
{
  if (frameCount % 80 === 0)
  {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 + score / 100);
    banana.y = Math.round(random(120, 230));
    banana.scale = 0.1;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);
  }
}

function Obstacle() 
{
  if (frameCount % 300 === 0) 
  {
    var obstacle = createSprite(500, 360, 23, 32);
    obstacle.velocityX = -(5 + 2 + score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200);
  }
}