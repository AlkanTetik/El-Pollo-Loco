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
            this.directionInterval()
        }, 1000 + Math.random() * 2000);
    }

    move() {
        if (this.movingRight) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    walkingOrDeadInterval() {
        if (this.isDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    directionInterval() {
        if (!this.isDead) {
            this.toggleDirection();
        }
    }

    toggleDirection() {
        this.movingRight = !this.movingRight;
        this.otherDirection = this.movingRight;
    }

    hit() {
        this.isDead = true;
        this.energy = 0;
        soundManager.play('chickenHurt');
    }
}