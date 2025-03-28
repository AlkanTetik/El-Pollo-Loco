class BottleBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

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

    increaseBottleCount() {
        if (this.bottleCount < 5) { 
            this.bottleCount++;
            this.setPercentage(this.bottleCount);
        }
    }     
    
    decreaseBottleCount() {
        if (this.bottleCount > 0) {
            this.bottleCount--;
            this.setPercentage(this.bottleCount);
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

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
