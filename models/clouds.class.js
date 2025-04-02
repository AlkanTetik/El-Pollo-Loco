/**
 * Represents the clouds in the background of the game.
 * Inherits from {@link MovableObject} and moves slowly to the left.
 */
class Clouds extends MovableObject {
  y = 10;
  width = 800;
  height = 300;

  IMAGES_WALKING = [
    'img/5_background/layers/4_clouds/full.png',
    'img/5_background/layers/4_clouds/full.png',
    'img/5_background/layers/4_clouds/full.png',
  ];

  /**
   * Creates a new instance of Clouds.
   * Loads the required image resources, sets the starting position and speed,
   * and starts the animation.
   */
  constructor() {
    super();
    this.loadImage('img/5_background/layers/4_clouds/full.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 100 + Math.random() * 6500;
    this.speed = 0.15 + Math.random() * 0.55;
    this.animate();
  }

  /**
   * Starts the animation of the clouds.
   * Continuously moves the clouds to the left and plays the associated animation.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 4000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
