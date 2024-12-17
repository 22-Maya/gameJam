/* VARIABLES */
let font;
let cyoaButton;
let breakButton;
let enterButton;
let a1Button;
let a2Button;
let b1Button;
let b2Button;
let c1Button;
let c2Button;
let returnButton;
let screen = 0;
let buttonColor = "#F7EED4";
let fontColor = "#B0BFBD";
let walls, paddle, ball, bricks, hasStarted, wallTop;

//font and images
function preload() {
  font = loadFont('/assets/YuseiMagic-Regular.ttf');
  forestImage = loadImage('/assets/forest.jpeg');
  forkImage = loadImage('/assets/fork.jpeg');
  triumphImage = loadImage('/assets/triumph.jpeg');
  creatureImage = loadImage('/assets/creature.jpeg');
  artifactImage = loadImage('/assets/artifact.jpeg');
  peaceImage = loadImage('/assets/peace.jpeg');
  heroImage = loadImage('/assets/hero.jpeg');
  failImage = loadImage('/assets/fail.jpeg');
  startImage = loadImage('/assets/start.jpeg');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600, 400);
  textAlign(CENTER);
  textFont(font , 20);
  noStroke();

  background("lightblue");
  image(startImage, 0, 0, width, height);

  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);

  fill(fontColor);
  textFont(font , 40);
  text("Welcome to \nEchoes of Courage", width / 2, height / 2 - 125);
  textFont(font , 25);
  text("Choose a game to play", width / 2, height / 2 -30);

  // Set up the home screen
  enterButton = new Sprite(-190, -100);
  a1Button = new Sprite(-200, -200);
  a2Button = new Sprite(-50, -50);
  b1Button = new Sprite(-100, -100);
  b2Button = new Sprite(-150, -150);
  c1Button = new Sprite(-210, -2000);
  c2Button = new Sprite(-510, -500);
  returnButton = new Sprite(-1000, -1000);
  cyoaButton = new Sprite(width / 2 - 100, height / 2 + 100);
  breakButton = new Sprite(width / 2 + 100, height / 2 + 100);

  allSprites.collider = "s";
  allSprites.color = color(255);
  
  walls = new Group();
  walls.w = 30;
  walls.h = 800;

  wallTop = new walls.Sprite(width / 2, -20);
  wallTop.rotation = 90;

  new walls.Sprite(0, height / 2);
  new walls.Sprite(width, height / 2);

  ball = new Sprite(width / 2, height - 200, 11, 'd');
  ball.bounciness = 1;
  ball.friction = 0;

  paddle = new Sprite(width / 2, height - 50, 100, 20, 'd');
  paddle.rotationLock = true;

  bricks = new Group();
  bricks.tile = "=";
  bricks.w = 31;
  bricks.h = 11;

  // The notation in the next few lines is called an arrow function
  ball.collide(bricks, (ball, brick) => {
    brick.remove();
  });
}

