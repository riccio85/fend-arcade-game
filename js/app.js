
const enemyXvalues = [-50,-100, -150];
const enemyYvalues = [50, 130, 210];
const totalEnemies = 3;
let allEnemies = [];
let player = null;
let gameWinned = false; //used for the alert when the game is winned

/**
 * @class Enemy
 */
class Enemy{
    /**
     * @constructs Enemy
     * @param items
     */
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.x = enemyXvalues[Math.floor(Math.random() * 3)];
        this.y = enemyYvalues[Math.floor(Math.random() * 3)];
        this.speed = Math.floor(100 + (Math.random() * 200));
    }

    /**
     * @description updates the enemy's position
     *  @param {number} dt - a time delta between ticks
     */ 
    update(dt){
        this.x += this.speed * dt;
        // if enemy moves out of the canvas, following code changes enemy's setup
        if (this.x > 500) {
            this.x =  enemyXvalues[Math.floor(Math.random() * 3)];
            this.y = enemyYvalues[Math.floor(Math.random() * 3)];
            this.speed = Math.floor(100 + (Math.random() * 200));
        }
    }

    /**
    * @description  draws the enemy on the screen
    */ 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}



/**
 * @class Player
 */
class Player{
    /**
     * @constructs Player
     */
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
        this.lives = 0;
    }

    /**
    * @description updates the Player location 
    */ 
    update(){
        if (this.y < 60) {
           if(!gameWinned){
                setTimeout(() => {
                    alert("Congratualation!!!You Won!! Starting new game");
                    player.reset();
                    gameWinned=false;
                },1000);
                gameWinned=true;
           }
        } else{
            this.checkCollision();
        }
    }

    /**
    * @description  draws the enemy on the screen
    */ 
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
    * @description moves the player according to that user input
    * @param {string} input - the key which was pressed
    */ 
    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            case 'right':
                if (this.x <= 400) {
                    this.x += 100;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 85;
                }
                break;
            case 'down':
                if (this.y < 400) {
                    this.y += 85;
                }
                break;
        }
        this.render();
    }

    /**
    * @description  checks for collision between enemy and player
    */ 
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

    /**
    * @description resets the player in the original position
    */    
    reset() {
        this.x = 200;
        this.y = 400;
        this.lives = 0;
    }

}


/**
* @description starts the game by instantiating the objects
* Player.handleInput() method. 
*/ 
(function startGame(){
    for (var i = 0; i < totalEnemies; i++) {
        allEnemies.push(new Enemy());
    }
    player = new Player();
}());

/**
* @description this listens for key presses and sends the keys to your
* Player.handleInput() method. 
*/ 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
