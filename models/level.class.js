class Level {
    enemies;
    clouds;
    coins;
    salsabottle;
    backgroundObjects;
    level_end_x = 7500;

    constructor(enemies, clouds, coins, salsabottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.salsabottle = salsabottle;
        this.backgroundObjects = backgroundObjects;
    }
}