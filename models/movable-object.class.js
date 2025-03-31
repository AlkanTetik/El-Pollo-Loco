/**
 * Repräsentiert ein bewegliches Objekt im Spiel, das grundlegende Physik, Kollisionsabfragen und Animationen unterstützt.
 * Erbt von {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Wendet die Schwerkraft auf das Objekt an. Solange das Objekt oberhalb des Bodens ist oder eine positive
     * vertikale Geschwindigkeit besitzt, wird die y-Position angepasst.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Überprüft, ob das Objekt sich oberhalb des Bodens befindet.
     * Speziell für ThrowableObjects wird immer true zurückgegeben.
     *
     * @returns {boolean} True, wenn das Objekt oberhalb des Bodens ist, sonst false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Überprüft, ob dieses Objekt mit einem anderen kollidiert.
     *
     * @param {MovableObject} mo - Das Objekt, mit dem die Kollision geprüft wird.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isColliding(mo) {
        const offsetX = 10;
        const offsetY = 10;

        const x1 = this.x + offsetX;
        const y1 = this.y + offsetY;
        const w1 = this.width - 2 * offsetX;
        const h1 = this.height - 2 * offsetY;

        const x2 = mo.x + offsetX;
        const y2 = mo.y + offsetY;
        const w2 = mo.width - 2 * offsetX;
        const h2 = mo.height - 2 * offsetY;

        return x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2;
    }

    /**
     * Überprüft, ob das Objekt mit einer Münze kollidiert.
     * Es wird zusätzlich überprüft, ob sich die Münze unterhalb der Mitte des Objekts befindet.
     *
     * @param {Object} coin - Das Münzen-Objekt, das geprüft wird.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isCoinColliding(coin) {
        const offsetX = 20;
        const offsetY = 85;
    
        const charInner = {
            x: this.x + offsetX,
            y: this.y + offsetY,
            width: this.width - 2 * offsetX,
            height: this.height - 2 * offsetY
        };
    
        const coinBox = {
            x: coin.x,
            y: coin.y,
            width: coin.width,
            height: coin.height
        };
    
        const collisionDetected = charInner.x < coinBox.x + coinBox.width &&
                                  charInner.x + charInner.width > coinBox.x &&
                                  charInner.y < coinBox.y + coinBox.height &&
                                  charInner.y + charInner.height > coinBox.y;
    
        if (collisionDetected) {
            const coinCenterY = coin.y + coin.height / 2;
            const charCenterY = this.y + this.height / 2;
    
            if (coinCenterY < charCenterY) {
                return false;
            }
            return true;
        }
        return false;
    }
    
    /**
     * Überprüft, ob das Objekt mit einer Flasche kollidiert.
     *
     * @param {Object} bottle - Das Flaschen-Objekt, das geprüft wird.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
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

    /**
     * Reduziert die Energie des Objekts um den angegebenen Schaden. Falls die Energie unter oder gleich 0 sinkt,
     * wird sie auf 0 gesetzt.
     *
     * @param {number} [damage=20] - Der Schaden, der dem Objekt zugefügt wird.
     */
    hit(damage = 20) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Prüft, ob das Objekt kürzlich Schaden genommen hat.
     *
     * @returns {boolean} True, wenn das Objekt in den letzten 1 Sekunde Schaden genommen hat, sonst false.
     */
    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit;
        this.timePassed = this.timePassed / 1000;
        return this.timePassed < 1;
    }

    /**
     * Überprüft, ob das Objekt tot ist (Energie gleich 0). Stoppt zudem laufende Intervalle.
     *
     * @returns {boolean} True, wenn das Objekt tot ist, sonst false.
     */
    isDead() {
        clearInterval(this.otherInterval);
        clearInterval(this.collisionInterval);
        return this.energy == 0;
    }

    /**
     * Spielt eine Animation ab, indem es das Bild aus dem übergebenen Array zyklisch wechselt.
     *
     * @param {string[]} images - Array von Bildpfaden für die Animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        }
        this.currentImage++;
    }

    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Lässt das Objekt springen, indem die vertikale Geschwindigkeit gesetzt wird.
     */
    jump() {
        this.speedY = 25;
    }
}
