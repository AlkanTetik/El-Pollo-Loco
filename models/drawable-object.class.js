/**
 * Base class for all objects that can be drawn in the game.
 */
class DrawableObject {
    x = 120;
    y = 240;
    width = 100;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;
    camera_x = 0;

    /**
     * Loads a single image from the specified path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            // Image successfully loaded
        };
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths and stores them in the imageCache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let image = new Image();
            image.onload = () => {
                // Image successfully loaded
            };
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    /**
     * Draws the object's current image onto the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object if it is a Character, Chicken, or EndBoss.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
