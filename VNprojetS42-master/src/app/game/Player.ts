import { Data } from "phaser";

export default class Player {
    scene;
    public sprite;
    keys;
    lookR;
    nbCoin;
    public nbTile;
    lastTimeTextAdd = 0;
    constructor(scene, x, y) {
        this.scene = scene;
        this.lookR = true;
        this.nbTile = 10;
        const anims = scene.anims;
        anims.create({
            key: "player-idle",
            frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        anims.create({
            key: "player-run",
            frames: anims.generateFrameNumbers("player", { start: 4, end: 11 }),
            frameRate: 12,
            repeat: -1
        });

        // Create the physics-based sprite that we will move around and animate
        this.sprite = scene.physics.add.sprite(x, y, "player", 0);
        this.sprite.setScale(0.1);
        // Track the arrow keys & WASD
        const { LEFT, RIGHT, UP, W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            w: W,
            a: A,
            d: D
        });
        this.scene.cameras.main.zoomTo(1.2, 2000);
    }

    update() {
        this.moove();
        if (this.sprite.body.position.y > 900)
            this.loose();
    }

    destroy() {
        this.sprite.destroy();
    }
    flip() {
        this.lookR = !this.lookR,
            this.sprite.setFlipX(this.lookR);
    }
    moove() {
        const onGround = this.sprite.body.blocked.down;
        const acceleration = onGround ? 350 : 250;
        if (this.keys.left.isDown) {
            this.sprite.body.velocity.x = -acceleration;
            if (!this.lookR)
                this.flip();
        }
        else if (this.keys.right.isDown) {
            this.sprite.body.velocity.x = acceleration;
            if (this.lookR)
                this.flip();
        }
        else
            this.sprite.body.velocity.x = 0;

        if (onGround && (this.keys.up.isDown || this.keys.w.isDown)) {
            while (this.sprite.body.velocity.y > -400)
                this.sprite.body.velocity.y -= 20;
        }
        this.animeGestion();
    }
    win() {
        if (this.nbCoin ==3) {
            this.scene.start('Level5');
        }
        else {
                let t =this.scene.scene.add
                    .text(16, 100, "COLLECTE 3 BLOCS", {
                        font: "16px monospace",
                        fill: "##DC143C",
                        padding: { x: this.portalPos[0]-80, y: this.portalPos[1]-100 },
                    });
                this.tweens.add({
                    targets: t,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2'
                }, this);
            }
        }
    loose() {
        this.scene.scene.restart();
    }
    animeGestion() {
        let speed = [this.sprite.body.velocity.x, this.sprite.body.velocity.y]
        if (speed[1] > 0) {
            this.sprite.anims.stop();
            this.sprite.setTexture("player", 12);
        }
        else if (speed[1] < 0) {
            this.sprite.anims.stop();
            this.sprite.setTexture("player", 7);
        }
        else if (speed[0] != 0)
            this.sprite.anims.play("player-run", true)
        else
            this.sprite.anims.play("player-idle", true);
    }
    public addCoin(player, coin) {
        coin.disableBody(true, true);
        this.nbCoin++;
        console.log(this.nbCoin);
    }
}
