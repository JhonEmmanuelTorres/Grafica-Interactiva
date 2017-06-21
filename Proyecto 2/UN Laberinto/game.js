// Get the max score
if (localStorage.score === undefined)
  document.getElementById('showScore').innerHTML = ":( Sin puntaje. ";
else 
  document.getElementById('showScore').innerHTML = localStorage.score + " segundos";
  
// Global variables for game

// tam pixel board
var SIZE_PIX = 20;
// I created the board 
var board = [
  "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "X   X         X   X     X  ",
  "XXX X XXXXXXX X XXX X X X X",
  "X   X       X     X X X   X",
  "X XXXXXXX X XXXXX XXX X XXX",
  "X X     X X     X     X X X",
  "X X XXX XXXXXXX XXXXX XXX X",
  "X   X   X     X X   X X X X",
  "XXX XXX XXX X X X X XXX X X",
  "X     X   X X X   X       X",
  "X XXXXXXX X X XXX XXXXX X X",
  "X X     X   X   X X   X X X",
  "X X XXX XXX XXX XXX X X XXX",
  "X X X   X X   X   X X X   X",
  "X X X X X XXXXXXX X X XXX X",
  "X   X X X       X   X   X X",
  "XXXXX X X XXX X XXXXXXX X X",
  "X     XXX X X X       X X X",
  "X XXX X   X XXXXXXX XXX X X",
  "X   X   X   X   X   X   X X",
  "XXXXXXXXX X X X XXX X XXX X",
  "X       X X   X X   X   X X",
  "X XXX XXX XXXXX X XXXXX X X",
  "X   X X   X     X X     X X",
  "XXX X X XXX XXXXX X XXXXX X",
  "    X   X         X       X",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
];
// all properties player
var player;
// all barriers
var platforms;
// for address
var cursors;
// to finish
var stars;
// score
var counter = 0;
// container
var text = 0;
// for stop counter
var begin = false;
// background music
var music;

/*
Initialize object game with:
 * size screen: with and height
 * mode phaser
 * id to render in screen
 * object with preload, create and update
*/
var game = new Phaser.Game(board.length * SIZE_PIX, board[0].length * SIZE_PIX + 70, Phaser.CANVAS, "myGame", { preload: preload, create: create, update: update } );


// load the game's images
function preload() {

  // load images
  game.load.image('barrier', 'img/barrier.png');
  game.load.image('street', 'img/street.png');
  game.load.image('star', 'img/star.png');
  
  // load sprite
  game.load.spritesheet('point', 'img/point.png', 16, 16);
  
  // load music background
  game.load.audio('background', ['ogg/background.mp3', 'ogg/background.ogg']);
  
}

function create() { 
  
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  // draw space in white
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] !== "X")
        game.add.sprite(j * SIZE_PIX, i * SIZE_PIX, 'street');
    }
  }
  
  music = game.add.audio('background');
  music.play('', 0, 1, true);
  
  //  Finally some stars to collect
  stars = game.add.group();
  //  We will enable physics for any star that is created in this group
  stars.enableBody = true;
  //  Create a star inside of the 'stars' group
  stars.create(26 * SIZE_PIX, SIZE_PIX, 'star'); 
  
  // draw init position player  
  player = game.add.sprite(0 + 2, 25 * SIZE_PIX + 2, 'point');
  
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  platforms.enableBody = true;

  // add barriers 
  var ground;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++)
      if (board[i][j] === "X") {
        ground = platforms.create(j * SIZE_PIX, i * SIZE_PIX, 'barrier');    
        ground.body.immovable = true; 
      }
  }
  //  We need to enable physics on the player
  game.physics.arcade.enable(player);

  // ok collider
  player.body.collideWorldBounds = true;
  player.animations.add('all', [0, 1, 2], 10, true);
  
  // score 
  text = game.add.text(250, 570, 'Score: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
  text.anchor.setTo(0.5, 0.5);  
  game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
  
  //  Our controls (up, down, left and right).
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  
  //  Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  game.physics.arcade.overlap(player, stars, collectStar, null, this);

  //  Reset the players velocity (movement)
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  
  
  // all cursos
  if (cursors.left.isDown) {
    //  Move to the left
    player.body.velocity.x = -70;
    player.animations.play('all');
    begin = true;
  }
  else if (cursors.right.isDown) {
    //  Move to the right
    player.body.velocity.x = 70;
    player.animations.play('all');
    begin = true;
  }
  else if (cursors.up.isDown) {
    //  Move to the right
    player.body.velocity.y = -70;
    player.animations.play('all');
    begin = true;
  }
  else if (cursors.down.isDown) {
    //  Move to the right
    player.body.velocity.y = 70;
    player.animations.play('all');
    begin = true;
  }
  else {
    //  Stand still
    player.animations.stop();
    player.frame = 1;
  }
}

function collectStar (player, star) {
    
  player.kill();
  begin = false;
  if (localStorage.score === undefined || counter < localStorage.score)
    localStorage.score = counter;
  
  // stop music
  music.stop();
  
  // show the alert with too style
  swal({title:"Tu puntaje es: " + counter + ' segundos  '}, function() {
    location.reload();  
  });  
    
}

// this function all called every second
function updateCounter() {

    if (begin) {
      counter++;
      text.setText('Score: ' + counter);  
    }    

}