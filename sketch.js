let ellipseSize = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke(); // Removes outline from shapes
}

function draw() {
  if (mouseIsPressed) {
    fill(0); // Black when pressed
    ellipseSize = 100; // Increase size when pressed
  } else {
    fill(255, 0, 0); // Red when not pressed
    ellipseSize = 80; // Default size
  }
  ellipse(mouseX, mouseY, ellipseSize, ellipseSize);
}