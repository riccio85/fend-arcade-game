// Enemies our player must avoid
/*var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
};*/

const enemyXvalues = [-50,-100, -150];
const enemyYvalues = [50, 130, 210];

class Enemy{
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = enemyXvalues[Math.floor(Math.random() * 3)];
        this.y = enemyYvalues[Math.floor(Math.random() * 3)];
        this.speed = Math.floor(100 + (Math.random() * 200));
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        this.x += this.speed * dt;
        // if enemy moves out of the canvas, following code changes enemy's setup
        if (this.x > 500) {
            this.x =  enemyXvalues[Math.floor(Math.random() * 3)];
            this.y = enemyYvalues[Math.floor(Math.random() * 3)];
            this.speed = Math.floor(100 + (Math.random() * 200));
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

let gameWinned = false;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{

    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
        this.lives = 0;
    }

    update(){
        if (this.y < 60) {
           if(!gameWinned){
                setTimeout(() => {
                    var r = confirm("Congratualation!!!You Won!! Do you want to play again?");
                    if (r == true) {
                        player.reset();
                        gameWinned=false;
                    }
                },1000);
                gameWinned=true;
           }
        } else{
            this.checkCollision();
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            case 'right':
                if (this.x < 399) {
                    this.x += 100;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 85;
                }
                break;
            case 'down':
                if (this.y <= 400) {
                    this.y += 85;
                }
                break;
        }
        this.render();
    }

    // check for collision between enemy and player
    // limited number of collisions allowed, else Game over
    checkCollision() { 
        for(let currentEnemy of allEnemies) {

            if (!(currentEnemy.y + 50 < this.y ||
                currentEnemy.y > this.y + 50 ||
                currentEnemy.x + 50 < this.x ||
                currentEnemy.x > this.x + 50)) {
                    this.lives =+ 1;
                    if(this.lives === 5) {
                        alert('Game Over!');
                    }
                    this.reset();
            }
        }
    }

    reset() {
        this.x = 200;
        this.y = 400;
        this.lives = 0;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const totalEnemies = 3;
let allEnemies = [];
for (var i = 0; i < totalEnemies; i++) {
    allEnemies.push(new Enemy());
}

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
