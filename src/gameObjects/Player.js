export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "sonic");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(false);
        this.initAnimations();
    }

    initAnimations() {
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("sonic", { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "idle",
            frames: [ { key: "sonic", frame: 6 } ],
            frameRate: 1
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("sonic", { start: 7, end: 11 }),
            frameRate: 12,
            repeat: -1
        });
    }

    moveLeft() {
        this.setVelocityX(-200);
        this.setFlipX(true);
        if (this.body.blocked.down) {
            this.anims.play("walk", true);
        }
    }

    moveRight() {
        this.setVelocityX(200);
        this.setFlipX(false);
        if (this.body.blocked.down) {
            this.anims.play("walk", true);
        }
    }

    idle() {
        this.setVelocityX(0);
        if (this.body.blocked.down) {
            this.anims.play("idle", true);
        }
    }

    jump() {
        if (this.body.blocked.down) {
            this.setVelocityY(-500);
        }
        this.anims.play("jump", true);
    }
}