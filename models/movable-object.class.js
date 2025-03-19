class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwableobjs should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof EndBoss || this instanceof Chick) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        };
    }

    isColliding(mo) {
        // Definiere Offset-Werte (zum Beispiel 10 Pixel von jeder Seite)
        const offsetX = 10;
        const offsetY = 10;

        // Berechne die innere Hitbox des aktuellen Objekts
        const x1 = this.x + offsetX;
        const y1 = this.y + offsetY;
        const w1 = this.width - 2 * offsetX;
        const h1 = this.height - 2 * offsetY;

        // Berechne die innere Hitbox des Vergleichsobjekts
        const x2 = mo.x + offsetX;
        const y2 = mo.y + offsetY;
        const w2 = mo.width - 2 * offsetX;
        const h2 = mo.height - 2 * offsetY;

        // Prüfe, ob sich diese inneren Bereiche überlappen
        return x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2;
    }

    isCoinColliding(coin) {
        // Offset-Werte für den Charakter (Anpassung möglich)
        const offsetX = 20;
        const offsetY = 85;
    
        // Definiere den inneren Bereich des Charakters
        const charInner = {
            x: this.x + offsetX,
            y: this.y + offsetY,
            width: this.width - 2 * offsetX,
            height: this.height - 2 * offsetY
        };
    
        // Verwende die volle Bounding Box für den Coin (kann bei Bedarf angepasst werden)
        const coinBox = {
            x: coin.x,
            y: coin.y,
            width: coin.width,
            height: coin.height
        };
    
        // Prüfe zunächst, ob sich die Bereiche überlappen
        const collisionDetected = charInner.x < coinBox.x + coinBox.width &&
                                  charInner.x + charInner.width > coinBox.x &&
                                  charInner.y < coinBox.y + coinBox.height &&
                                  charInner.y + charInner.height > coinBox.y;
    
        if (collisionDetected) {
            // Berechne die vertikalen Mittelpunkte
            const coinCenterY = coin.y + coin.height / 2;
            const charCenterY = this.y + this.height / 2;
    
            // Wenn der Coin oberhalb der Mitte des Charakters liegt,
            // soll er nicht eingesammelt werden.
            if (coinCenterY < charCenterY) {
                return false;
            }
            return true;
        }
        return false;
    }
    
    isBottleColliding(bottle) {
        const offsetX = 30;
        const offsetY = 0;

        const charInner = {
            x: this.x + offsetX,
            y: this.y + offsetY,
            width: this.width - 2 * offsetX,
            height: this.height - 2 * offsetY
        };

        const bottleInner = {
            x: bottle.x + offsetX,
            y: bottle.y + offsetY,
            width: bottle.width - 2 * offsetX,
            height: bottle.height - 2 * offsetY
        };

        return charInner.x < bottleInner.x + bottleInner.width &&
            charInner.x + charInner.width > bottleInner.x &&
            charInner.y < bottleInner.y + bottleInner.height &&
            charInner.y + charInner.height > bottleInner.y;
    }

    hit(damage = 20) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return this.timePassed < 1;
    }

    isDead() {
        clearInterval(this.otherInterval);
        clearInterval(this.collisionInterval);
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        }
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 25;
    }
}
