// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(900, 400, Phaser.AUTO, 'game', stateActions);

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
    game.load.image("player", "assets/lionelhutz.jpg");

    game.load.audio("Doh", "assets/Doh.wav");

    game.load.image("pipe", "assets/pipe.png");
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

    //game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    label_score = game.add.text(20, 20, "0");

    //game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(changeScore);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    pipes = game.add.group();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //set initial coordinates for the player
    player = game.add.sprite(80, 200, "player");

    // enable physics for the player sprite
    game.physics.arcade.enable(player);

    //player.body.velocity.x = 100;

    player.body.velocity.y = -100;

    player.body.gravity.y = 300;

    //associate spacebar with player jump function
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerjump);

    pipe_interval = 1.75;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);

    generate_pipe();




}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(player, pipes, game_over);

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

function generate_pipe(){
    //calculate a random position for the gap
    var gap = game.rnd.integerInRange(1, 5);

    //generate the pipes, except where the gap should be
    for (var count = 0; count < 8; count = count + 1){
        if(count != gap && count != gap + 1 && count!=gap+2){
        add_pipe_block(900, count * 50);
        }

        //increment the score each time a new pipe is generated

    }
    changeScore();
}

function add_pipe_block(x, y){
    // add a new pipe part to the 'pipes' group
    var pipe = pipes.create(x, y, "pipe");

    //enable physics for each individual pipe part
    game.physics.arcade.enable(pipe);

    //set pipe horizontal velocity to a
    //negative value, which causes it to go left

    pipe.body.velocity.x = -200
}

function playerjump(){
    //  the  more negative the value, the higher the  jump
    player.body.velocity.y = -200;
}

function game_over(){
    // stop the game (update () function no longer called)
    game.sound.play("Doh");
    game.destroy();
}


