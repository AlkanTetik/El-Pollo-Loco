/**
 * Basisklasse für alle Objekte, die im Spiel gezeichnet werden können.
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
     * Lädt ein einzelnes Bild von dem angegebenen Pfad.
     * @param {string} path - Der Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            // Bild wurde erfolgreich geladen
        };
        this.img.src = path;
    }

    /**
     * Lädt mehrere Bilder aus einem Array von Pfaden und speichert sie im imageCache.
     * @param {string[]} arr - Ein Array mit Bildpfaden.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let image = new Image();
            image.onload = () => {
                // Bild wurde erfolgreich geladen
            };
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    /**
     * Zeichnet das aktuelle Bild des Objekts auf den angegebenen Canvas-Kontext.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet einen Rahmen um das Objekt, wenn es sich um einen Character, Chicken oder EndBoss handelt.
     * @param {CanvasRenderingContext2D} ctx - Der Zeichenkontext des Canvas.
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
