class SoundManager {
    constructor() {
      this.sounds = {};
      this.activeSounds = [];
      this.soundEnabled = true; // Standard: Sound ist aktiviert
    }
  
    // Lädt den Sound und speichert ihn unter dem Schlüssel "key"
    loadSound(key, src) {
      const audio = new Audio(src);
      audio.preload = 'auto';
      this.sounds[key] = audio;
    }
  
    // Spielt den Sound ab, falls soundEnabled true ist
    play(key) {
      if (!this.soundEnabled) return; // Wenn Sound deaktiviert, nichts tun
      if (this.sounds[key]) {
        const soundClone = this.sounds[key].cloneNode();
        this.activeSounds.push(soundClone);
        soundClone.play();
        soundClone.addEventListener('ended', () => {
          this.activeSounds = this.activeSounds.filter(s => s !== soundClone);
        });
      }
    }

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
  