"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Character = /** @class */ (function () {
    function Character(scene, name, x, y, visible) {
        if (visible === void 0) { visible = false; }
        this.scene = scene;
        this.sprite = this.sprite = scene.add.sprite(x, y, name);
        console.log(this.sprite);
        this.sprite.visible = visible;
        this.sprite.setOrigin(0);
        this.sprite.setDepth(50);
        this.sprite.scale = 0.8;
        this.isVisible = true;
    }
    Character.prototype.mooveTo = function (x) {
        this.scene.tweens.add({
            targets: this.sprite,
            x: x,
            duration: 1000,
            ease: 'Power2'
        }, this);
    };
    Character.prototype.changeTo = function (name) {
        this.sprite.setTexture(name);
    };
    Character.prototype.changeVisible = function () {
        this.sprite.visible = !this.sprite.visible;
    };
    return Character;
}());
exports.default = Character;
//# sourceMappingURL=Character.js.map