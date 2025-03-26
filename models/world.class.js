class World {
    // Entferne die Feldinitialisierung des Charakters – er wird nun im Konstruktor erzeugt.
    character;
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    gameOver = false; // Neues Flag
    camera_x = 0;
    soundManager = new SoundManager();
    statusbar = new StatusBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
    sawEndboss = false;
    endbossbar = new EndbossBar();
    throwableObj = [
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
    ];

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.character = new Character(this);
        this.setWorld();
        this.level = createLevel1();

        // Setze die Weltreferenz in den Gegnern (falls nötig)
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof EndBoss) {
                enemy.world = this;
            }
        });

        // Erzeuge den EndBoss mit korrekten Referenzen:
        this.endboss = new EndBoss(this, this.character);

        this.draw();
        this.run();
    }

    resetLevel() {
        this.level = createLevel1();
        this.character = new Character(this);
        this.statusbar = new StatusBar();
        this.coinbar = new CoinBar();
        this.bottlebar = new BottleBar();
        this.endbossbar = new EndbossBar();
        this.throwableObj = [
            new ThrowableObject(),
            new ThrowableObject(),
            new ThrowableObject(),
            new ThrowableObject(),
            new ThrowableObject(),
        ];
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.throwableObj);

        this.ctx.restore();

        this.addToMap(this.bottlebar);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);

        if (this.character.x >= 6700) {
            this.sawEndboss = true;
        }

        if (this.sawEndboss) {
            this.addToMap(this.endbossbar);
        }

        this.animationFrameID = requestAnimationFrame(() => this.draw());
    }

    stop() {
        clearInterval(this.collisionInterval);
        clearInterval(this.otherInterval);
        cancelAnimationFrame(this.animationFrameID);
    }

    collisionInterval;
    otherInterval;

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
            this.checkBottleEnemyCollision(); // Hier prüfen, ob eine geworfene Flasche einen Gegner trifft.
        }, 200);
    }

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

    handleChickenCollision(enemy, verticalDiff, chickensToKill) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 0.5) {
            chickensToKill.push(enemy);
        } else if (!enemy.isDead && Date.now() - this.character.lastHit > 1500) {
            this.character.hit(20);
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }

    handleChickCollision(enemy, verticalDiff, chickensToKill) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 1) {
            chickensToKill.push(enemy);
        } else if (!enemy.isDead && Date.now() - this.character.lastHit > 1500) {
            this.character.hit(10);
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }

    handleEndBossCollision(enemy, verticalDiff) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 0.5) {
            if (!enemy.isDead()) enemy.hit(); // Angenommen, der EndBoss hat eigene Schadenslogik
        } else if (!enemy.isDead() && Date.now() - this.character.lastHit > 1300) {
            this.character.hit(50);
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }


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

    checkLose() {
        if (this.character.energy == 0 && !this.gameOver) {
            this.gameOver = true; // Flag setzen
            this.showLose();
            soundManager.pauseAll();
            soundManager.play('lose');
            this.stop();
            this.keyboard = new Keyboard();
        }
    }

    showLose() {
        let overlay = document.getElementById('overlayLose');
        let restartLoseBtn = document.getElementById('restartLoseBtn');
        let backToMenuBtn = document.getElementById('backLoseMenu');

        // Overlay anzeigen
        overlay.style.display = "flex";
        restartLoseBtn.style.display = "block";
        backToMenuBtn.style.display = "block";

        // Restart: Spiel neu laden
        restartLoseBtn.addEventListener('click', () => {
            restartGame(); // Aufruf der globalen Funktion
        }, { once: true });

        // Back to Menu: Overlay ausblenden und Menü anzeigen
        backToMenuBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });
    }

    checkWin() {
        // Falls das Spiel bereits vorbei ist, führe nichts mehr aus
        if (this.gameOver) return;

        this.level.enemies.forEach(enemy => {
            if (enemy instanceof EndBoss && enemy.isDead()) {
                this.gameOver = true; // Flag setzen
                this.stop(); // Stoppe alle laufenden Prozesse, inklusive Animationen und Intervalle
                this.showVictory();
                this.keyboard = new Keyboard();
            }
        });
    }

    showVictory() {
        let overlay = document.getElementById('overlayWin');
        let restartWinBtn = document.getElementById('restartWinBtn');
        let backToMenuBtn = document.getElementById('backWinMenu');

        // Overlay anzeigen
        overlay.style.display = "flex";
        restartWinBtn.style.display = "block";
        backToMenuBtn.style.display = "block";

        // Restart: Spiel neu laden
        restartWinBtn.addEventListener('click', () => {
            restartGame(); // Aufruf der globalen Funktion
        }, { once: true });

        // Back to Menu: Overlay ausblenden und Menü anzeigen
        backToMenuBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });
    }

    checkCoinCollection() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isCoinColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinbar.increaseCoinCount();
                soundManager.play('coin');
            }
        });
    }

    checkBottleCollection() {
        this.level.salsabottle.forEach((bottle, index) => {
            if (this.character.isBottleColliding(bottle) && this.bottlebar.bottleCount < 5) {
                this.level.salsabottle.splice(index, 1);
                this.bottlebar.increaseBottleCount();
                soundManager.play('bottle');
            }
        });
    }

    checkBottleEnemyCollision() {
        this.throwableObj.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isBottleCollidingEnemy(enemy)) {
                    this.throwableObj.splice(bottleIndex, 1);
                    enemy.hit();
                    if (enemy instanceof Chicken) {
                        soundManager.play('bottleHit');
                        setTimeout(() => {
                            const index = this.level.enemies.indexOf(enemy);
                            if (index > -1) {
                                this.level.enemies.splice(index, 1);
                            }
                        }, 500);
                    }

                    if (enemy instanceof Chick) {
                        soundManager.play('hurt');
                        setTimeout(() => {
                            const index = this.level.enemies.indexOf(enemy);
                            if (index > -1) {
                                this.level.enemies.splice(index, 1);
                            }
                        }, 500);
                    }
                }
            });
        });
    }

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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (typeof o.update === 'function') {
                o.update();
            }
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.save();
        // Falls das Objekt in die entgegengesetzte Richtung schaut, wird das Bild gespiegelt
        if (mo.otherDirection) {
            this.flipImage(mo);
            // Optional: Zeichne einen blauen Rahmen (zur Debugging-Zwecken)
            this.ctx.beginPath();
            this.ctx.lineWidth = "5";
            this.ctx.strokeStyle = "blue";
            this.ctx.rect(0, 0, mo.width, mo.height);
            this.ctx.stroke();
        } else {
            this.flipImageBack(mo);
            mo.drawFrame(this.ctx);
        }
        this.ctx.restore();
    }

    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
    }

    flipImageBack(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
