let noiseOffset = 0.0;
let noiseIncrement = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 255); // Using HSB color mode for more vibrant color transitions
}

function draw() {
  background(0);
  
  // Lighting for better 3D effect
  ambientLight(150);
  pointLight(255, 255, 255, 0, 0, 300);

  // Rotate the canvas
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005);

  // Multiple shapes with Perlin noise
  for (let i = 0; i < 10; i++) {
    push(); // Start a new drawing state

    // Calculate Perlin noise based offsets with increased range
    let xOff = noise(noiseOffset + i) * 800 - 400;
    let yOff = noise(noiseOffset + 10 + i) * 800 - 400;
    let zOff = noise(noiseOffset + 20 + i) * 800 - 400;


    translate(xOff, yOff, zOff); // Translate shape based on noise

    // Color and size based on Perlin noise
    let size = noise(noiseOffset + 30 + i) * 100 + 20;
    let hue = noise(noiseOffset + 40 + i) * 255;

    fill(hue, 200, 255);
    noStroke();

    // Select different shapes
    if (i % 3 === 0) {
      box(size);
    } else if (i % 3 === 1) {
      sphere(size / 2);
    } else {
      cylinder(size / 2, size);
    }
    pop(); // Restore original drawing state
  }

  noiseOffset += noiseIncrement; // Increment noise offset for animation
}