/* DRAW LOOP REPEATS */
function draw() {
  cyoaButton.w = 120;
  cyoaButton.h = 50;
  cyoaButton.collider = "k";
  cyoaButton.color = buttonColor;
  cyoaButton.text = "CYOA";

  breakButton.w = 120;
  breakButton.h = 50;
  breakButton.collider = "k";
  breakButton.color = buttonColor;
  breakButton.text = "Breaker";

  // Hide all game elements initially
  walls.pos = {x: -1000, y: -1000};
  paddle.pos = {x: -1000, y: -1000};
  ball.pos = {x: -1000, y: -1000};
  bricks.pos = {x: -1000, y: -1000};

  if (hasStarted) {
    paddle.moveTowards(mouse.x, height - 50, 1);
    if (ball.collides(paddle)) {
      ball.speed = 7;
      ball.direction += random(-10, 10);
    }
    updateSprites();
  }

  if (cyoaButton.mouse.presses()) {
    console.log("CYOA");
    showScreencyoa();
    screen = 1;
  }

  if (screen == 1) {
    if (enterButton.mouse.presses()) {
      console.log("pressed");
      showScreen1();
      screen = 1;
    } else if (a1Button.mouse.presses()) {
      console.log("Display screen 2");
      showScreen2();
      screen = 2;
    } else if (a2Button.mouse.presses()) {
      console.log("Display screen 5");
      showScreen5();
      screen = 5;
      a1Button.pos = {x: -200, y: -200};
      a2Button.pos = {x: -50, y: -50};
    }
  } else if (b1Button.mouse.presses()) {
    console.log("Display screen 3");
    showScreen3();
    screen = 3;
  } else if (b2Button.mouse.presses()) {
    console.log("Display screen 4");
    showScreen4();
    screen = 4;
  } else if (c1Button.mouse.presses()) {
    console.log("Display screen 6");
    showScreen6();
    screen = 6;
  } else if (c2Button.mouse.presses()) {
    console.log("Display screen 7");
    showScreen7();
    screen = 7;
  } else if (returnButton.mouse.presses()) {
    console.log("Display screen 0");
    showScreenhome();
    screen = 0;
  } else if (breakButton.mouse.presses()) {
    console.log("Breakout");
    showScreenbreakSet();
    rePlay();
    returnButton.pos = {x: 145, y: 20};
    screen = 8;
    if (mouse.presses()) {
      bricks.remove();
    }
  }
}

