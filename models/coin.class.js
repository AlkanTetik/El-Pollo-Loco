class Coin extends MovableObject {
    height = 150;
    width = 150;
    y = 150;

    constructor(){
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 1500;
        this.y = 220 + Math.random() * -140;
    }
}