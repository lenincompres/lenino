const AMOUNT = 500;


function preload(){
  diamondsImg = loadImage("suit-diamonds.png");
  clubsImg = loadImage("suit-clovers.png");
  spadesImg = loadImage("suit-spades.png");
  heartsImg = loadImage("suit-hearts.png");
  myFont = loadFont('IrishGrover-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let area = width * height / AMOUNT;

   CLUBS = {
    color: color("teal"),
    image: clubsImg,
  };
   HEARTS = {
    color: color("brown"),
    image: heartsImg,
  };
   SPADES = {
    color: color("darkslateblue"),
    image: spadesImg,
  };
   DIAMONDS = {
    color: color("darkgoldenrod"),
    image: diamondsImg,
  };
   SUITS = [HEARTS,CLUBS,SPADES,DIAMONDS];
  
  W = sqrt(area);
  H = W;// Card.ratio * W;
  COLS = round(width/W);
  ROWS = floor(height / H);
  TOTAL = COLS * ROWS;
  
  video = createCapture(VIDEO);
  video.size(COLS, ROWS);
  video.hide();
  
  marginTop = (height - ROWS * H) / 2;
  
  cards = new Array(TOTAL).fill().map((_,i) =>{
    let x = 0.5 * W + W * (i % COLS); 
    let y =  marginTop + 0.5 * H + H * floor(i/COLS);
    return new Card(x, y, W);
  });
  
  textFont(myFont);
  textSize(1.5*W);
  textAlign(CENTER, CENTER);
}

function draw() {
  translate(width, 0); // move to far corner
  scale(-1.0,1.0);  // flip the canvas
  background(190, 190, 170);
  //image(video, 0, marginTop, width, H * ROWS);
  
  if(video.loadedmetadata) {
    video.loadPixels();
    cards.forEach((card, i) => {
      let j = i * 4;
      let pix = video.pixels.slice(j, j + 4);
      card.bg = color(...pix);
    });
    
    let orderCards = cards.map(c => c);
    orderCards.sort((a,b) => {
      return a.time + a.scale - b.scale - b.time
    }).forEach(c => c.draw());
  }
  
  /*
  translate(width, 0); // move to far corner
  scale(-1.0,1.0);  // flip the canvas
  fill(0);
  text("JACK RABBITS", width/2, height/2);
  fill("gray");
  text("JACK RABBITS", width/2 - W/20, height/2 - W/20);
  */
}