const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var cannonBase,cannonImg;
var cannonBall;
var cannonBallGroup = [];

var canvas, angle = 20, tower, ground, cannon;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  cannonBase = loadImage("./assets/cannonBase.png");
  cannonImg = loadImage("./assets/canon.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180,110,160,130,angle,cannonImg,cannonBase); 
  

  angleMode(DEGREES);
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  cannon.display();
  //cannonBall.display();
  for (var i = 0; i < cannonBallGroup.length; i = i + 1){
    if (cannonBallGroup[i]){
      cannonBallGroup[i].display();


    }


  }
}


function keyReleased() {
  if(keyCode == RIGHT_ARROW) {
 cannonBallGroup[cannonBallGroup.length - 1].shoot();
  }

  // "2" == 2
  // "2" === 2
}

function keyPressed(){
if(keyCode == RIGHT_ARROW) {
  cannonBall = new CannonBall(cannon.x,cannon.y,30);
cannonBallGroup.push(cannonBall);
console.log(cannonBallGroup);


}






}