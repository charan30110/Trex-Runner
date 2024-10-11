let canvas;
var trex, trex_running,trex_jumping;
var ground,ground_img;
var edges;

function preload() {
  trex_running = loadAnimation("assets/trex1.png", "assets/trex2.png", "assets/trex3.png");
  trex_jumping = loadAnimation("assets/trex1.png");
  ground_img = loadImage("assets/ground.png");
}

function setup() {
  canvas = createCanvas(800, 400);// creating the canvas
  centerCanvas();
  edges = createEdgeSprites(); // creating the edges

  trex = createSprite(100, 250); // Trex object/sprite
  trex.addAnimation("running", trex_running); // running animation of the trex
  trex.addAnimation("jumping", trex_jumping); // jumping animation of the trex
  trex.scale = 0.5; // adjust the size of trex

  ground = createSprite(200,340); // ground object/sprite
  ground.addImage("ground",ground_img); // adding image to the ground object/sprite
  ground.x = ground.width/2; // positioning the ground

}

function draw() {
  background(247);

  var trex_y = 310.5; // position of the trex when it is on the ground

  if (keyDown("space") && trex.y > trex_y) {
    trex.velocityY = -7.5; // making the trex jump when it is on ground and spacebar is pressed
  }
  if(trex.y >= trex_y-40 && trex.velocityY > 0) trex.changeAnimation("running"); //change the animation from jumping->running while coming down
  else if(trex.y < trex_y) trex.changeAnimation("jumping"); //change the animation from running->jumping while going up

  trex.velocityY += 0.45; // assign the gravity to the trex
  trex.collide(ground); // trex collides with the ground to prevent from falling off the canvas

  ground.velocityX = -8; // moving the ground towards the left
  if(ground.x < 0)
    ground.x = ground.width/2; // adjusting the ground position to make it never ending

  drawSprites();
}

function windowResized() {//called whenever the window is resized
  centerCanvas();
}

function centerCanvas() {//positioning the canvas to the center
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}