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
var Level2 = /** @class */ (function (_super) {
    __extends(Level2, _super);
    function Level2() {
        var _this = _super.call(this, 'Level5') || this;
        _this.coinMap = [[65, 35], [900, 500], [700, 40]];
        _this.portalPos = [1050, 200];
        _this.nbCoin = 0;
        return _this;
    }
    Level2.prototype.preload = function () {
        this.load.spritesheet("player", "../../assets/spritesheets/furry_jump.png", {
            frameWidth: 256,
            frameHeight: 256,
            margin: 0,
        });
        this.load.image("spike", "../assets/images/0x72-industrial-spike.png");
        this.load.image("tiles2", "../assets/tilesets/tileset2.png");
        this.load.image("coin", "../../assets/coin.png");
        this.load.spritesheet("portal", "../../assets/portail.png", {
            frameWidth: 128,
            frameHeight: 130,
            margin: 0,
        });
        this.load.image('background', '../../assets/images/background.png');
        this.load.image('middleground', '../../assets/images/middleground.png');
        this.load.tilemapTiledJSON("map2", "../../assets/tilemaps/level-deux.json");
    };
    Level2.prototype.create = function () {
        var _this = this;
        console.log(this.scene);
        this.add
            .text(16, 100, "Utilise les flèches pour te déplacer \n Pour poser des blocs, utilise le clic gauche", {
            font: "16px monospace",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
        });
        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'background');
        this.middleground = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'middleground');
        this.middleground.setOrigin(0, 0);
        this.middleground.setScrollFactor(0);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);
        var map = this.make.tilemap({ key: "map2" });
        var tiles = map.addTilesetImage("tileset", "tiles2");
        map.createDynamicLayer("Background", tiles);
        map.createDynamicLayer("Foreground", tiles);
        this.groundLayer = map.createDynamicLayer("Ground", tiles);
        var spawnPoint = map.findObject("Objects", function (obj) { return obj.name === "Spawn Point"; });
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
        this.coinGroup = this.physics.add.staticGroup();
        this.coinMap.forEach(function (element) {
            var tmp = _this.coinGroup.create(element[0], element[1], "coin");
            tmp.setSize(0.05, 0.05);
            tmp.scale = 0.05;
        });
        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.marker = new MouseTileMarker_1.default(this, map);
        var config = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 25 }),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        };
        var anim = this.anims.create(config);
        this.portal = this.physics.add.sprite(this.portalPos[0], this.portalPos[1], "portal");
        this.portal.anims.load('walk');
        this.portal.anims.play('walk');
        this.portal.body.allowGravity = false;
        this.portal.setSize(80, 90);
        console.log(this.portal);
    };
    Level2.prototype.update = function (time, delta) {
        this.middleground.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.background.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.marker.update();
        this.player.update();
        this.draw();
        this.physics.world.overlap(this.player.sprite, this.coinGroup, this.player.addCoin, null, this);
        this.physics.world.overlap(this.player.sprite, this.portal, this.player.win, null, this);
    };
    Level2.prototype.draw = function () {
        var pointer = this.input.activePointer;
        var worldPoint = pointer.positionToCamera(this.cameras.main);
        if (pointer.isDown && this.player.nbTile > 0 && this.marker.canDraw) {
            this.marker.canDraw = false;
            this.player.nbTile--;
            var tile = this.groundLayer.putTileAtWorldXY(166, worldPoint.x, worldPoint.y);
            tile.setCollision(true);
        }
        else if (!pointer.isDown)
            this.marker.canDraw = true;
    };
    return Level2;
}(Phaser.Scene));
exports.default = Level2;
//# sourceMappingURL=Level2.js.map