class Cannon {
  constructor(x, y, width, height, angle, image, baseImage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.image = image;
    this.baseImage = baseImage;
  }
  display() {
    if (keyIsDown(UP_ARROW)&& this.angle > -30){
      this.angle  -= 1;



    }
    if(keyIsDown(DOWN_ARROW)&& this.angle < 70){
      this.angle += 1;


    }
    push();
    
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
    image(this.baseImage, 70, 20, 200, 200);
  }
}
