/**
 * Repräsentiert die Lebensleiste im Spiel.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    /**
     * Erstellt eine neue StatusBar, lädt die entsprechenden Bilder und setzt den anfänglichen Prozentsatz.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 50;
        this.width = 150;
        this.height = 40;
        this.setPercentage(100);
    }

    /**
     * Setzt den aktuellen Prozentsatz der Lebensleiste und aktualisiert das angezeigte Bild.
     * @param {number} percentage - Der neue Prozentwert der Lebensleiste.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des anzuzeigenden Bildes basierend auf dem aktuellen Prozentsatz.
     * @returns {number} Der Index des Bildes, das dem aktuellen Prozentwert entspricht.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}