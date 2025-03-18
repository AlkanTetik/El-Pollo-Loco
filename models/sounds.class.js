class SoundManager {
    constructor() {
        this.sounds = {};
    }

    // Lädt den Sound und speichert ihn unter dem Schlüssel "key"
    loadSound(key, src) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        this.sounds[key] = audio;
    }

    // Spielt den Sound ab, indem eine Kopie des vorab geladenen Audio-Objekts verwendet wird.
    play(key) {
        if (this.sounds[key]) {
            const soundClone = this.sounds[key].cloneNode();
            soundClone.play();
        }
    }
}

// Beispiel: Initialisierung und Laden der Sounds
const soundManager = new SoundManager();
soundManager.loadSound('gamesound', 'audio/gamesound (2).mp3');
soundManager.loadSound('hurt', 'audio/hurt1.mp3');
soundManager.loadSound('coin', 'audio/coinaudio.wav');
soundManager.loadSound('bottle', 'audio/bottleaudio2.mp3');
soundManager.loadSound('breakglass', 'audio/breakglass (2).wav');
soundManager.loadSound('walking', 'audio/foot-step-snow-12-189872.mp3');
soundManager.loadSound('victory', 'audio/victory.wav');
soundManager.loadSound('lose', 'audio/gameover.wav');

