var road_img, car_img, cat_img, dog_img, elephant_img, kid_img, old_people_img, pot_hole_img,
 road_barrier_img, tree_img, heart_img, gameOver_img, carWash_img, fuel_img, mechanic_img, spanner_img;
var car, lives, i, xPos, gameState;
var obstacleGroup, boosterGroup;
var gameOver_sound, booster_sound, hit_sound;

function preload() {
  road_img = loadImage('images/roadImage.jpg');

  car_img = loadImage('images/car.png');

  cat_img = loadImage('images/cat.png');
  dog_img = loadImage('images/dog.png');
  elephant_img = loadImage('images/elephant.png');
  kid_img = loadImage('images/kid.png');
  old_people_img = loadImage('images/old_people.png');
  pot_hole_img = loadImage('images/pot_hole.png');
  road_barrier_img = loadImage('images/road_barrier.png');
  tree_img = loadImage('images/tree.png');
  heart_img = loadImage('images/heart.png');

  gameOver_img = loadImage('images/gameOver.png');

  gameOver_sound = loadSound('sounds/gameOver.wav');
  booster_sound = loadSound('sounds/booster.wav');
  hit_sound = loadSound('sounds/hit.wav');

  carWash_img = loadImage('images/carWash.png');
  fuel_img = loadImage('images/fuel.png');
  mechanic_img = loadImage('images/mechanic.png');
  spanner_img = loadImage('images/spanner.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  car = createSprite(width/2, height - 100);
  car.addImage(car_img);
  car.scale = 0.7;
  // car .debug = true;
  car.setCollider('rectangle', 0, 0, 150, 350);

  obstacleGroup = new Group();
  boosterGroup = new Group();

  lives = 3;
  gameState = 'play';
}

function draw() {
  background(220);

  imageMode(CENTER);
  image(road_img, width/2, height/2, width/3, height*15);

  if(gameState == 'play'){    
    navigationCar();
    camera.position.y = car.position.y;
  
    if(frameCount%90 == 0){      
      chooseObtsacle_or_Booster();
    }

    if(obstacleGroup.isTouching(car)){
      gameState = 'hit';      
    }

    if(boosterGroup.isTouching(car)){
      gameState = 'bonus';      
    }
  }

  if(gameState == 'hit')  {
    hit();
  }

  if(gameState == 'bonus'){
    bonus();
  }

  else if(gameState == 'end'){
    image(gameOver_img, width/2, car.y - 350);
  }

  drawSprites();

  displayLives();
}

function navigationCar(){
  if(keyDown('up')){
    car.y -= 5;
  }
  if(keyDown('left')){
    car.x -= 5;
  }
  if(keyDown('right')){
    car.x += 5;
  }
}

function chooseObtsacle_or_Booster(){ 
  switch(Math.round(random(1, 2))){
    case 1: spawnObstacles();
    break;

    case 2: spawnBooster();
    break;
  }
}

function hit(){
  obstacleGroup.destroyEach();
  lives --;
  if(lives == 0){
    gameState = 'end';
    gameOver_sound.play();
  }
  else{
    hit_sound.play();
    gameState = 'play';
  }
}

function bonus(){
  boosterGroup.destroyEach();
  if(lives < 5){
     lives ++;
  }
  gameState = 'play';
  booster_sound.play();
}

function displayLives(){
  xPos = width - 300
  for(i = 0; i < lives; i++){
    image(heart_img, xPos, car.y - 450, 50, 50);
    xPos += 60;
  }
}

function spawnBooster(){
  var booster = createSprite(width/2 - 250, car.y - 500);
  //booster.debug = true;
  
  switch(Math.round(random(1,4))){
    case 1: booster.addImage(carWash_img);
    booster.scale = 0.7;
    break;

    case 2: booster.addImage(fuel_img);
    booster.setCollider('rectangle', -50, 0, 130, 180);
    booster.scale = 0.5;
    break;

    case 3: booster.addImage(mechanic_img);
    booster.scale = 0.5;
    break;

    case 4: booster.addImage(spanner_img);
    booster.setCollider('rectangle', -30, 0, 150, 150);
    booster.scale = 0.7;
    break;
  }

  booster.life = 500;
  boosterGroup.add(booster);
}

function spawnObstacles(){
  var obstacle = createSprite(width/2, car.y - 500);
  //obstacle.debug = true;
 
  switch(Math.round(random(1, 8))){
    case 1: obstacle.addImage(cat_img);
    obstacle.scale = 0.4;
    break;

    case 2: obstacle.addImage(dog_img);
    obstacle.x = width/2 + 100;
    obstacle.velocityX = -2;
    obstacle.scale = 0.4;
    break;

    case 3: obstacle.addImage(elephant_img);
    obstacle.scale = 0.6;
    obstacle.setCollider('circle', 0, 0, 100);
    break;

    case 4: obstacle.addImage(kid_img);
    obstacle.x = width/2 + 100;
    obstacle.velocityX = -2;
    obstacle.scale = 0.6;
    obstacle.setCollider('rectangle', 0, 0, 80, 200);
    break;

    case 5: obstacle.addImage(old_people_img);
    obstacle.x = width/2 + 100;
    obstacle.velocityX = -2;
    obstacle.scale = 0.6;
    break;

    case 6: obstacle.addImage(pot_hole_img);
    obstacle.scale = 0.8;
    break;

    case 7: obstacle.addImage(road_barrier_img);
    obstacle.setCollider('rectangle', 0, 0, 200, 350);
    obstacle.scale = 0.4;
    break;

    case 8: obstacle.addImage(tree_img);
    obstacle.setCollider('circle', 0, 0, 80);
    obstacle.x = width/2 + 80;
    break;
  }

  car.depth = obstacle.depth + 1;
  obstacle.life = 500;
  obstacleGroup.add(obstacle);
}

