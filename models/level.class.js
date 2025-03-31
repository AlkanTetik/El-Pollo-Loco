/**
 * Repräsentiert ein Level im Spiel.
 */
class Level {
    enemies;
    clouds;
    coins;
    salsabottle;
    backgroundObjects;
    level_end_x = 7500;

    /**
     * Erstellt ein neues Level mit den angegebenen Elementen.
     * @param {Array} enemies - Liste der Gegner.
     * @param {Array} clouds - Liste der Wolken.
     * @param {Array} coins - Liste der Münzen.
     * @param {Array} salsabottle - Liste der Salsa-Flaschen.
     * @param {Array} backgroundObjects - Liste der Hintergrundobjekte.
     */
    constructor(enemies, clouds, coins, salsabottle, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.salsabottle = salsabottle;
        this.backgroundObjects = backgroundObjects;
    }
}