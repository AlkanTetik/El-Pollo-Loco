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
        this.img = this.imageCache[this.IMAGES[0]]; // oder: this.img = new Image(); this.img.src = this.IMAGES[0];
        this.x = 40;
        this.y = 80;
        this.width = 150;
        this.height = 40;
        this.setPercentage(0);
    }

    // Methode zum Erhöhen der Münzanzahl
    increaseCoinCount() {
        this.coinCount++;
        this.setPercentage(this.coinCount); // oder eine eigene Methode zum Aktualisieren der Anzeige
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.coinCount >= 5) {
            return 5;
        } else if (this.coinCount >= 4) {
            return 4;
        } else if (this.coinCount >= 3) {
            return 3;
        } else if (this.coinCount >= 2) {
            return 2;
        } else if (this.coinCount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
    
    
}