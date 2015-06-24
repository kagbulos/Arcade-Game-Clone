// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = -150; //make the bug start OFF the screen and it will move onto the screen
    this.y = 48 + Math.floor((Math.random() * 3)) * 83; //will place the bug on one of the three rock rows
    this.speed = Math.floor((Math.random() * 300) + 1); //give the bug a random speed
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //this makes it such that the bug loops around and comes back onto the screen after it leaves
    if (this.x + dt*this.speed >= 505) {
        this.x = -150;
    }
    else{
       this.x = this.x + dt * this.speed;
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our PLAYER, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    //the initial location I chose to make it seem like he starts in the middle of the bottom row
    this.x = 202;
    this.y = 380;
}

// this function is meant to reset the player once he touches the water
Player.prototype.update = function(dt) {

    if (this.y == -35) {
        this.x = 202;
        this.y = 380;
    };

}

// Draw the PLAYER on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//The pupose of this function is to adjust the player's position accordingly, i.e. move the character left if the user presses left
Player.prototype.handleInput = function(keyCode){
    if (this.x -101 >= 0 && keyCode == 'left'){ //this.x -101 >= 0 is a check so player wont move off of the screen when player is in the leftmost column
        this.x = this.x - 101;
    }
    else if (this.y -83 >= -83 && keyCode == 'up'){ //this.y -83 >= -83 is a check so player wont move off of the screen when player is in the the top row
        this.y = this.y - 83;
    }
    else if (this.x + 101 <= 404  && keyCode == 'right'){ //this.x + 101 <= 404 is a check so player wont move off of the screen when player is in the rightmost column
        this.x = this.x + 101;
    }
    else if (this.y + 83 < 463 && keyCode == 'down'){ //this.y + 83 < 463 is a check so player wont move off of the screen when player is in the bottom row
        this.y = this.y + 83;
    };

}


// instantiate the objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
