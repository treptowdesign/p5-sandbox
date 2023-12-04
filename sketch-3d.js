// settings 
const noiseIncrement = 0.01;
const posScaling = 900;
const sizeScale = 1;

let noiseOffset = 0.0;
let zoom = 1.0; // zoom 

// setup
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 255); // HSB color mode for vibrant color transitions
}

// draw
function draw() {
  background(0);

  // zoom/scale
  scale(zoom);
  
  // lighting for 3D 
  ambientLight(150);
  pointLight(255, 255, 255, 0, 0, 300);

  // rotate the canvas by mouse x/y 
  let rotX = map(mouseY, 0, height, -PI, PI);
  let rotY = map(mouseX, 0, width, -PI, PI); 
  rotateX(rotX);
  rotateY(rotY);

  // shapes 
  for (let i = 0; i < 15; i++) {
    push(); // new draw state

    // calc perlin noise based position offsets
    let xOff = noise(noiseOffset + i) * posScaling - (posScaling/2);
    let yOff = noise(noiseOffset + 10 + i) * posScaling - (posScaling/2);
    let zOff = noise(noiseOffset + 20 + i) * posScaling - (posScaling/2);

    translate(xOff, yOff, zOff); // translate shape based on noise 

    // calc rotate
    let rotShapeX = noise(noiseOffset + 30 + i) * TWO_PI; // full circle rotation in X
    let rotShapeY = noise(noiseOffset + 50 + i) * TWO_PI; // full circle rotation in Y
    rotateX(rotShapeX);
    rotateY(rotShapeY);

    // color and size based on perlin noise
    let size = (noise(noiseOffset + 50 + i) * 100 + 20) * sizeScale; // range 20-120

    // color stuff 
    let hue = noise(noiseOffset + 60 + i) * 255; // range 0-255
    
    // prep to draw 
    fill(hue, 200, 255);
    noStroke();

    // different shapes
    if      (i % 3 === 0) { box(size); } 
    else if (i % 5 === 1) { sphere(size / 2); } 
    else if (i % 7 === 1) { torus(size / 2, size / 4); } 
    else if (i % 9 === 1) { cone(size / 2, size); } 
    else                  { cylinder(size / 2, size); } 

    pop(); // restore original drawing state
  }

  noiseOffset += noiseIncrement; // inc noise offset
}

// random Int 
function randInt(max) {
  return Math.floor(Math.random() * max);
}

// mouseWheel event for zooming
function mouseWheel(event) {
  zoom += event.delta * 0.001; // adjust zoom based on scroll
  zoom = constrain(zoom, 0.5, 5); // constrain zoom level
}

// windoe resize  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
