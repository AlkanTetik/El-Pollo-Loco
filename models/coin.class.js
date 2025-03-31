/**
 * Repräsentiert eine Münze im Spiel.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    height = 150;
    width = 150;
    y = 150;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Erstellt eine neue Münze an einer zufälligen Position und startet die Animation.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = 400 + Math.random() * 6500;
        this.y = 220 + Math.random() * -140;
        this.animate();
    }

    /**
     * Startet die Animationsschleife für die Münze.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}