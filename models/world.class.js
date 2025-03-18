class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    coinbar = new CoinBar();
    bottlebar = new BottleBar();
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
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        // Verknüpfe den Charakter mit der Spielwelt, damit er z. B. auf die Statusbar zugreifen kann.
        this.character.world = this;
    }

    draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Speichere den aktuellen Zustand des Canvas
        this.ctx.save();
        // Wende die Kameratranslation an
        this.ctx.translate(this.camera_x, 0);

        // Zeichne die Hintergrundobjekte und Spielfiguren
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.throwableObj);

        // Wiederherstellen des Canvas-Zustandes, damit die UI (Statusbar) fest bleibt
        this.ctx.restore();

        // Zeichne die Statusbar als UI-Element (fest am Bildschirm)
        this.addToMap(this.bottlebar);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);

        requestAnimationFrame(() => this.draw());
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
            this.character.hit();
            this.character.lastHit = Date.now();
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
    }

    handleEndBossCollision(enemy, verticalDiff) {
        if (this.character.speedY < 0 && verticalDiff < enemy.height * 0.5) {
            if (!enemy.isDead()) enemy.hit();
        } else if (!enemy.isDead() && Date.now() - this.character.lastHit > 1300) {
            this.character.hit();
            this.character.lastHit = Date.now();
            this.statusbar.setPercentage(this.character.energy);
            soundManager.play('hurt');
        }
        if (this instanceof EndBoss == isDead()) {
            clearInterval(this.otherInterval);
            clearInterval(this.collisionInterval);
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
        if (this.character.energy == 0) {
            this.showLose();
            soundManager.play('lose');
            clearInterval(this.collisionInterval);
            clearInterval(this.otherInterval);
        }
    }

    showLose() {
        let overlay = document.getElementById('overlayLose');
        let restartLoseBtn = document.getElementById('restartLoseBtn');
        overlay.style.display = "flex";
        restartLoseBtn.style.display = "flex";
       
        restartLoseBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });

        this.keyboard = new Keyboard();

    }

    checkWin() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof EndBoss && enemy.isDead()) {
                this.showVictory();
                clearInterval(this.collisionInterval);
                clearInterval(this.otherInterval);
            }
        });
    }
    

    showVictory() {
        let overlay = document.getElementById('overlayWin');
        let restartWinBtn = document.getElementById('restartWinBtn');
        overlay.style.display = "flex";
        restartWinBtn.style.display = "flex";

        // Beim ersten Klick wird die Seite neu geladen (Neustart des Spiels)
        restartWinBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });

        this.keyboard = new Keyboard();
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
                    // Entferne die Flasche
                    this.throwableObj.splice(bottleIndex, 1);
                    // Lasse den Gegner den Treffer registrieren
                    enemy.hit();
                    // Spiele den BottleHit-Sound
                    soundManager.play('bottleHit');
                    // Wenn der getroffene Gegner ein Chicken ist, entferne es nach 500ms
                    if (enemy instanceof Chicken) {
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
