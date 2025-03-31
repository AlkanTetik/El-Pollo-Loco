/**
 * Erstellt das erste Level des Spiels.
 *
 * Diese Funktion erstellt und gibt eine neue Instanz der Level-Klasse zurück, die Gegner,
 * Wolken, Münzen, Salsa-Flaschen und Hintergrundobjekte enthält. Dabei werden verschiedene
 * Instanzen wie Chicken, Chick, EndBoss, Clouds, Coin, SalsaBottle und BackgroundObject verwendet.
 *
 * @returns {Level} Die erstellte Level-Instanz für Level 1.
 */
function createLevel1() {
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new Chick(),
      new EndBoss(world),
    ],
    [
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
      new Clouds(),
    ],
    [
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
      new Coin(),
    ],
    [
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
    ],
    [
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
      
      new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 7),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 7),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 7),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 7),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 8),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 8),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 8),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 8),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 9),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 9),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 9),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 9),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 10),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 10),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 10),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 10),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 11),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 11),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 11),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 11),
    ]
  );
}
