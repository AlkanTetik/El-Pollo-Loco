/**
 * Represents the coin display in the game.
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    coinCount = 0;

    /**
     * Creates a new CoinBar, loads the images, and initializes the display.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 40;
        this.y = 80;
        this.width = 150;
        this.height = 40;
        this.setPercentage(0);
    }

    /**
     * Increases the number of collected coins and updates the display.
     */
    increaseCoinCount() {
        this.coinCount++;
        this.setPercentage(this.coinCount);
    }

    /**
     * Sets the current percentage of the coin display.
     * @param {number} percentage - The new percentage based on the coin count.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to display based on the coin count.
     * @returns {number} The index of the corresponding image.
     */
    resolveImageIndex() {
        let index = Math.floor(this.coinCount / 2);
        if (index >= this.IMAGES.length) {
            index = this.IMAGES.length - 1;
        }
        return index;
    }
}
