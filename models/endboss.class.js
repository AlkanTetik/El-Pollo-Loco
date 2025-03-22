class EndBoss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    health = 4; 
    dead = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(world, character) {
        super();
        this.world = world; // Referenz zur Welt setzen
        this.character = character; // Referenz zur Welt setzen
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3000;
        this.speed = 0.8 + Math.random() * 0.55;
        this.animate();
    }

    hit() {
        if (this.health > 0) {
            this.health--;
            soundManager.play('chickenHit');
            // Setze den Hurt-Status und starte einen Timer, der ihn nach 1 Sekunde zurücksetzt
            this.hurtAnimationRunning = true;
            setTimeout(() => {
                this.hurtAnimationRunning = false;
            }, 1000);
        }
    }
    

    isHurt() {
        return this.health > 0 && this.health < 4;
    }

    isDead() {
        if (this.health <= 0 && !this.dead) {
            this.dead = true;
            soundManager.play('victory');
        }
        return this.dead;
    }    

    animate() {
        let alertPlayed = false;
        let moveInterval;
        setInterval(() => {
            if (this.world && this.world.character) {
                if (this.world.character.x > 2500 && !alertPlayed) {
                    this.playAnimation(this.IMAGES_ALERT);
                    setTimeout(() => {
                        alertPlayed = true;
                        moveInterval = setInterval(() => {
                            this.moveLeft();
                        }, 100);
                    }, 900);
                } else if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.hurtAnimationRunning) {
                    // Hurt-Animation wird nur angezeigt, solange hurtAnimationRunning true ist (also 1 Sekunde)
                    this.playAnimation(this.IMAGES_HURT);
                } else if (alertPlayed) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 150);
    }    
}    