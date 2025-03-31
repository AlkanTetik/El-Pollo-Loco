/**
 * Repräsentiert die Wolken im Hintergrund des Spiels.
 * Erbt von {@link MovableObject} und bewegt sich langsam nach links.
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
   * Erstellt eine neue Instanz von Clouds.
   * Lädt die erforderlichen Bildressourcen, setzt die Startposition und Geschwindigkeit,
   * und startet die Animation.
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
   * Startet die Animation der Wolken.
   * Bewegt die Wolken kontinuierlich nach links und spielt die zugehörige Animation ab.
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
