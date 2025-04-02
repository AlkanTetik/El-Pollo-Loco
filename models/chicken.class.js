/**
 * Represents a normal Chicken enemy in the game.
 * Inherits from {@link MovableObject} and supports basic movement and animation logic.
 */
class Chicken extends MovableObject {
    height = 80;
    width = 90;
    y = 350;
    movingRight = false;
    isDead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Creates a new instance of Chicken, loads the required images, sets the starting position, and initializes the animation.
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
     * Starts the animation intervals for the Chicken.
     * Executes movements, animation switches, and direction changes at regular intervals.
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
     * Moves the Chicken in the current direction.
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
     * Checks at regular intervals whether the movement direction should be changed.
     */
    directionInterval() {
        if (!this.isDead) {
            this.toggleDirection();
        }
    }

    /**
     * Toggles the movement direction of the Chicken.
     */
    toggleDirection() {
        this.movingRight = !this.movingRight;
        this.otherDirection = this.movingRight;
    }

    /**
     * Triggers the "hit" reaction, marks the Chicken as dead, and plays the corresponding sound.
     */
    hit() {
        this.isDead = true;
        this.energy = 0;
        soundManager.play('chickenHurt');
    }
}
