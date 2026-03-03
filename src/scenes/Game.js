import { Player } from "../gameObjects/Player.js";

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // this.add.image(400, 300, "sky");
        
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

        this.platforms.create(600, 400, "ground");
        this.platforms.create(50, 250, "ground");
        this.platforms.create(750, 220, "ground");

        this.player = new Player(this, 100, 450);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(-50, 0);
        this.player.setScale(1.25);

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.os = this.sys.game.device.os;

        if (this.os.android || this.os.iOS || this.os.iPad || this.os.iPhone || this.os.kindle) {
            this.jump = this.add.sprite(700, 500, "up").setScale(0.25).setScrollFactor(0).setInteractive();
            this.left = this.add.sprite(100, 500, "left").setScale(0.25).setScrollFactor(0).setInteractive();
            this.right = this.add.sprite(250, 500, "right").setScale(0.25).setScrollFactor(0).setInteractive();

            
        }
        this.player.anims.play("idle", true);
    }

    update() {
        if (this.os.android || this.os.iOS || this.os.iPad || this.os.iPhone || this.os.kindle) {
            this.jump.on("pointerdown", () => {
                this.player.jump();
            });
            this.jump.on("pointerup", () => {
                this.player.idle();
            });
            this.left.on("pointerdown", () => {
                this.player.moveLeft();
            });
            this.left.on("pointerup", () => {
                this.player.idle();
            });
            this.right.on("pointerdown", () => {
                this.player.moveRight();
            });
            this.right.on("pointerup", () => {
                this.player.idle();
            });
        } else {
            if (this.cursors.left.isDown) {
                this.player.moveLeft();
            } else if (this.cursors.right.isDown) {
                this.player.moveRight();
            } else {
                this.player.idle();
            }
            if (this.cursors.up.isDown || this.cursors.space.isDown) {
                this.player.jump();
            }
        }
    }
}