/* FUNCTIONS TO DISPLAY SCREENS */
function showScreen1() {
  background("#7181AB");
  image(forkImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Welcome to the village", width / 2, height / 2 - 125);
  textFont(font , 20);
  text("You, the protagonist, find yourself in a world where \nhope is a tangible idea. It is the key to \novercoming challenges and finding meaning in life. \nYou start your journey in a small village that has \nbeen shrouded in despair for years.", width / 2, height / 2 -75);
  enterButton.pos = {x: -100, y: -100};
  a1Button.pos = {x: width/2 - 120, y: height/2 + 100};
  a1Button.w = 215;
  a1Button.h = 70;
  a1Button.collider = "k";
  a1Button.color = buttonColor;
  a1Button.text = "Listen to \nvillagers' stories";
  a2Button.pos = {x: width/2 + 120, y: height/2 + 100};
  a2Button.w = 215;
  a2Button.h = 70;
  a2Button.collider = "k";
  a2Button.color = buttonColor;
  a2Button.text = "Help an \nelderly woman";
}

function showScreen2() {
  background("#353C73");
  image(creatureImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Gathering Information", width / 2, height / 2 - 125);
  textFont(font , 15);
  text("By listening to the villagers, you learn \nabout a hidden temple where the Hope Crystal is guarded \nby a wise guardian. The villagers believe that \nonly someone with a pure heart can retrieve it.", width / 2, height / 2 -75);
  a1Button.pos = {x: -200, y: -200};
  a2Button.pos = {x: -50, y: -50};
  b1Button.pos = {x: width/2 - 100, y: height/2 + 100};
  b1Button.w = 140;
  b1Button.h = 70;
  b1Button.collider = "k";
  b1Button.color = buttonColor;
  b1Button.text = "Find the \ntemple";
  b2Button.pos = {x: width/2 + 100, y: height/2 + 100};
  b2Button.w = 210;
  b2Button.h = 70;
  b2Button.collider = "k";
  b2Button.color = buttonColor;
  b2Button.text = "Ask the villagers \nfor help";
}

function showScreen3() {
  background("#353C73");
  image(artifactImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Finding the Temple", width / 2, height / 2 - 125);
  textFont(font , 15);
  text("You find the hidden temple deep in the forest. \nThe guardian appears and tells you that \nonly by solving a riddle can you prove your worthiness \nto retrieve the Hope Crystal.", width / 2, height / 2 -75);
  a1Button.pos = {x: -200, y: -200};
  a2Button.pos = {x: -50, y: -50};
  b1Button.pos = {x: -100, y: -100};
  b2Button.pos = {x: -150, y: -150};
  c1Button.pos = {x: width/2 - 100, y: height/2 + 100};
  c1Button.w = 150;
  c1Button.h = 65;
  c1Button.collider = "k";
  c1Button.color = buttonColor;
  c1Button.text = "Solve the \nriddle";
  c2Button.pos = {x: width/2 + 100, y: height/2 + 100};
  c2Button.w = 210;
  c2Button.h = 65;
  c2Button.collider = "k";
  c2Button.color = buttonColor;
  c2Button.text = "Ask the guardian \nfor help";
}

function showScreen4() {
  background("#0B3948");
  image(peaceImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Celebrate with the Villagers", width / 2 - 10, height / 2 - 125);
  textFont(font , 15);
  text("You asked the villagers for help on your journey. \nTogether, you reach the temple and retrieve the Hope Crystal. \nThe villagers' combined effort restores their hope, \nand the village begins to flourish again. \nThe once-desolate land is now filled with joy and prosperity.", width / 2, height / 2 -75);
  b1Button.pos = {x: -100, y: -100};
  b2Button.pos = {x: -150, y: -150};
  rePlay();
}

function showScreen5() {
  background("#212738");
  image(triumphImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Helping the Elderly Woman", width / 2, height / 2 - 125);
  textFont(font , 25);
  text("You decide to help the old woman. \nShe tells you her story, which rekindles \na spark of hope in her. In gratitude, \nshe gives you a charm said to \nprotect the bearer from despair.", width / 2, height / 2 -70);
  rePlay();
}

function showScreen6() {
  background("#8F1437");
  image(heroImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("The Selfless Hero", width / 2, height / 2 - 125);
  textFont(font , 15);
  text("You solve the riddle by yourself and retrieve the Hope Crystal. \nThis accomplishment fills you with confidence and determination. \nYou return to the village, sharing your journey and the lessons learned, \nteaching others that hope is in every act of kindness and bravery." , width / 2, height / 2 -75);
  c1Button.pos = {x: -210, y: -2000};
  c2Button.pos = {x: -510, y: -500};
  rePlay();
}

function showScreen7() {
  background("#212631");
  image(failImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Helping Hand", width / 2, height / 2 - 125);
  textFont(font , 15);
  text("You ask the guardian for help and receive valuable guidance. \nWith this new understanding, you retrieve the Hope Crystal. \nThe guardian’s wisdom helps you realize the importance \nof community and collective hope. You use \nthe crystal's power to bring hope to other parts of the world." , width / 2, height / 2 -75);
  c1Button.pos = {x: -210, y: -2000};
  c2Button.pos = {x: -510, y: -500};
  rePlay();
}

function showScreencyoa() {
  background("#A3B6A1");
  image(forestImage, 0, 0, width, height);
  fill('rgba(0,0,0,0.5)');
  rect(0, 0, width, height);
  fill(fontColor);
  textFont(font , 40);
  text("Welcome to Hope's Journey", width / 2, height / 2 - 125);
  textFont(font , 25);
  text("In this game, you will embark on a quest \nto discover what hope means to you.\n Your choices will shape your path \nand reveal different aspects of hope.", width / 2, height / 2 -75);
  cyoaButton.pos = {x: -3000, y: -2000};
  breakButton.pos = {x: -2000, y: -3000};
  enterButton.pos = {x: width/2, y: height/2 + 100};
  enterButton.w = 210;
  enterButton.h = 50;
  enterButton.collider = "k";
  enterButton.color = buttonColor;
  enterButton.text = "Enter the Forest";
  walls.pos = {x: -1000, y: -1000};
  paddle.pos = {x: -1000, y: -1000};
  ball.pos = {x: -1000, y: -1000};
  bricks.pos = {x: -1000, y: -1000};
}

function showScreenhome() {
  background("lightblue");
  image(startImage, 0, 0, width, height); 
  // Draw the image as the background
  fill('rgba(0,0,0,0.5)'); 
  // Add a translucent overlay
  rect(0, 0, width, height);
  // Draw the image as the background
  fill(fontColor);
  // Draw the image as the background

  textFont(font , 40);
  text("Welcome to \nEchoes of Courage", width / 2, height / 2 - 125);
  textFont(font , 25);
  text("Choose a game to play", width / 2, height / 2 -30);

  cyoaButton.pos = {x: width/2 - 100, y: height/2 + 100};
  cyoaButton.w = 120;
  cyoaButton.h = 50;
  cyoaButton.collider = "k";
  cyoaButton.color = buttonColor;
  cyoaButton.text = "CYOA";

  breakButton.pos = {x: width/2 + 100, y: height/2 + 100};
  breakButton.w = 120;
  breakButton.h = 50;
  breakButton.collider = "k";
  breakButton.color = buttonColor;
  breakButton.text = "Breaker";

  returnButton.pos = {x: -500, y: -1000};
  walls.pos = {x: -1000, y: -1000};
  paddle.pos = {x: -1000, y: -1000};
  ball.pos = {x: -1000, y: -1000};
  bricks.pos = {x: -1000, y: -1000};
}

function showScreenbreakSet() {
  // Hide initial buttons
  cyoaButton.pos = { x: -3000, y: -2000 };
  breakButton.pos = { x: -2000, y: -3000 };
  // Resize canvas for the Breakout game
  resizeCanvas(500, 500);
  background(247, 134, 131);
  // Initialize walls
  allSprites.collider = "s";
  allSprites.color = color(255);
  walls = new Group();
  walls.w = 30;
  walls.h = 800;
  wallTop = new walls.Sprite(width / 2, -20);
  wallTop.rotation = 90;
  // Left and right walls
  new walls.Sprite(0, height / 2);
  new walls.Sprite(width, height / 2);
  console.log("Walls initialized");
  // Initialize ball
  ball.x = width / 2;
  ball.y = height - 200;
  ball.d = 11;
  ball.collider = "d";
  ball.bounciness = 1;
  ball.friction = 0;
  console.log("Ball initialized at", ball.x, ball.y);
  // Initialize paddle
  paddle.x = width / 2;
  paddle.y = height - 50;
  paddle.w = 100;
  paddle.h = 20;
  paddle.collider = "d";
  paddle.rotationLock = true;
  console.log("Paddle initialized at", paddle.x, paddle.y);
  // Initialize bricks
  bricks = new Group();
  bricks.tile = "=";
  bricks.w = 31;
  bricks.h = 11;
  new Tiles(
    [
      "=====...====",
      "======.======",
      "==..==.==..==",
      "==..==.==..==",
      "==..==.==..==",
      "==..==.==..==",
      "==..==.==..==",
      "==..==.==..==",
      "======.======",
      "=====...====."
    ],
    50,
    80,
    bricks.w + 3,
    bricks.h + 3
  );
  new Tiles(
    [
      "======.======",
      "======.======",
      "..==.....==..",
      "..==.....==..",
      "..==.....==..",
      "..==.....==..",
      "..==.....==..",
      "..==.....==..",
      "======...==..",
      "======...==.."
    ],
    50,
    230,
    bricks.w + 3,
    bricks.h + 3
  );
  console.log("Bricks initialized");
  ball.x = width / 2;
  ball.y = height - 200;
  ball.direction = 90 + random(-10, 10);
  ball.speed = 8;
  hasStarted = true;
  console.log("Game started");
}

//return button
function rePlay() {
  returnButton.pos = {x: width/2, y: height/2 + 100};
  returnButton.w = 190;
  returnButton.h = 50;
  returnButton.collider = "k";
  returnButton.color = buttonColor;
  returnButton.text = "Return to Start";
}