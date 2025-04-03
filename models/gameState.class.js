/**
 * Manages the game state and displays corresponding overlays when the player wins or loses.
 */
class GameStateManager {
    constructor(world) {
        this.world = world;
        this.overlayWin = document.getElementById('overlayWin');
        this.restartWinBtn = document.getElementById('restartWinBtn');
        this.backToMenuBtn = document.getElementById('backWinMenu');
        this.overlayLose = document.getElementById('overlayLose');
        this.restartLoseBtn = document.getElementById('restartLoseBtn');
        this.backToLoseMenu = document.getElementById('backLoseMenu');
    }

    /**
     * Checks if the player has lost.
     * If the player's energy is 0 and the game is not already over,
     * it sets the game over state, shows the defeat overlay, plays sound effects,
     * stops the game, and resets the keyboard.
     */
    checkLose() {
        if (this.world.character.energy === 0 && !this.world.gameOver) {
            this.world.gameOver = true;
            this.showLose();
            if (this.world.soundManager.pauseAll()) {
                this.world.soundManager.stop('lose');
            } else {
                this.world.soundManager.play('lose');
            }
            this.world.stop();
            this.world.keyboard = new Keyboard();
        }
    }

    /**
     * Displays the "Lost" overlay.
     * Sets the appropriate styles for the defeat overlay and adds event listeners
     * to the restart and back-to-menu buttons.
     */
    showLose() {
        this.overlayLose.style.display = "flex";
        this.restartLoseBtn.style.display = "block";
        this.backToLoseMenu.style.display = "block";
        this.restartLoseBtn.addEventListener('click', () => {
            restartGame();
        }, { once: true });
        this.backToLoseMenu.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });
    }

    /**
     * Checks if the player has won.
     * Iterates over all enemies and if an EndBoss is found to be dead,
     * it sets the game over state, stops the game, shows the victory overlay,
     * and resets the keyboard.
     */
    checkWin() {
        if (this.world.gameOver) return;
        this.world.level.enemies.forEach(enemy => {
            if (enemy instanceof EndBoss && enemy.isDead()) {
                this.world.gameOver = true;
                this.world.stop();
                this.showVictory();
                this.world.keyboard = new Keyboard();
            }
        });
    }

    /**
     * Displays the "Victory" overlay.
     * Sets the appropriate styles for the victory overlay and adds event listeners
     * to the restart and back-to-menu buttons.
     */
    showVictory() {
        this.overlayWin.style.display = "flex";
        this.restartWinBtn.style.display = "block";
        this.backToMenuBtn.style.display = "block";
        this.restartWinBtn.addEventListener('click', () => {
            restartGame();
        }, { once: true });
        this.backToMenuBtn.addEventListener('click', () => {
            window.location.reload();
        }, { once: true });
    }
}