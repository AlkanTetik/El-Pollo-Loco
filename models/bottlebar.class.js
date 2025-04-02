/**
 * Represents the bottle display (BottleBar) in the game, which visualizes the current bottle fill level.
 * Inherits from {@link DrawableObject}.
 */
class BottleBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    /**
     * Creates a new instance of BottleBar, loads the image resources, and sets the position, size, and initial status.
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 40;
        this.y = 20;
        this.width = 150;
        this.height = 40;
        this.bottleCount = 0; 
        this.setPercentage(0);
    }

    /**
     * Increases the bottle count if it is below 5 and updates the display.
     */
    increaseBottleCount() {
        if (this.bottleCount < 5) { 
            this.bottleCount++;
            this.setPercentage(this.bottleCount);
        }
    }     
   
    /**
     * Decreases the bottle count if it is above 0 and updates the display.
     */
    decreaseBottleCount() {
        if (this.bottleCount > 0) {
            this.bottleCount--;
            this.setPercentage(this.bottleCount);
        }
    }

    /**
     * Updates the display of the BottleBar based on the current bottle count.
     *
     * @param {number} percentage - The current fill level in percentage (or number of bottles).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index in the IMAGES array that corresponds to the current number of bottles.
     *
     * @returns {number} The index indicating which image the BottleBar should use.
     */
    resolveImageIndex() {
        if (this.bottleCount >= 5) {
            return 5;
        } else if (this.bottleCount >= 4) {
            return 4;
        } else if (this.bottleCount >= 3) {
            return 3;
        } else if (this.bottleCount >= 2) {
            return 2;
        } else if (this.bottleCount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
