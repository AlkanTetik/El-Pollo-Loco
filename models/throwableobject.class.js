class ThrowableObject extends MovableObject {
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_LANDED = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_LANDED);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 100;
        // Setze den initialen Zustand: noch nicht gelandet
        this.isOnGround = false;
        this.throw();
    }

    isAboveGround() {
        return this.y < 350;
    }

    isBottleCollidingEnemy(mo) {
        const offsetX = 40; // Passe die Offsets ggf. an
        const offsetY = 40;
        return this.x + offsetX < mo.x + mo.width &&
               this.x + this.width - offsetX > mo.x &&
               this.y + offsetY < mo.y + mo.height &&
               this.y + this.height - offsetY > mo.y;
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
    
        let throwingInterval = setInterval(() => {
            this.x += 10;
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                clearInterval(throwingInterval);
                soundManager.play('breakglass');
                this.isOnGround = true;
                this.landedFrame = 0;
                let landedInterval = setInterval(() => {
                    if (this.landedFrame < this.IMAGES_LANDED.length) {
                        this.img = this.imageCache[this.IMAGES_LANDED[this.landedFrame]];
                        this.landedFrame++;
                    } else {
                        clearInterval(landedInterval);
                        const index = world.throwableObj.indexOf(this);
                        if (index > -1) {
                            world.throwableObj.splice(index, 1);
                        }
                    }
                }, 25);
            }
        }, 25);
    }
}
