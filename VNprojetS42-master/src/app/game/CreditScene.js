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
var CreditScene = /** @class */ (function (_super) {
    __extends(CreditScene, _super);
    function CreditScene() {
        var _this = _super.call(this, 'credit') || this;
        _this.devList = ["jason", "matthias", "naim", "alex", "thomas"];
        return _this;
    }
    CreditScene.prototype.preload = function () {
        var _this = this;
        this.load.image('credit', '../assets/images/credit.png');
        this.devList.forEach(function (personne) {
            _this.load.spritesheet(personne, "../../assets/spritesheets/test/".concat(personne).concat("-idle.png"), {
                frameWidth: 256,
                frameHeight: 256,
                margin: 0,
            });
            _this.load.spritesheet(personne.concat("-A"), "../../assets/spritesheets/test/".concat(personne).concat("-attack.png"), {
                frameWidth: 256,
                frameHeight: 256,
                margin: 0,
            });
            _this.load.image('retour', '../assets/images/retourbutton.png');
            _this.load.image('retour-hover', '../assets/images/retourbuttonhover.png');
        });
    };
    CreditScene.prototype.create = function () {
        var _this = this;
        this.add.image(0, 0, 'credit').setOrigin(0).setDepth(0);
        this.retourbutton = this.add.image(75, 40, "retour").setDepth(1);
        this.retourbutton.setScale(0.5, 0.5);
        this.jason = this.add.sprite(90, this.game.config.height - 140, "jason");
        this.jasonText = this.add.text(35, this.game.config.height - 230, "Jason Guestin", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.jason.setScale(1);
        this.thomas = this.add.sprite(245, this.game.config.height - 140, "thomas");
        this.thomasText = this.add.text(165, this.game.config.height - 230, "Thomas Derisbourg", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.thomas.setScale(1);
        this.alex = this.add.sprite(395, this.game.config.height - 140, "alex");
        this.alexText = this.add.text(320, this.game.config.height - 230, "Alexandre Ratajczak", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.alex.setScale(1);
        this.naim = this.add.sprite(545, this.game.config.height - 140, "naim");
        this.naimText = this.add.text(485, this.game.config.height - 230, "Naim Es-sebbani", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.naim.setScale(1);
        this.matthias = this.add.sprite(695, this.game.config.height - 140, "matthias");
        this.matthiasText = this.add.text(630, this.game.config.height - 230, "Matthias Fontaine", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.matthias.setScale(1);
        this.devList.forEach(function (personne) {
            _this.anims.create({
                key: personne.concat("-idle"),
                frames: _this.anims.generateFrameNumbers(personne, { start: 0, end: 11 }),
                frameRate: 10,
                repeat: -1
            });
            _this.anims.create({
                key: personne.concat("-attack"),
                frames: _this.anims.generateFrameNumbers(personne.concat("-A"), { start: 0, end: 23 }),
                frameRate: 10,
                repeat: 0
            });
        });
        this.setAllInteractive();
        this.jason.play("jason-idle");
        this.jason.on('pointerover', function (pointer) {
            _this.jasonText.setStyle({ fill: "#edc400" });
        });
        this.matthias.play("matthias-idle");
        this.matthias.on('pointerover', function (pointer) {
            _this.matthiasText.setStyle({ fill: "#ba0ade" });
        });
        this.naim.play("naim-idle");
        this.naim.on('pointerover', function (pointer) {
            _this.naimText.setStyle({ fill: "#e80027" });
        });
        this.alex.play("alex-idle");
        this.alex.on('pointerover', function (pointer) {
            _this.alexText.setStyle({ fill: "#00ea0a" });
        });
        this.thomas.play("thomas-idle");
        this.thomas.on('pointerover', function (pointer) {
            _this.thomasText.setStyle({ fill: "#0aa9de" });
        });
        this.jason.on('pointerout', function (pointer) {
            _this.jasonText.setStyle({ fill: "#ffffff" });
        });
        this.matthias.on('pointerout', function (pointer) {
            _this.matthiasText.setStyle({ fill: "#ffffff" });
        });
        this.alex.on('pointerout', function (pointer) {
            _this.alexText.setStyle({ fill: "#ffffff" });
        });
        this.thomas.on('pointerout', function (pointer) {
            _this.thomasText.setStyle({ fill: "#ffffff" });
        });
        this.naim.on('pointerout', function (pointer) {
            _this.naimText.setStyle({ fill: "#ffffff" });
        });
        this.retourbutton.on('pointerover', function (pointer) {
            _this.retourbutton.setTexture("retour-hover");
        });
        this.retourbutton.on('pointerout', function (pointer) {
            _this.retourbutton.setTexture("retour");
        });
        this.retourbutton.on('pointerup', function (pointer) {
            _this.scene.start('menu');
        });
    };
    CreditScene.prototype.update = function () {
    };
    CreditScene.prototype.setAllInteractive = function () {
        this.jason.setInteractive();
        this.matthias.setInteractive();
        this.naim.setInteractive();
        this.alex.setInteractive();
        this.thomas.setInteractive();
        this.retourbutton.setInteractive({ useHandCursor: true });
    };
    return CreditScene;
}(Phaser.Scene));
exports.default = CreditScene;
//# sourceMappingURL=CreditScene.js.map