class Navio {
  constructor(x, y, width, height, navioPos) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.navioPos = navioPos;

    this.navio = Bodies.rectangle(this.x, this.y, this.width, this.height);
    World.add(world, this.navio);

    this.image = loadImage("./assets/boat.png");
  }
  display() {
    var position = this.navio.position;
    var boatAngle = this.navio.angle;
    push();
    translate(position.x, position.y);
    rotate(boatAngle);
    imageMode(CENTER);
    image(this.image, 0, this.navioPos, this.width, this.height);
    pop();
  }
}
