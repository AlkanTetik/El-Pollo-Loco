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
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 130;
        }
    }

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
