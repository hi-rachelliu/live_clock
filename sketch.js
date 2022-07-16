// GLOBAL VARIABLES
let diam = 20;
let speedUp = 1;
let inOut;
let clockOn = true;
let speed = 1;

// GLOBAL CONSTANTS
const canvasX = 600;
const canvasY = 400;
const halfY = canvasY / 2;
const centerX = canvasX / 2;
const clockCenterX = 350 / 2;

const colors = [
  "green",
  "darkturquoise",
  "blueviolet",
  "mediumvioletred",
  "red",
  "orange",
  "white",
];

function setup() {
  createCanvas(canvasX, canvasY);
  background(255);

  const spaceButton = createButton("Get Space/Stop");
  spaceButton.style("font-family", "Futura");
  spaceButton.style("color", "maroon");
  spaceButton.style("font-size", "20px");
  spaceButton.style("200px", "400px");
  spaceButton.position(centerX - 80, 450);
  spaceButton.elt.addEventListener("click", function () {
    clockOn = !clockOn;
  });
}

function draw() {
  if (clockOn) {
    background("white");
    drawText();
    drawClock();
  }

  if (!clockOn) {
    drawAnimation();
  }
}

function drawText() {
  fill("maroon");
  textFont("Georgia");
  textAlign(CENTER);
  textSize(23);
  text("In Search of Lost Time \n@UChicago", centerX, 30);

  fill("black");
  textSize(20);
  text("Legend", width - 120, 130);

  const words = [
    "seconds (out of 60): green",
    "minutes (out of 60): turquoise",
    "hours (out of 24): violet",
    "days (out of 30): maroon",
    "months (out of 12): red",
    "years (out of 4): orange",
  ];

  for (let i = 0; i < 6; i++) {
    fill(colors[i]);
    textSize(15);
    text(words[i], width - 120, 155 + 20 * i);
  }
}

function drawClock() {
  strokeWeight(3);
  stroke("white");

  for (let i = 0; i < 7; i++) {
    fill(colors[i]);
    circle(clockCenterX, halfY, halfY + 60 - 10 * i);
  }

  angleMode(RADIANS);
  const sixth = PI / 3;

  let sc = second();
  let mn = minute();
  let hr = hour();
  let dy = day();
  let mt = month();
  let yr = 4 - (2025 - year());

  let endSc = map(sc, 0, 60, 0, halfY);
  let endMn = map(mn, 0, 60, 0, halfY);
  let endHr = map(hr, 0, 24, 0, halfY);
  let endDy = map(dy, 0, 30, 0, halfY);
  let endMt = map(mt, 0, 12, 0, halfY);
  let endYr = map(yr, 0, 4, 0, halfY);

  const endPoints = [endSc, endMn, endHr, endDy, endMt, endYr];

  for (let i = 0; i < 6; i++) {
    noStroke();
    fill(colors[i]);
    arc(
      clockCenterX,
      halfY,
      endPoints[i],
      endPoints[i],
      sixth * (i + 1),
      sixth * (i + 2)
    );
  }

  //EXPANDING CLOCK

  if (diam > halfY) {
    inOut = false;
    diam = 0;
  }

  if (diam < halfY) {
    inOut = true;
  }

  if (inOut) {
    diam++;
  }
}

function drawAnimation() {
  background("white");
  fill(255);
  strokeWeight(1);

  r = map(cos(frameCount), -1, 1, 50, 255);
  g = map(sin(frameCount), -1, 1, 50, 255);
  b = map(cos(frameCount), -1, 1, 50, 255);

  push();
  angleMode(DEGREES);
  rectMode(CENTER);
  translate(centerX, halfY);

  for (let i = 0; i < 200; i++) {
    push();
    rotate(sin(frameCount + i) * 100);
    stroke(r, g, b);
    rect(0, 0, 600 - 3 * i, 600 - 3 * i, 200 - i);
    pop();
  }
  pop();
}
