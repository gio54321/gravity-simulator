function applySettings(){

  if(document.getElementById("change-objects").checked){
    planets = [];
    particle = [];
    particleCount = parseInt(document.getElementById("particle-count").value);
    planetCount = parseInt(document.getElementById("planet-count").value);

    if (planetCount == 1){
      planets[0] = new Planet(width/2, height/2);
    }else{
      for (var i=0; i<planetCount; i++){
        planets[i] = new Planet(random(100, width-100), random(100, height-100));
      }
    }
    for (var i=0; i<particleCount; i++){
      particle[i] = new Particle(random(100, width-100), random(100, height-100));
    }
  }

  showFrameRate = document.getElementById("show-framerate").checked;
  framerateSet = parseInt(document.getElementById("set-framerate").value);

  frictionRatio = 1 - parseFloat(document.getElementById("friction-ratio").value);
  for (var i=0; i<particleCount; i++){
    particle[i].frictionRatio = 1 - parseFloat(document.getElementById("friction-ratio").value);
  }

  dots = [];
  setup();
}

function loadPreset(){
  var value = parseInt(document.getElementById("presets").value);

  switch(value){
    case 1:
      planetCount = 1;
      particleCount = 1;
      planets = [];
      particle = [];
      for (var i=0; i<planetCount; i++){
        planets[i] = new Planet(width/2-100, height/2);
      }
      for (var i=0; i<particleCount; i++){
        particle[i] = new Particle(width/2+100, height/2-50, createVector(-0.8, -0.5));
      }
      break;
    case 2:
      planetCount = 2;
      particleCount = 1;
      planets = [];
      particle = [];

      planets[0] = new Planet(width/2+150, height/2);
      planets[1] = new Planet(width/2-150, height/2);

      for (var i=0; i<particleCount; i++){
        particle[i] = new Particle(random(100, width-100), random(100, height-100));
      }
      break;
  }

  dots = [];
  setup();
}
