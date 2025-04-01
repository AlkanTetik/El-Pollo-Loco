/**
 * Repräsentiert einen spielbaren Charakter.
 * @extends MovableObject
 */
class Character extends MovableObject {
    width = 150;
    height = 300;
    y = 40;
    speed = 10;
    lastActionTime = Date.now();

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    world;

    /**
     * Erstellt eine neue Instanz des Characters.
     * @param {Object} world - Die Spielwelt, in der der Charakter existiert.
     */
    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /**
     * Startet die Hauptanimationsschleife für den Charakter.
     */
    animate() {
        setInterval(() => {
            if (this.world.gameOver) return;
            this.keyRight();
            this.keyLeft();
            this.keyJump();
            this.keyThrow();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.animationInterval();
    }

   movementDisabled = false;
    /**
     * Führt periodisch Animationen basierend auf dem Zustand des Charakters aus.
     */
    animationInterval() {
        setInterval(() => {
            if (this.world.gameOver) return;
            
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                // Animation für Schaden abspielen
                this.playAnimation(this.IMAGES_HURT);
                // Bewegung für 1 Sekunde deaktivieren
                this.blockMovement(800);
            } else if (this.isAboveGround()) {
                this.animateJump();
            } else if (!this.movementDisabled && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.animateWalking();
            } else {
                this.animateIdle();
            }
        }, 150);
    }

    /**
 * Deaktiviert die Bewegung für die angegebene Dauer in Millisekunden.
 */
    blockMovement(duration) {
        this.movementDisabled = true;
        setTimeout(() => {
            this.movementDisabled = false;
        }, duration);
    }

    /**
     * Bewegt den Charakter nach rechts, falls die entsprechende Taste gedrückt wird.
     */
    keyRight() {
        if (this.movementDisabled) return;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastActionTime = Date.now();
        }
    }

    /**
     * Bewegt den Charakter nach links, falls die entsprechende Taste gedrückt wird.
     */
    keyLeft() {
        if (this.movementDisabled) return;
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastActionTime = Date.now();
        }
    }

    /**
     * Löst den Sprung des Charakters aus, wenn die Leertaste gedrückt wird.
     */
    keyJump() {
        if (this.movementDisabled) return;
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastActionTime = Date.now();
        }
    }

    /**
     * Registriert den Wurfvorgang, wenn die Taste 'D' gedrückt wird.
     */
    keyThrow() {
        if (this.movementDisabled) return;
        if (this.world.keyboard.D) {
            this.lastActionTime = Date.now();
        }
    }

    /**
     * Animiert den Leerlauf des Charakters.
     * Wechselt zur Long-Idle-Animation, wenn der Charakter längere Zeit inaktiv ist.
     */
    animateIdle() {
        const idleDuration = Date.now() - this.lastActionTime;
        if (idleDuration > 4000) {
            this.playAnimation(this.IMAGES_LONGIDLE);
            if (!this.lastWalkingSound || Date.now() - this.lastWalkingSound > 2000) {
                soundManager.play('snoring');
                this.lastWalkingSound = Date.now();
            }
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Animiert den Charakter beim Gehen.
     */
    animateWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        if (!this.lastWalkingSound || Date.now() - this.lastWalkingSound > 400) {
            soundManager.play('walking');
            this.lastWalkingSound = Date.now();
        }
    }

    /**
     * Animiert den Sprung des Charakters.
     */
    animateJump() {
        this.playAnimation(this.IMAGES_JUMPING);
        if (!this.lastWalkingSound || Date.now() - this.lastWalkingSound > 400) {
            soundManager.play('jump');
            this.lastWalkingSound = Date.now();
        }
    }
}
