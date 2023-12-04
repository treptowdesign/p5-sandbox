let song;
let fft;

function preload() {
  song = loadSound('audio/sample.mp3');
}

function setup() {
  createCanvas(400, 400);
  fft = new p5.FFT();
  textAlign(CENTER);
}

function draw() {
  background(200);

  if (song.isPlaying()) {
    let spectrum = fft.analyze();
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h);
    }
  } else {
    text('Click to play', width / 2, height / 2);
  }
}

function mousePressed() {
  if (song.isLoaded() && !song.isPlaying()) {
    song.play();
  }
}
