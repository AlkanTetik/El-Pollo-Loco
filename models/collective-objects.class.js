/**
 * Basisklasse für gemeinsame Objekte, die Bilder laden können.
 */
class CollectiveObjects {
    /**
     * Lädt ein Bild von dem angegebenen Pfad.
     * @param {string} path - Der Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {};
        this.img.src = path;
    }
}