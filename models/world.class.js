/**
 * Represents the game world.
 */
class World {
    character;
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    gameOver = false;
    camera_x = 0;
    soundManager = new SoundManager();
    statusbar = new StatusBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    sawEndboss = false;
    endbossbar = new EndbossBar();
    throwableObj = [];

    /**
     * Creates a new instance of the world.
     * @param {HTMLCanvasElement} canvas - The canvas element on which the game is drawn.
     * @param {Keyboard} keyboard - The keyboard object for controls.
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.setWorld();
        this.level = createLevel1();

        this.level.enemies.forEach(enemy => {
            if (enemy instanceof EndBoss) {
                enemy.world = this;
            }
        });

        this.endboss = new EndBoss(this, this.character);

        this.draw();
        this.run();
    }

    /**
     * Resets the level.
     */
    resetLevel() {
        this.level = createLevel1();
        this.character = new Character(this);
        this.statusbar = new StatusBar();
        this.coinbar = new CoinBar();
        this.bottlebar = new BottleBar();
        this.endbossbar = new EndbossBar();
        this.throwableObj = [];
    }

    /**
     * Sets the world reference in the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Draws the game world and starts the animation loop.
     */
    draw() {
        this.clearAndTranslate();
        this.drawLevelObjects();
        this.drawUI();
        this.animationFrameID = requestAnimationFrame(() => this.draw());
    }
    
