"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        return _super.call(this, 'menu') || this;
    }
    MenuScene.prototype.preload = function () {
        this.load.image('screen', '../assets/images/menu.png');
        this.load.image('jouer', '../assets/images/jouerbutton.png');
        this.load.image('jouer-hover', '../assets/images/jouerbuttonhover.png');
        this.load.image('credits', '../assets/images/creditsbutton.png');
        this.load.image('credits-hover', '../assets/images/creditsbuttonhover.png');
    };
    MenuScene.prototype.create = function () {
        var _this = this;
        this.add.image(0, 0, 'screen').setOrigin(0).setDepth(0);
        this.playbutton = this.add.image(this.game.config.width / 2, this.game.config.height / 2, "jouer").setDepth(1);
        this.creditbutton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + this.game.config.height / 5, "credits").setDepth(1);
        this.playbutton.setScale(0.8, 0.8);
        this.creditbutton.setScale(0.8, 0.8);
        this.playbutton.setInteractive({ useHandCursor: true });
        this.playbutton.on('pointerover', function (pointer) {
            _this.playbutton.setTexture("jouer-hover");
        });
        this.playbutton.on('pointerout', function (pointer) {
            _this.playbutton.setTexture("jouer");
        });
        this.creditbutton.setInteractive({ useHandCursor: true });
        this.creditbutton.on('pointerover', function (pointer) {
            _this.creditbutton.setTexture("credits-hover");
        });
        this.creditbutton.on('pointerout', function (pointer) {
            _this.creditbutton.setTexture("credits");
        });
        this.playbutton.on('pointerup', function (pointer) {
            _this.scene.start('VN01');
        }, this);
        this.creditbutton.on('pointerup', function (pointer) {
            _this.scene.start('credit');
        }, this);
    };
    MenuScene.prototype.update = function () {
    };
    return MenuScene;
}(Phaser.Scene));
exports.MenuScene = MenuScene;
//# sourceMappingURL=MenuScene.js.map