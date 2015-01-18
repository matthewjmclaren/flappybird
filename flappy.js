// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(850, 420, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("JamesBond", "assets/jamesBond.gif");
game.load.image("HomerSimpson", "assets/HomerSimpson");
    game.load.image("BartSimpson", "assets/BartSimpson.png");
    game.load.image("MoeSzyslak", "assets/MoeSzyslak.png");

    game.load.audio("Doh", "assets/Doh.wav");

    game.load.image("player", "assets/flappy_batman.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#DAE6FF");
    //set background color
    game.add.text(340,10,"Prepare to lose...", {font: "20px Calibri", fill: "#990000"});
    // add introductory text or title

    game.add.sprite(68, 20, "JamesBond");
    game.add.sprite(350, 200, "HomerSimpson");
    game.add.sprite(100, 200, "BartSimpson");
    game.add.sprite(600, 200, "MoeSzyslak");

    game.input.onDown.add(clickHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    label_score = game.add.text(20, 20, "0");

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeScore);

    player = game.add.sprite(100, 200, "player");

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

function clickHandler(event){
   game.add.sprite(event.x, event.y, "HomerSimpson");
}

function spaceHandler(){
    game.sound.play("Doh");
}

function changeScore() {
    score = score + 1;
    label_score.setText(score.toString());
}

function moveRight(){
    player.x = player.x + 5;
}

function moveLeft(){
    player.x = player.x - 5;
}

function moveUp(){
    player.y = player.y - 5;
}

function moveDown(){
    player.y = player.y + 5;
}