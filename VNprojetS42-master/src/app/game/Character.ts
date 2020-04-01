export default class Character {

    isVisible;
    scene;
    sprite
    constructor(scene,name, x, y,visible = false) {
        this.scene = scene;
        this.sprite = this.sprite = scene.add.sprite(x, y, name);
        console.log(this.sprite);
        this.sprite.visible = visible;
        this.sprite.setOrigin(0);
        this.sprite.setDepth(50);
        this.sprite.scale = 0.8;
        this.isVisible = true;
    }

    mooveTo(x) {
        this.scene.tweens.add({
            targets: this.sprite,
            x: x,
            duration: 1000,
            ease: 'Power2'
        }, this);
    }

    changeTo(name) {
        this.sprite.setTexture(name);
    }

    changeVisible() {
        this.sprite.visible = !this.sprite.visible;
    }
}
