class CannonBall {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.image = loadImage("./assets/cannonball.png");
    var options = {
      isStatic: true,
    };
    this.ball = Bodies.circle(this.x, this.y, this.radius, options);
    World.add(world, this.ball);
  }
  display() {
    push();
    imageMode(CENTER);
    image(
      this.image,
      this.ball.position.x,
      this.ball.position.y,
      this.radius,
      this.radius
    );
    pop();
  }
  shoot() {
    var newAngle = (cannon.angle - 28) * (3.14/180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.3);
    Body.setStatic(this.ball, false);
    Body.setVelocity(this.ball, {x: velocity.x * (180/3.14), y:velocity.y * (180/3.14)});
  }
}
