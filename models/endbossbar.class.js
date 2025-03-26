class EndbossBar extends MovableObject {
    IMAGES = [
        'img/2_statusbar_endboss/blue/blue0.png',
        'img/2_statusbar_endboss/blue/blue20.png',
        'img/2_statusbar_endboss/blue/blue40.png',
        'img/2_statusbar_endboss/blue/blue60.png',
        'img/2_statusbar_endboss/blue/blue80.png',
        'img/2_statusbar_endboss/blue/blue100.png'
    ]

    world;
    percentage = 100;

    constructor() {
        super();
        // this.world = world; // falls benötigt
        this.loadImages(this.IMAGES);
        this.x = 250;
        this.y = 25;
        this.health = 5;
        this.width = 150;
        this.height = 40;
        this.lastHit = 0;
        this.setPercentage(5);
    }

    setPercentage(health) {
        this.health = health;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    hit(hit = 1) {
        this.health -= hit;
        if (this.health <= 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

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
