/**
 * Represents a background object in the game.
 * Inherits from {@link MovableObject} and positions itself based on the provided position.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new instance of BackgroundObject, loads the provided image, and
     * positions the object at the specified location.
     *
     * @param {string} imagePath - The path to the image to be displayed.
     * @param {number} x - The x-position of the background object.
     * @param {number} y - The y-position (internally adjusted).
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
