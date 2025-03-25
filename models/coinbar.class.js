class CoinBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]

    coinCount = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.img = this.imageCache[this.IMAGES[0]];
        this.x = 40;
        this.y = 80;
        this.width = 150;
        this.height = 40;
        this.setPercentage(0);
    }

    increaseCoinCount() {
        this.coinCount++;
        this.setPercentage(this.coinCount); 
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        let index = Math.floor(this.coinCount / 2);
        if (index >= this.IMAGES.length) {
            index = this.IMAGES.length - 1;
        }
        return index;
    }    
}