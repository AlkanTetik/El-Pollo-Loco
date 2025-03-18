class CollectiveObjects {
    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
        };
        this.img.src = path;
    }
}