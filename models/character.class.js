/**
 * Represents a playable character.
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
     * Creates a new instance of Character.
     * @param {Object} world - The game world in which the character exists.
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
     * Starts the main animation loop for the character.
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
     * Periodically performs animations based on the character's state.
     */
    animationInterval() {
        setInterval(() => {
            if (this.world.gameOver) return;
            
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                // Play hurt animation
                this.playAnimation(this.IMAGES_HURT);
                // Disable movement for 0.8 seconds
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
     * Disables movement for the specified duration in milliseconds.
     */
    blockMovement(duration) {
        this.movementDisabled = true;
        setTimeout(() => {
            this.movementDisabled = false;
        }, duration);
    }

    /**
     * Moves the character to the right if the corresponding key is pressed.
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
     * Moves the character to the left if the corresponding key is pressed.
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
     * Triggers the character's jump when the space key is pressed.
     */
    keyJump() {
        if (this.movementDisabled) return;
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.lastActionTime = Date.now();
        }
    }

    /**
     * Registers the throw action when the 'D' key is pressed.
     */
    keyThrow() {
        if (this.movementDisabled) return;
        if (this.world.keyboard.D) {
            this.lastActionTime = Date.now();
        }
    }

    /**
     * Animates the character's idle state.
     * Switches to the long idle animation if the character has been inactive for an extended period.
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
     * Animates the character while walking.
     */
    animateWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        if (!this.lastWalkingSound || Date.now() - this.lastWalkingSound > 400) {
            soundManager.play('walking');
            this.lastWalkingSound = Date.now();
        }
    }

    /**
     * Animates the character's jump.
     */
    animateJump() {
        this.playAnimation(this.IMAGES_JUMPING);
        if (!this.lastWalkingSound || Date.now() - this.lastWalkingSound > 400) {
            soundManager.play('jump');
            this.lastWalkingSound = Date.now();
        }
    }
}
