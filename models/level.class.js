/**
 * Represents a level in the game.
 */
class Level {
    enemies;
    clouds;
    coins;
    salsabottle;
    backgroundObjects;
    level_end_x = 7500;

    /**
     * Creates a new level with the given elements.
     * @param {Array} enemies - List of enemies.
     * @param {Array} clouds - List of clouds.
     * @param {Array} coins - List of coins.
     * @param {Array} salsabottle - List of salsa bottles.
     * @param {Array} backgroundObjects - List of background objects.
     */
    constructor(enemies, clouds, coins, salsabottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.salsabottle = salsabottle;
        this.backgroundObjects = backgroundObjects;
    }
}