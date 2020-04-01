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
var Player_1 = require("./Player");
var MouseTileMarker_1 = require("./MouseTileMarker");
var PlatformerScene = /** @class */ (function (_super) {
    __extends(PlatformerScene, _super);
    function PlatformerScene() {
        var _this = _super.call(this, 'Level3') || this;
        _this.coinMap = [[450, 155], [920, 300], [650, 555], [920, 45]];
        _this.portalPos = [1125, 230];
        _this.ennemyPos = [[100, 800]];
        _this.horsePos = [[430, 140, 650], [430, 540, 650]];
        _this.bonusBlockPos = [[910, 425]];
        _this.lastDemenceUp = 0;
        return _this;
    }
    PlatformerScene.prototype.preload = function () {
        this.load.spritesheet("player", "../../assets/spritesheets/furry_jump.png", {
            frameWidth: 256,
            frameHeight: 256,
            margin: 0,
        });
        this.load.image("tiles3", "../assets/tilesets/tileset.png");
        this.load.image("coin", "../../assets/coin.png");
        this.load.spritesheet("portal", "../../assets/portail.png", {
            frameWidth: 128,
            frameHeight: 130,
            margin: 0,
        });
        this.load.image('background3', '../../assets/images/bg-1.png');
        this.load.image('middleground3', '../../assets/images/bg-2.png');
        this.load.image('frontground3', '../../assets/images/bg-3.png');
        this.load.tilemapTiledJSON("map3", "../../assets/tilemaps/level-trois.json");
        this.load.image("block", "../../assets/quartz.png");
        this.load.image("demence", "../../assets/demence.png");
        this.load.spritesheet("fireSkull", "../../assets/spritesheets/fire-skull.png", {
            frameWidth: 96,
            frameHeight: 112,
            margin: 0,
        });
        this.load.spritesheet("horse", "../../assets/spritesheets/horse.png", {
            frameWidth: 144,
            frameHeight: 96,
            margin: 0,
        });
        this.load.audio('jumpS', [
            '../../assets/audio/jump.ogg',
            '../../assets/audio/jump.mp3'
        ]);
        this.load.audio('coinS', [
            '../../assets/audio/coin.ogg',
            '../../assets/audio/coin.mp3'
        ]);
        this.load.audio('deathS', [
            '../../assets/audio/die.ogg',
            '../../assets/audio/die.mp3'
        ]);
        this.load.audio('popS', [
            '../../assets/audio/pop.ogg',
            '../../assets/audio/pop.mp3'
        ]);
    };
    PlatformerScene.prototype.create = function () {
        var _this = this;
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background3');
        this.middleground = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'middleground3');
        this.middleground.setOrigin(0, 0);
        this.middleground.setScrollFactor(0);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);
        this.frontground = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'frontground3');
        this.frontground.setOrigin(0, 0);
        this.frontground.setScrollFactor(0);
        var map = this.make.tilemap({ key: "map3" });
        var tiles = map.addTilesetImage("tileset", "tiles3");
        map.createDynamicLayer("Background", tiles);
        this.groundLayer = map.createDynamicLayer("Ground", tiles);
        var spawnPoint = map.findObject("Objects", function (obj) { return obj.name === "Spawn Point"; });
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y, 1);
        this.coinGroup = this.physics.add.staticGroup();
        this.coinMap.forEach(function (element) {
            var tmp = _this.coinGroup.create(element[0], element[1], "coin");
            tmp.setSize(25, 25);
            tmp.scale = 0.05;
        });
        this.bonusBlockGroup = this.physics.add.staticGroup();
        this.bonusBlockPos.forEach(function (element) {
            var tmp = _this.bonusBlockGroup.create(element[0], element[1], "block");
            tmp.setSize(25, 25);
            tmp.scale = 0.08;
        });
        this.horseGroup = this.physics.add.staticGroup();
        this.horsePos.forEach(function (element) {
            var tmp = _this.horseGroup.create(element[0], element[1], "horse");
            tmp.setSize(75, 60);
            tmp.scaleX = 0.7;
            tmp.scaleY = 0.7;
        });
        this.ennemyGroup = this.physics.add.staticGroup();
        this.ennemyPos.forEach(function (element) {
            var tmp = _this.ennemyGroup.create(element[0], element[1], "fireSkull");
            tmp.allowGravity = false;
            tmp.flipX = true;
            tmp.originX = 0.5;
            tmp.setScale(0.5);
            tmp.setSize(50, 50);
            tmp.x -= 20;
            tmp.y -= 30;
            console.log(tmp);
        });
        this.ennemyGroup.getChildren().forEach(function (enemy) {
            var anims = this.anims;
            anims.create({
                key: "ennemy-run",
                frames: anims.generateFrameNumbers("fireSkull", { start: 0, end: 7 }),
                frameRate: 12,
                repeat: -1
            });
            enemy.anims.play("ennemy-run", true);
        }, this);
        ;
        this.horseGroup.getChildren().forEach(function (enemy) {
            var anims = this.anims;
            anims.create({
                key: "horse-run",
                frames: anims.generateFrameNumbers("horse", { start: 0, end: 3 }),
                frameRate: 15,
                repeat: -1
            });
            enemy.anims.play("horse-run", true);
        }, this);
        ;
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.marker = new MouseTileMarker_1.default(this, map);
        var anims = this.anims;
        this.portal = this.physics.add.sprite(this.portalPos[0], this.portalPos[1], "portal");
        anims.create({
            key: "walk",
            frames: anims.generateFrameNumbers("portal", { start: 10, end: 30 }),
            frameRate: 12,
            repeat: -1
        });
        this.portal.anims.load('walk');
        this.portal.anims.play("walk", true);
        this.portal.body.allowGravity = false;
        this.portal.setSize(80, 90);
        this.imageCoin = this.add.image(100, 100, "coin");
        this.imageCoin.scale = 0.05;
        this.imageCoin.setScrollFactor(0);
        this.textCoin = this.add.text(130, 90, "0/" + this.coinMap.length, {
            font: "24px monospace",
            fill: "#ffffff",
        }).setScrollFactor(0);
        this.imageBlock = this.add.image(this.game.config.width - 100, 100, "block").setScrollFactor(0);
        this.imageBlock.scale = 0.1;
        this.textBlock = this.add.text(this.game.config.width - 150, 90, this.player.nbTile, {
            font: "24px monospace",
            fill: "#ffffff",
        }).setScrollFactor(0);
        this.demence = this.add.sprite(220, 100, 'demence');
        this.demence.setScrollFactor(0);
        this.demence.scaleX = 0.0;
        this.demence.scaleY = 0.02;
        this.demence.setOrigin(0, 0.5);
        this.jumpSoung = this.sound.add('jumpS');
        this.coinSoung = this.sound.add('coinS');
        this.deathSoung = this.sound.add('deathS');
        this.popSoung = this.sound.add('popS');
        this.coinSoung.volume = 10;
    };
    PlatformerScene.prototype.update = function (time, delta) {
        if (this.lastDemenceUp + 1000 < Date.now()) {
            if (this.demence.scaleX < 0.5) {
                this.demence.scaleX += 0.01;
                this.lastDemenceUp = Date.now();
            }
            else
                this.player.loose2();
        }
        this.frontground.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.middleground.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.background.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.marker.update();
        this.player.update();
        this.draw();
        this.physics.world.overlap(this.player.sprite, this.coinGroup, this.player.addCoin, null, this);
        this.physics.world.overlap(this.player.sprite, this.portal, this.player.win, null, this);
        this.physics.world.overlap(this.player.sprite, this.ennemyGroup, this.player.loose, null, this);
        this.physics.world.overlap(this.player.sprite, this.horseGroup, this.player.loose, null, this);
        this.physics.world.overlap(this.player.sprite, this.bonusBlockGroup, this.player.bonusBlock, null, this);
        this.ennemyGroup.getChildren().forEach(function (enemy) {
            var playerAtTheRight = enemy.body.x < this.player.sprite.x;
            if ((!this.player.lookR && playerAtTheRight) || (this.player.lookR && !playerAtTheRight)) {
                var speedX = playerAtTheRight ? 1.2 : -1.2;
                var speedY = enemy.body.y > this.player.sprite.y ? -1.2 : 1.2;
                enemy.body.x += speedX;
                enemy.x += speedX;
                enemy.body.y += speedY;
                enemy.y += speedY;
                enemy.flipX = playerAtTheRight;
            }
            else
                enemy.flipX = !playerAtTheRight;
        }, this);
        var cpt = 0;
        this.horseGroup.getChildren().forEach(function (horse) {
            if (horse.x <= this.horsePos[cpt][0] || horse.x >= this.horsePos[cpt][2])
                horse.flipX = !horse.flipX;
            var speedX = horse.flipX ? 1.2 : -1.2;
            horse.x += speedX;
            horse.body.x += speedX;
            cpt++;
        }, this);
    };
    PlatformerScene.prototype.draw = function () {
        var pointer = this.input.activePointer;
        var worldPoint = pointer.positionToCamera(this.cameras.main);
        if (pointer.isDown && this.player.nbTile > 0 && this.marker.canDraw) {
            this.popSoung.play();
            this.marker.canDraw = false;
            this.player.nbTile--;
            this.textBlock.setText(this.player.nbTile);
            var tile = this.groundLayer.putTileAtWorldXY(109, worldPoint.x, worldPoint.y);
            tile.setCollision(true);
        }
        else if (!pointer.isDown)
            this.marker.canDraw = true;
    };
    return PlatformerScene;
}(Phaser.Scene));
exports.default = PlatformerScene;
//# sourceMappingURL=Level3.js.map