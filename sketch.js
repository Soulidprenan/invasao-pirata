const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var cannonBase, cannonImg;
var cannonBall;
var cannonBallGroup = [];

var barco;
var barcos = [];

var score = 0;

var somDeDerrota;
var estaGargalhando = false;
var somDeFundo;
var somDeExplosao;

// pega cada posição do spritesheet
var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;
var brokenBoatAnimation = [];
var brokenBoatSpriteData, brokenBoatSpriteSheet;

var canvas,
  angle = 20,
  tower,
  ground,
  cannon;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  cannonBase = loadImage("./assets/cannonBase.png");
  cannonImg = loadImage("./assets/canon.png");

  boatSpriteData = loadJSON("./assets/boat/ship-sailing.json");
  boatSpriteSheet = loadImage("./assets/boat/ship-sailing.png");

  brokenBoatSpriteData = loadJSON("./assets/boat/broken-ship-01.json");
  brokenBoatSpriteSheet = loadImage("./assets/boat/broken-ship-01.png");

  somDeFundo=loadSound("./assets/background_music.mp3");

  somDeExplosao=loadSound("./assets/cannon_explosion.mp3");

  somDeDerrota=loadSound("./assets/pirate_laugh.mp3");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true,
  };

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 160, 130, angle, cannonImg, cannonBase);

  angleMode(DEGREES);

  var boatFrames = boatSpriteData.frames;
  for (var i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  var brokenBoatFrames = brokenBoatSpriteData.frames;
  for (var i = 0; i < brokenBoatFrames.length; i++) {
    var pos = brokenBoatFrames[i].frame;
    var img = brokenBoatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenBoatAnimation.push(img);
  }
}

function draw() {
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();

  showNavios();

  //cannonBall.display();
  for (var i = 0; i < cannonBallGroup.length; i = i + 1) {
    if (cannonBallGroup[i]) {
      cannonBallGroup[i].display();
      if (
        cannonBallGroup[i].ball.position.x > width ||
        cannonBallGroup[i].ball.position.y >= height - 50
      ) {
        cannonBallGroup[i].removeBall(i);
      }
      this.colisionBoat(i);
    }
  }
  // concatenação
  // `Pontuação: ${score}`
  push();
  textSize(30);
  fill("red");
  text("pontuação: "+ score ,width - 300,50 );
  pop();

  // true <> false
  if(!somDeFundo.isPlaying()){
    somDeFundo.play();
    // somDeFundo.setVolume(0.10);
  }
  
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW) {
    cannonBallGroup[cannonBallGroup.length - 1].shoot();
    somDeExplosao.play();
  }

  // "2" == 2
  // "2" === 2
}

function showNavios() {
  if (barcos.length > 0) {
    // perguntar se o anterior já passou x pixels
    if (
      barcos[barcos.length - 1] == undefined ||
      barcos[barcos.length - 1].navio.position.x < width - 300
    ) {
      var options = [-60, -40, -70, -20];
      barco = new Navio(
        width,
        height - 60,
        170,
        170,
        Math.round(random(options)),
        boatAnimation
      );
      barcos.push(barco);
    }
    for (var i = 0; i < barcos.length; i = i + 1) {
      if (barcos[i]) {
        barcos[i].display();
        barcos[i].animate();
        Body.setVelocity(barcos[i].navio, { x: -0.9, y: 0 });
        var collision = Matter.SAT.collides(
          tower,
          barcos[i].navio
        );
        if (collision.collided == true){
          this.gameOverAlert();
          if (!estaGargalhando){
            somDeDerrota.play();
            estaGargalhando = true;
          }


        }
      }
    }

    // velocidade
  } else {
    // cria direto
    barco = new Navio(width, height - 60, 170, 170, -60, boatAnimation);
    barcos.push(barco);
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y, 30);
    cannonBallGroup.push(cannonBall);
    cannonBall.trajetoria = [];

  }
}

function colisionBoat(index) {
  for (var i = 0; i < barcos.length; i = i + 1) {
    if (barcos[i] != undefined && cannonBallGroup[index] != undefined) {
      var colision = Matter.SAT.collides(
        cannonBallGroup[index].ball,
        barcos[i].navio
      );

      if (colision.collided == true) {
        World.remove(world, cannonBallGroup[index].ball);
        delete cannonBallGroup[index];
        barcos[i].remove(i);
        score = score + 5;
      }
    }
  }
}


function gameOverAlert(){
  swal({
    title: "Fim de Jogo",
    text: "Obrigado por jogar!!",
    imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText:"Jogar Novamente",
    
  },
  (isConfirm) => {
    if(isConfirm == true) {
      location.reload();
    }
  });
}
