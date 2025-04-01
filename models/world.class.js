/**
 * Stellt die Spielwelt dar.
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
     * Erstellt eine neue Instanz der Welt.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem das Spiel gezeichnet wird.
     * @param {Keyboard} keyboard - Das Keyboard-Objekt für die Steuerung.
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
     * Setzt das Level zurück.
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
     * Setzt die Welt-Referenz im Character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Zeichnet die Spielwelt und startet die Animationsschleife.
     */
    draw() {
        this.clearAndTranslate();
        this.drawLevelObjects();
        this.drawUI();
        this.animationFrameID = requestAnimationFrame(() => this.draw());
    }
    
    /**
     * Löscht das Canvas und setzt die Kamera.
     */
    clearAndTranslate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
    }
    
    /**
     * Zeichnet alle Objekte des Levels.
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
     * Zeichnet die UI-Elemente.
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
     * Stoppt alle Intervalle und Animationen.
     */
    stop() {
        clearInterval(this.collisionInterval);
        clearInterval(this.otherInterval);
        cancelAnimationFrame(this.animationFrameID);
    }
    
    collisionInterval
    otherInterval;

    /**
     * Startet die Spiel-Loop mit verschiedenen Intervallen.
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
     * Verarbeitet die Kollision zwischen Charakter und einem Chicken.
     * @param {Chicken} enemy - Der getroffen Chicken-Feind.
     * @param {number} verticalDiff - Vertikale Differenz zur Erkennung des Sprungs.
     * @param {Array} chickensToKill - Array, in dem zu tötende Hühner gesammelt werden.
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
     * Verarbeitet die Kollision zwischen Charakter und einem Chick.
     * @param {Chick} enemy - Der getroffen Chick-Feind.
     * @param {number} verticalDiff - Vertikale Differenz zur Erkennung des Sprungs.
     * @param {Array} chickensToKill - Array, in dem zu tötende Hühner gesammelt werden.
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
     * Verarbeitet die Kollision zwischen Charakter und dem Endboss.
     * @param {EndBoss} enemy - Der Endboss.
     * @param {number} verticalDiff - Vertikale Differenz zur Erkennung des Sprungs.
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
     * Verarbeitet alle Hühner-Kollisionen nach dem Sprung.
     * @param {Array} chickensToKill - Array der Hühner, die getötet werden sollen.
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
     * Überprüft, ob der Spieler verloren hat.
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
     * Zeigt den "Verloren"-Overlay an.
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
     * Überprüft, ob der Spieler gewonnen hat.
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
     * Zeigt den "Gewonnen"-Overlay an.
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
     * Überprüft alle Kollisionen zwischen dem Charakter und Feinden.
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
     * Überprüft, ob der Charakter eine Münze eingesammelt hat.
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
     * Überprüft, ob der Charakter eine Flasche eingesammelt hat.
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
     * Überprüft, ob eine geworfene Flasche einen Feind trifft.
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
     * Verarbeitet den Treffer einer Flasche an einem Feind.
     * @param {number} bottleIndex - Der Index der geworfenen Flasche.
     * @param {Enemy} enemy - Der getroffene Feind.
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
     * Plant das Entfernen eines Feindes nach einem Treffer.
     * @param {Enemy} enemy - Der zu entfernende Feind.
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
     * Überprüft, ob ein werfbares Objekt geworfen werden soll.
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
     * Fügt mehrere Objekte der Karte hinzu.
     * @param {Object[]} objects - Array von Objekten, die gezeichnet werden sollen.
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
     * Zeichnet ein einzelnes Objekt auf der Karte.
     * @param {Object} mo - Das darzustellende Objekt.
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
     * Spiegelt das Bild eines Objekts horizontal.
     * @param {Object} mo - Das Objekt, dessen Bild gespiegelt werden soll.
     */
    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }

    /**
     * Zeichnet das Bild eines Objekts in Normalrichtung.
     * @param {Object} mo - Das darzustellende Objekt.
     */
    flipImageBack(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
