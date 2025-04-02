/**
 * Represents a small enemy (Chicken) that moves in the game.
 * Inherits from {@link MovableObject}.
 */
class Chick extends MovableObject {
    height = 60;
    width = 70;
    y = 370;
    movingRight = false;
    isDead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    /**
     * Creates a new instance of Chick and initializes its properties.
     */
    constructor() {
        super();
        this.energy = 20;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1200 + Math.random() * 6500;
        this.speed = 15 + Math.random() * 0.55;
        this.animate();
    }

    /**
     * Starts the various animation intervals for the Chick.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.move();
            }
        }, 50);

        setInterval(() => {
            this.walkingOrDeadInterval();
        }, 100);

        setInterval(() => {
            this.directionInterval();
        }, 1000 + Math.random() * 2000);
    }

    /**
     * Moves the Chick in the current direction.
     */
    move() {
        if (this.movingRight) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    /**
     * Switches between the walking and dead animations.
     */
    walkingOrDeadInterval() {
        if (this.isDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Determines at regular intervals whether the movement direction should be changed.
     */
    directionInterval() {
        if (!this.isDead) {
            this.toggleDirection();
        }
    }

    /**
     * Toggles the movement direction of the Chick.
     */
    toggleDirection() {
        this.movingRight = !this.movingRight;
        this.otherDirection = this.movingRight;
    }

    /**
     * Sets the Chick to the "dead" state, reduces its energy, and plays the corresponding sound.
     */
    hit() {
        this.isDead = true;
        this.energy = 0;
        soundManager.play('chickenHurt');
    }
}
