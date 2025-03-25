class SalsaBottle extends MovableObject {
    height = 100;
    width =100;
    y = 330;

    IMAGES_SALSA = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor(){
        super();
        this.loadImage(this.IMAGES_SALSA[0]);
        this.loadImages(this.IMAGES_SALSA);
        this.x = 400 + Math.random() * 6500;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSA)
        }, 1000);
    }
} 