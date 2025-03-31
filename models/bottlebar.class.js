/**
 * Repräsentiert die Flaschenanzeige (BottleBar) im Spiel, die den aktuellen Füllstand der Flaschen visualisiert.
 * Erbt von {@link DrawableObject}.
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
     * Erzeugt eine neue Instanz von BottleBar, lädt die Bildressourcen und setzt Position, Größe sowie den Anfangsstatus.
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
     * Erhöht den Flaschenzähler, sofern dieser unter 5 liegt, und aktualisiert die Anzeige.
     */
    increaseBottleCount() {
        if (this.bottleCount < 5) { 
            this.bottleCount++;
            this.setPercentage(this.bottleCount);
        }
    }     
   
    /**
     * Verringert den Flaschenzähler, sofern dieser über 0 liegt, und aktualisiert die Anzeige.
     */
    decreaseBottleCount() {
        if (this.bottleCount > 0) {
            this.bottleCount--;
            this.setPercentage(this.bottleCount);
        }
    }

    /**
     * Aktualisiert die Anzeige der BottleBar basierend auf dem aktuellen Flaschenzähler.
     *
     * @param {number} percentage - Der aktuelle Füllstand in Prozent (bzw. Flaschenanzahl).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index im IMAGES-Array, der der aktuellen Anzahl der Flaschen entspricht.
     *
     * @returns {number} Der Index, der anzeigt, welches Bild der BottleBar verwendet werden soll.
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
