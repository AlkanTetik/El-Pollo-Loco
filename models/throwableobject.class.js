/**
 * Repräsentiert ein werfbares Objekt im Spiel, das sich durch die Luft bewegt und beim Aufprall eine Animation abspielt.
 * Erbt von {@link MovableObject}.
 */
class ThrowableObject extends MovableObject {
    IMAGES_THROWING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_LANDED = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Erzeugt eine neue Instanz eines werfbaren Objekts.
     * Lädt die nötigen Bilder, setzt die Position, Größe und initialisiert die Wurfbewegung.
     *
     * @param {number} x - Die x-Position, an der das Objekt erstellt wird.
     * @param {number} y - Die y-Position, an der das Objekt erstellt wird.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_LANDED);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 100;
        this.isOnGround = false;
        this.throw();
    }

    /**
     * Überprüft, ob das Objekt sich oberhalb des Bodens befindet.
     *
     * @returns {boolean} True, wenn das Objekt oberhalb des Bodens ist, sonst false.
     */
    isAboveGround() {
        return this.y < 350;
    }

    /**
     * Überprüft, ob dieses werfbare Objekt mit einem feindlichen Objekt kollidiert.
     *
     * @param {MovableObject} mo - Das feindliche Objekt, mit dem kollidiert werden soll.
     * @returns {boolean} True, wenn eine Kollision vorliegt, sonst false.
     */
    isBottleCollidingEnemy(mo) {
        const offsetX = 40;
        const offsetY = 40;
        return this.x + offsetX < mo.x + mo.width &&
            this.x + this.width - offsetX > mo.x &&
            this.y + offsetY < mo.y + mo.height &&
            this.y + this.height - offsetY > mo.y;
    }

    /**
     * Initialisiert den Wurf, setzt die vertikale Geschwindigkeit und wendet die Schwerkraft an.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.performThrowMovement();
    }

    /**
     * Führt die Wurfbewegung des Objekts aus, indem es sich horizontal bewegt und die Wurf-Animation abspielt.
     * Sobald das Objekt nicht mehr oberhalb des Bodens ist, wird die Landungsanimation gestartet.
     */
    performThrowMovement() {
        let throwingInterval = setInterval(() => {
            this.x += 10;
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_THROWING);
            } else {
                clearInterval(throwingInterval);
                soundManager.play('breakglass');
                this.isOnGround = true;
                this.landedFrame = 0;
                this.playLandedAnimation();
            }
        }, 25);
    }

    /**
     * Spielt die Landungsanimation ab. Nach Beendigung der Animation wird das Objekt aus dem Spiel entfernt.
     */
    playLandedAnimation() {
        let landedInterval = setInterval(() => {
            if (this.landedFrame < this.IMAGES_LANDED.length) {
                this.img = this.imageCache[this.IMAGES_LANDED[this.landedFrame]];
                this.landedFrame++;
            } else {
                clearInterval(landedInterval);
                const index = world.throwableObj.indexOf(this);
                if (index > -1) {
                    world.throwableObj.splice(index, 1);
                }
            }
        }, 25);
    }
}
