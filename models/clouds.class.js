class Clouds extends MovableObject {
  y = 10;
  width = 800;
  height = 300;

  IMAGES_WALKING = [
    'img/5_background/layers/4_clouds/full.png',
    'img/5_background/layers/4_clouds/full.png',
    'img/5_background/layers/4_clouds/full.png',
  ];

  constructor() {
    super();
    this.loadImage('img/5_background/layers/4_clouds/full.png');
    this.loadImages(this.IMAGES_WALKING);
    // Zufällige Startposition innerhalb eines größeren Bereichs
    this.x = 100 + Math.random() * 2700;
    this.speed = 0.15 + Math.random() * 0.55;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 4000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}