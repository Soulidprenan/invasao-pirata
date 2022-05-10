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
    this.trajetoria = [];
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
    if (
      this.ball.position.x > 0 &&
      this.ball.position.x > 300 &&
      this.ball.position.y < 565
    ) {
      this.trajetoria.push([this.ball.position.x, this.ball.position.y]);
    }
    for (var i = 0; i < this.trajetoria.length; i = i + 1) {
      image(this.image, this.trajetoria[i][0], this.trajetoria[i][1], 5, 5);
    }
  }
  shoot() {
    var newAngle = (cannon.angle - 28) * (3.14 / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.3);
    Body.setStatic(this.ball, false);
    Body.setVelocity(this.ball, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14),
    });
  }
  removeBall(index) {
    if (cannonBallGroup[index]) {
      World.remove(world, cannonBallGroup[index].ball);

      setTimeout(() => {
        delete cannonBallGroup[index];
      }, 1000);
    }
  }
}
