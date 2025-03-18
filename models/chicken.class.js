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

    constructor() {
        super();
        this.energy = 20;
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1200 + Math.random() * 1000;
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
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);

        setInterval(() => {
            if (!this.isDead) {
                this.toggleDirection();
            }
        }, 1000 + Math.random() * 2000);
    }

    move() {
        if (this.movingRight) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    toggleDirection() {
        this.movingRight = !this.movingRight;
        this.otherDirection = this.movingRight;
    }

    hit() {
        let audio = new Audio('audio/chickenhurt.mp3');
        this.isDead = true;
        this.energy = 0;
        audio.play();
    }
}