    /**
     * Clears the canvas and sets the camera.
     */
    clearAndTranslate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
    }
    
    /**
     * Draws all objects of the level.
     */
    drawLevelObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObj);
        this.ctx.restore();
    }
    
    /**
     * Draws the UI elements.
     */
    drawUI() {
        this.addToMap(this.bottlebar);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
    
        if (this.character.x >= 6700) {
            this.sawEndboss = true;
        }
        if (this.sawEndboss) {
            this.addToMap(this.endbossbar);
        }
    }    

    /**
     * Stops all intervals and animations.
     */
    stop() {
        clearInterval(this.collisionInterval);
        clearInterval(this.otherInterval);
        cancelAnimationFrame(this.animationFrameID);
    }
    
    collisionInterval;
    otherInterval;

    /**
     * Starts the game loop with various intervals.
     */
    run() {
        this.collisionInterval = setInterval(() => {
            this.checkCollisions();
        }, 20);

        this.otherInterval = setInterval(() => {
            this.checkLose();
            this.checkWin();
            this.checkCoinCollection();
            this.checkBottleCollection();
            this.checkThrowAbleObject();
            this.checkBottleEnemyCollision(); 
        }, 200);
    }

    /**
     * Processes the collision between the character and a Chicken.
     * @param {Chicken} enemy - The hit chicken enemy.
     * @param {number} verticalDiff - Vertical difference for detecting the jump.
     * @param {Array} chickensToKill - Array to collect chickens to be killed.
     */
    handleChickenCollision(enemy, verticalDiff, chickensToKill) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 1) {
            chickensToKill.push(enemy);
        } else if (!enemy.isDead && Date.now() - this.character.lastHit > 1500) {
            this.character.hit(20);
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }

    /**
     * Processes the collision between the character and a Chick.
     * @param {Chick} enemy - The hit chick enemy.
     * @param {number} verticalDiff - Vertical difference for detecting the jump.
     * @param {Array} chickensToKill - Array to collect chickens to be killed.
     */
    handleChickCollision(enemy, verticalDiff, chickensToKill) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 0.8) {
            chickensToKill.push(enemy);
        } else if (!enemy.isDead && Date.now() - this.character.lastHit > 1500) {
            this.character.hit(10);
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }

    /**
     * Processes the collision between the character and the EndBoss.
     * @param {EndBoss} enemy - The EndBoss.
     * @param {number} verticalDiff - Vertical difference for detecting the jump.
     */
    handleEndBossCollision(enemy, verticalDiff) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 0.1) {
            if (!enemy.isDead()) enemy.hit(); 
        } else if (!enemy.isDead() && Date.now() - this.character.lastHit > 1300) {
            this.character.hit(50);
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }

    /**
     * Processes all chicken collisions after the jump.
     * @param {Array} chickensToKill - Array of chickens to be killed.
     */
    processChickenCollisions(chickensToKill) {
        this.character.jump();
        chickensToKill.forEach(chicken => {
            if (!chicken.isDead) {
                chicken.hit();
                setTimeout(() => {
                    let index = this.level.enemies.indexOf(chicken);
                    if (index > -1) this.level.enemies.splice(index, 1);
                }, 500);
            }
        });
    }

    /**
     * Checks if the player has lost.
     */
    checkLose() {
        if (this.character.energy == 0 && !this.gameOver) {
            this.gameOver = true; 
            this.showLose();
            if (soundManager.pauseAll()) {
                soundManager.stop('lose');
            } else {
                soundManager.play('lose');
            }
            this.stop();
            this.keyboard = new Keyboard();
        }
    }

    /**
     * Displays the "Lost" overlay.
     */
    showLose() {
        let overlay = document.getElementById('overlayLose');
        let restartLoseBtn = document.getElementById('restartLoseBtn');
        let backToMenuBtn = document.getElementById('backLoseMenu');

        overlay.style.display = "flex";
        restartLoseBtn.style.display = "block";
        backToMenuBtn.style.display = "block";

        restartLoseBtn.addEventListener('click', () => {
            restartGame(); 
        }, { once: true });

        backToMenuBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });
    }

    /**
     * Checks if the player has won.
     */
    checkWin() {
        if (this.gameOver) return;

        this.level.enemies.forEach(enemy => {
            if (enemy instanceof EndBoss && enemy.isDead()) {
                this.gameOver = true; 
                this.stop();
                this.showVictory();
                this.keyboard = new Keyboard();
            }
        });
    }

    /**
     * Displays the "Victory" overlay.
     */
    showVictory() {
        let overlay = document.getElementById('overlayWin');
        let restartWinBtn = document.getElementById('restartWinBtn');
        let backToMenuBtn = document.getElementById('backWinMenu');

        overlay.style.display = "flex";
        restartWinBtn.style.display = "block";
        backToMenuBtn.style.display = "block";

        restartWinBtn.addEventListener('click', () => {
            restartGame(); 
        }, { once: true });

        backToMenuBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });
    }

    /**
     * Checks all collisions between the character and enemies.
     */
    checkCollisions() {
        let chickensToKill = [];
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                let verticalDiff = (this.character.y + this.character.height) - enemy.y;
                if (enemy instanceof Chicken) {
                    this.handleChickenCollision(enemy, verticalDiff, chickensToKill);
                } else if (enemy instanceof Chick) {
                    this.handleChickCollision(enemy, verticalDiff, chickensToKill);
                } else if (enemy instanceof EndBoss) {
                    this.handleEndBossCollision(enemy, verticalDiff);
                }
            }
        });
        if (chickensToKill.length > 0) {
            this.processChickenCollisions(chickensToKill);
        }
    }

    /**
     * Checks if the character has collected a coin.
     */
    checkCoinCollection() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCoinColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinbar.increaseCoinCount();
                soundManager.play('coin');
            }
        });
    }

    /**
     * Checks if the character has collected a bottle.
     */
    checkBottleCollection() {
        this.level.salsabottle.forEach((bottle, index) => {
            if (this.character.isBottleColliding(bottle) && this.bottlebar.bottleCount < 5) {
                this.level.salsabottle.splice(index, 1);
                this.bottlebar.increaseBottleCount();
                soundManager.play('bottle');
            }
        });
    }

    /**
     * Checks if a thrown bottle hits an enemy.
     */
    checkBottleEnemyCollision() {
        this.throwableObj.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isBottleCollidingEnemy(enemy)) {
                    this.processBottleCollision(bottleIndex, enemy);
                }
            });
        });
    }
    
    /**
     * Processes the collision of a bottle hitting an enemy.
     * @param {number} bottleIndex - The index of the thrown bottle.
     * @param {Enemy} enemy - The enemy that was hit.
     */
    processBottleCollision(bottleIndex, enemy) {
        this.throwableObj.splice(bottleIndex, 1);
        enemy.hit();
        if (enemy instanceof Chicken) {
            soundManager.play('bottleHit');
            this.scheduleEnemyRemoval(enemy);
        } else if (enemy instanceof Chick) {
            soundManager.play('hurt');
            this.scheduleEnemyRemoval(enemy);
        }
    }
    
    /**
     * Schedules the removal of an enemy after a hit.
     * @param {Enemy} enemy - The enemy to be removed.
     */
    scheduleEnemyRemoval(enemy) {
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 500);
    }    

    /**
     * Checks if a throwable object should be thrown.
     */
    checkThrowAbleObject() {
        if (this.keyboard.D && this.bottlebar.bottleCount > 0) {
            let offsetX = this.character.otherDirection ? -20 : this.character.width - 20;
            let offsetY = 40;
            let startX = this.character.x + offsetX;
            let startY = this.character.y + offsetY;
            this.throwableObj.push(new ThrowableObject(startX, startY));
            this.bottlebar.decreaseBottleCount();
            this.keyboard.D = false;
        }
    }

    /**
     * Adds multiple objects to the map.
     * @param {Object[]} objects - Array of objects to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (typeof o.update === 'function') {
                o.update();
            }
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object on the map.
     * @param {Object} mo - The object to be displayed.
     */
    addToMap(mo) {
        this.ctx.save();
        if (mo.otherDirection) {
            this.flipImage(mo);
        } else {
            this.flipImageBack(mo);
        }
        this.ctx.restore();
    }

    /**
     * Flips an object's image horizontally.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }

    /**
     * Draws an object's image in normal direction.
     * @param {Object} mo - The object to be displayed.
     */
    flipImageBack(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}