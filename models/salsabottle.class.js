/**
 * Repräsentiert eine Salsa-Flasche, die auf dem Boden liegt und animiert wird.
 * Erbt von {@link MovableObject}.
 */
class SalsaBottle extends MovableObject {
    height = 100;
    width = 100;
    y = 330;

    IMAGES_SALSA = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Erzeugt eine neue Instanz von SalsaBottle, lädt die Bildressourcen,
     * setzt die Startposition und startet die Animation.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_SALSA[0]);
        this.loadImages(this.IMAGES_SALSA);
        this.x = 400 + Math.random() * 6500;
        this.animate();
    }
    
    /**
     * Startet die Animation der SalsaBottle, indem in regelmäßigen Abständen
     * die Bildressourcen durchlaufen werden.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSA);
        }, 1000);
    }
}