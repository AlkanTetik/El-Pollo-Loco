class DrawableObject {
    x = 120;
    y = 240;
    width = 100;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;
    camera_x = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
        };
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let image = new Image();
            image.onload = () => {
            };
            image.src = path;
            this.imageCache[path] = image;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        };
    }
}