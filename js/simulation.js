var planets = [],
  particle = [],
  planetCount = 1,
  particleCount = 1,
  dots = [],
  first = true
  particleInteraction = true,
  frictionRatio = 1,
  framerate = 0,
  showFrameRate = false,
  framerateSet = 60;

function setup() {
  var cnv = createCanvas(1000, 600);
  cnv.parent("my-canvas-div");

  if (first) {
    for (var i=0; i<planetCount; i++){
      planets[i] = new Planet(width/2, height/2);
    }
    for (var i=0; i<particleCount; i++){
      particle[i] = new Particle(random(100, width-100), random(100, height-100));
    }

    first = false;
  }
  //frameRate(30);
  background(51);
  ellipseMode(CENTER);
}

function draw() {
  background(51);
  stroke(color("white"));
  fill(color("white"));
  frameRate(framerateSet);
  if(showFrameRate){
    if(frameCount % 10 == 0){
      framerate = frameRate().toFixed(1)
    }
    text(framerate + " fps", 20, 20);
  }

  for (var y=0; y<particleCount; y++){
    for (var i=0; i<planetCount; i++){
      particle[y].gravitationalForce(planets[i]);
      if(particle[y].pos.dist(planets[i].pos) < 10){
        for (var a=0; a<particleCount; a++){
          particle[a] = new Particle(random(100, width-100), random(100, height-100));
        }
       dots = [];
      }
      planets[i].draw();
    }
    if(particleInteraction){
      for (var i=0; i<particleCount; i++){
        if(i!=y){
          particle[y].gravitationalForce(particle[i]);
        }
        if(i>0 && particle[i].pos.dist(particle[i-1].pos) < 10){
          for (var a=0; a<particleCount; a++){
            particle[a] = new Particle(random(100, width-100), random(100, height-100));
          }
         dots = [];
        }
      }
    }


    particle[y].draw();

    particle[y].update();
    dots.push({x:particle[y].pos.x, y:particle[y].pos.y});
    if(dots.length > 700){
      dots.shift();
    }

  }

  for(var i=0; i<dots.length; i++){
    ellipse(dots[i].x, dots[i].y, 2);
  }

}
