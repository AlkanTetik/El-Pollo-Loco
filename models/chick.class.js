/**
 * Repräsentiert einen kleinen Gegner (Chicken), der sich im Spiel bewegt.
 * Erbt von {@link MovableObject}.
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
     * Erzeugt eine neue Instanz von Chick und initialisiert deren Eigenschaften.
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
     * Startet die verschiedenen Animationsintervalle für den Chick.
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
     * Bewegt den Chick in die aktuelle Bewegungsrichtung.
     */
    move() {
        if (this.movingRight) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    /**
     * Wechselt zwischen den Animationen für das Gehen und den Tod.
     */
    walkingOrDeadInterval() {
        if (this.isDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Bestimmt in regelmäßigen Abständen, ob die Bewegungsrichtung gewechselt werden soll.
     */
    directionInterval() {
        if (!this.isDead) {
            this.toggleDirection();
        }
    }

    /**
     * Wechselt die Bewegungsrichtung des Chick.
     */
    toggleDirection() {
        this.movingRight = !this.movingRight;
        this.otherDirection = this.movingRight;
    }

    /**
     * Setzt den Chick in den "toten" Zustand, reduziert dessen Energie und spielt den entsprechenden Sound.
     */
    hit() {
        this.isDead = true;
        this.energy = 0;
        soundManager.play('chickenHurt');
    }
}
