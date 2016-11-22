var video;
var trackColor;
var dots = [];
var mirror;
var r;
var g;
var b;
var a;
 
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
 
  trackColor = [255, 0, 0];
  
  r = floor(randomGaussian(127, 127))
  g = floor(randomGaussian(127, 127))
  b = floor(randomGaussian(127, 127))
  a = floor(randomGaussian(127, 127))
}
 
function draw() {
 
  image(video, 0, 0);
 
  video.loadPixels();
  
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
 
  var worldRecord = 500;
 
  var closestX = 0;
  var closestY = 0;
 
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
 
      var loc = (x + y * video.width) * 4;
     
      var r1 = video.pixels[loc];
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];
 
      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];
 
      var d = dist(r1, g1, b1, r2, g2, b2);
 
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }
 
  if (worldRecord < 50) {
    for (var j = 0; j < 15; j++) {
      dots.push(new Dot(closestX, closestY));
    }
  }
  dots.forEach(function(dot) {
    dot.display()
  });
}
 
function mousePressed() {

  trackColor = video.get(mouseX, mouseY);
  console.log(trackColor);
}

function Dot(x, y) {
  this.x = x + randomGaussian(10, 10);
  this.y = y + randomGaussian(10, 10);
  this.color = color(r, g, b, a);
  this.size = 3 + randomGaussian(10, 5);
}

Dot.prototype.display = function() {
  noStroke();
  fill(this.color);
  ellipse(this.x, this.y, this.size, this.size);
}

function keyTyped() {
  if (key === 'q') {
    r += 10
  }
  if (key === 'a') {
    r -= 10
  }
  if (key === 'w') {
    g += 10
  }
  if (key === 's') {
    g -= 10
  }
  if (key === 'e') {
    b += 10
  }
  if (key === 'd') {
    b -= 10
  }
  if (key === 'r') {
    a += 10
  }
  if (key === 'f') {
    a -= 10
  }
}