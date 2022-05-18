class Navio {
  constructor(x, y, width, height, navioPos, animation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.navioPos = navioPos;
    this.animation = animation;
    this.speed = 0.05;

    this.navio = Bodies.rectangle(this.x, this.y, this.width, this.height);
    World.add(world, this.navio);

    this.image = loadImage("./assets/boat.png");
  }
  animate() {
    this.speed = this.speed + 0.05;
  }
  display() {
    var position = this.navio.position;
    var boatAngle = this.navio.angle;
    var index = floor(this.speed % this.animation.length);
    push();
    translate(position.x, position.y);
    rotate(boatAngle);
    imageMode(CENTER);
    image(this.animation[index], 0, this.navioPos, this.width, this.height);
    pop();
  }
  remove(index) {
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    if (barcos[index]) {
      World.remove(world, barcos[index].navio);
      // arrow function / função anônima
      setTimeout(() => {
        delete barcos[index];
      }, 2000);
    }
  }
}
