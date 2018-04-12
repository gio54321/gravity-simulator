function Planet(x, y){
  this.pos = createVector(x, y);
  this.mass = 1000;

  this.draw = function(){
    fill(color("green"));
    ellipse(this.pos.x, this.pos.y, 10);
  }
}

function Particle(x, y, initVel){
  this.pos = createVector(x, y);
  this.vel = (initVel)? initVel : p5.Vector.random2D();
  this.vel.mult(2.2);
  this.acc = createVector();

  this.mass = 500;
  this.frictionRatio = frictionRatio;

  this.applyForce = function(force){
    this.acc.add(force.div(this.mass));
  }

  this.gravitationalForce = function(planet){
    var tmpForce = p5.Vector.sub(planet.pos, this.pos);
    tmpForce.setMag((this.mass * planet.mass) / (p5.Vector.dist(planet.pos, this.pos) * p5.Vector.dist(planet.pos, this.pos) ));
    this.applyForce(tmpForce);
  }

  this.update = function(){
    this.vel.mult(this.frictionRatio);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.draw = function(){
    fill(color('rgba(255,255,255,1)'));
    stroke(color('rgba(255,255,255,1)'));
    ellipse(this.pos.x, this.pos.y, 10);

    fill(color("green"));
    push();
    translate(this.pos.x, this.pos.y);

    push();
      rotate(this.vel.heading()-PI/2)
      line(0,0,0, this.vel.mag()*20);;
      triangle(0, this.vel.mag()*20, 5, this.vel.mag()*20-5, -5, this.vel.mag()*20-5);
      rotate(PI/2);
      textSize(20);
      text("V",this.vel.mag()*20 - 15, -5);
    pop();

    push();
      rotate(this.acc.heading()-PI/2);
      line(0,0,0, this.acc.mag()*800);
      triangle(0, this.acc.mag()*800 , 5, this.acc.mag()*800-5, -5, this.acc.mag()*800-5);
      rotate(PI/2);
      textSize(20);
      text("F",this.acc.mag()*800 - 15, -5);
    pop();
    pop();

  }
}
