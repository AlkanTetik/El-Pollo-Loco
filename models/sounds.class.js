/**
 * Manages sound effects in the game.
 */
class SoundManager {
    /**
     * Creates a new instance of the SoundManager.
     */
    constructor() {
        this.sounds = {};
        this.activeSounds = [];
        this.soundEnabled = true;
    }

    /**
     * Loads a sound and stores it under the specified key.
     * @param {string} key - The key under which the sound is stored.
     * @param {string} src - The path to the audio file.
     */
    loadSound(key, src) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        this.sounds[key] = audio;
    }

    /**
     * Plays the sound stored under the specified key.
     * If the sound is disabled, nothing will play.
     * @param {string} key - The key of the sound to play.
     */
    play(key) {
        if (!this.soundEnabled) return;
        if (this.sounds[key]) {
            const soundClone = this.sounds[key].cloneNode();
            this.activeSounds.push(soundClone);
            soundClone.play();
            soundClone.addEventListener('ended', () => {
                this.activeSounds = this.activeSounds.filter(s => s !== soundClone);
            });
        }
    }

    /**
     * Pauses and stops all currently active sounds.
     */
    pauseAll() {
        this.activeSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
        this.activeSounds = [];
    }
}

const soundManager = new SoundManager();
soundManager.loadSound('gamesound', 'audio/gamesound (2).mp3');
soundManager.loadSound('hurt', 'audio/hurt1.mp3');
soundManager.loadSound('coin', 'audio/coinaudio.wav');
soundManager.loadSound('bottle', 'audio/bottleaudio2.mp3');
soundManager.loadSound('breakglass', 'audio/breakglass (2).wav');
soundManager.loadSound('walking', 'audio/foot-step-snow-12-189872.mp3');
soundManager.loadSound('victory', 'audio/victory.wav');
soundManager.loadSound('lose', 'audio/gameover.wav');
soundManager.loadSound('jump', 'audio/188543__deleted_user_3330286__breathjump00thm_adventure.mp3');
soundManager.loadSound('snoring', 'audio/ronquido-102469.mp3');
soundManager.loadSound('chickenHit', 'audio/chickenHit.mp3');
soundManager.loadSound('chickenHurt', 'audio/chickenhurt.mp3');
