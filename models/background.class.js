/**
 * Repräsentiert ein Hintergrundobjekt im Spiel.
 * Erbt von {@link MovableObject} und positioniert sich basierend auf der übergebenen Position.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Erzeugt eine neue Instanz von BackgroundObject, lädt das übergebene Bild und
     * positioniert das Objekt an der angegebenen Stelle.
     *
     * @param {string} imagePath - Der Pfad zum Bild, das dargestellt werden soll.
     * @param {number} x - Die x-Position des Hintergrundobjekts.
     * @param {number} y - Die y-Position (wird intern angepasst).
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}