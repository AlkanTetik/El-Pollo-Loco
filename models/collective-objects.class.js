/**
 * Base class for common objects that can load images.
 */
class CollectiveObjects {
    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {};
        this.img.src = path;
    }
}