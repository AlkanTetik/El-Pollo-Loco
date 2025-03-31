/**
 * Repräsentiert einen normalen Chicken-Gegner im Spiel.
 * Erbt von {@link MovableObject} und unterstützt grundlegende Bewegungs- und Animationslogik.
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
     * Erzeugt eine neue Instanz von Chicken, lädt die benötigten Bilder, setzt die Startposition und initialisiert die Animation.
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
     * Startet die Animationsintervalle für den Chicken.
     * Führt Bewegungen, Animationswechsel und Richtungswechsel in regelmäßigen Abständen aus.
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
     * Bewegt den Chicken in die aktuelle Bewegungsrichtung.
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
     * Prüft in regelmäßigen Abständen, ob die Bewegungsrichtung gewechselt werden soll.
     */
    directionInterval() {
        if (!this.isDead) {
            this.toggleDirection();
        }
    }

    /**
     * Wechselt die Bewegungsrichtung des Chicken.
     */
    toggleDirection() {
        this.movingRight = !this.movingRight;
        this.otherDirection = this.movingRight;
    }

    /**
     * Löst die "Hit"-Reaktion aus, markiert den Chicken als tot und spielt den entsprechenden Sound ab.
     */
    hit() {
        this.isDead = true;
        this.energy = 0;
        soundManager.play('chickenHurt');
    }
}
