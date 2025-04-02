/**
 * Represents a coin in the game.
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
     * Creates a new coin at a random position and starts the animation.
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
     * Starts the animation loop for the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
    }
}