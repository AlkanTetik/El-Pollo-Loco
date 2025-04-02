/**
 * Represents the health bar of the EndBoss.
 * Inherits from MovableObject.
 */
class EndbossBar extends MovableObject {
    
    IMAGES = [
        'img/2_statusbar_endboss/blue/blue0.png',
        'img/2_statusbar_endboss/blue/blue20.png',
        'img/2_statusbar_endboss/blue/blue40.png',
        'img/2_statusbar_endboss/blue/blue60.png',
        'img/2_statusbar_endboss/blue/blue80.png',
        'img/2_statusbar_endboss/blue/blue100.png'
    ];

    world;
    percentage = 100;

    /**
     * Creates a new instance of EndbossBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 250;
        this.y = 25;
        this.health = 5;
        this.width = 150;
        this.height = 40;
        this.lastHit = 0;
        this.setPercentage(5);
    }

    /**
     * Sets the health display based on the given health value.
     * @param {number} health - The current health value of the EndBoss.
     */
    setPercentage(health) {
        this.health = health;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Reduces the EndBoss's health by the specified amount.
     * @param {number} [hit=1] - The amount of damage to subtract.
     */
    hit(hit = 1) {
        this.health -= hit;
        if (this.health <= 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Determines the index of the corresponding image path based on the current health.
     * @returns {number} The index of the image path in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.health == 5) {
            return 5;
        } else if (this.health >= 4) {
            return 4;
        } else if (this.health >= 3) {
            return 3;
        } else if (this.health >= 2) {
            return 2;
        } else if (this.health >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
