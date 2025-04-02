/**
 * Represents a throwable object in the game, which moves through the air and plays an animation upon impact.
 * Inherits from {@link MovableObject}.
 */
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

    /**
     * Creates a new instance of a throwable object.
     * Loads the necessary images, sets the position, size, and initializes the throw movement.
     *
     * @param {number} x - The x-position where the object is created.
     * @param {number} y - The y-position where the object is created.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_LANDED);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 100;
        this.isOnGround = false;
        this.throw();
    }

    /**
     * Checks if the object is above the ground.
     *
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        return this.y < 350;
    }

    /**
     * Checks if this throwable object collides with an enemy object.
     *
     * @param {MovableObject} mo - The enemy object to check collision with.
     * @returns {boolean} True if a collision occurs, otherwise false.
     */
    isBottleCollidingEnemy(mo) {
        const offsetX = 40;
        const offsetY = 40;
        return this.x + offsetX < mo.x + mo.width &&
            this.x + this.width - offsetX > mo.x &&
            this.y + offsetY < mo.y + mo.height &&
            this.y + this.height - offsetY > mo.y;
    }

    /**
     * Initializes the throw, sets the vertical speed, and applies gravity.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.performThrowMovement();
    }

    /**
     * Performs the throw movement of the object by moving it horizontally and playing the throw animation.
     * Once the object is no longer above the ground, the landing animation is triggered.
     */
    performThrowMovement() {
        let throwingInterval = setInterval(() => {
            this.x += 10;
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_THROWING);
            } else if(this.isOnGround == false){
                clearInterval(throwingInterval);
                soundManager.play('breakglass');
                this.isOnGround = true;
                this.landedFrame = 0;
                this.playLandedAnimation();
            }
        }, 25);
    }

    /**
     * Plays the landing animation. Once the animation is finished, the object is removed from the game.
     */
    playLandedAnimation() {
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
}