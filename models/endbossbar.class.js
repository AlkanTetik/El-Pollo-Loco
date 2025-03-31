/**
 * Repräsentiert die Lebensleiste des Endbosses.
 * Erbt von MovableObject.
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
     * Erstellt eine neue Instanz der EndbossBar.
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
     * Setzt die Lebensanzeige anhand des übergebenen Gesundheitswerts.
     * @param {number} health - Der aktuelle Gesundheitswert des Endbosses.
     */
    setPercentage(health) {
        this.health = health;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Reduziert die Gesundheit des Endbosses um den angegebenen Wert.
     * @param {number} [hit=1] - Der Schadenswert, der abgezogen wird.
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
     * Ermittelt den Index des entsprechenden Bildpfads basierend auf der aktuellen Gesundheit.
     * @returns {number} Der Index des Bildpfads im IMAGES-Array.
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
