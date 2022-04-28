class CannonBall {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.image = loadImage("./assets/cannonball.png");
    var options = {
      isStatic: true,
    };
    this.ball = Bodies.circle(this.x,this.y,this.radius,options);
    World.add(world,this.ball);
  }
  display(){
push();
imageMode(CENTER);
image(this.image, this.ball.position.x, this.ball.position.y, this.radius, this.radius);
pop();


  }
}
