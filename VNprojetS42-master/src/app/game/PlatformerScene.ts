import Player from './Player';
import MouseTileMarker from './MouseTileMarker';
import { debug } from 'util';

export default class PlatformerScene extends Phaser.Scene {
    groundLayer;
    public player;
    coinGroup;
    marker;
    coinMap;
    portalPos;
    portal;
    background;
    nbCoin;
    middleground;
    constructor() {
        super('Level1');
        this.coinMap = [[80, 410], [955, 100], [700, 410]];
        this.portalPos = [1100, 260];
        this.nbCoin=0;
    }
    preload() {
        this.load.spritesheet(
            "player",
            "../../assets/spritesheets/furry_jump.png",
            {
                frameWidth: 256,
                frameHeight: 256,
                margin: 0,
            }
        );
        this.load.image("spike", "../assets/images/0x72-industrial-spike.png");
        this.load.image("tiles", "../assets/tilesets/tilesets.png");
        this.load.image("coin", "../../assets/coin.png");

        this.load.spritesheet(
            "portal",
            "../../assets/portail.png",
            {
                frameWidth: 128,
                frameHeight: 130,
                margin: 0,
            }
        );

        this.load.image('background', '../../assets/images/background.png');
        this.load.image('middleground', '../../assets/images/middleground.png');

        this.load.tilemapTiledJSON("map", "../../assets/tilemaps/platformer-deux.json");
    }

    create() {

        this.background = this.add.tileSprite(0, 0, this.game.config.width as number, this.game.config.height as number, 'background');
        this.middleground = this.add.tileSprite(0, 0, this.game.config.width as number, this.game.config.height as number, 'middleground');
        this.middleground.setOrigin(0, 0);
        this.middleground.setScrollFactor(0);
        this.background.setOrigin(0, 0);
        this.background.setScrollFactor(0);


        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("tileset", "tiles");

        map.createDynamicLayer("Background", tiles);
        this.groundLayer = map.createDynamicLayer("Ground", tiles);
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point") as any
        this.player = new Player(this, spawnPoint.x, spawnPoint.y);

        this.coinGroup = this.physics.add.staticGroup();
        this.coinMap.forEach((element) => {
            let tmp = this.coinGroup.create(element[0], element[1], "coin");
            tmp.setSize(0.05, 0.05);
            tmp.scale = 0.05;
        }
        );


        this.groundLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);

        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.marker = new MouseTileMarker(this, map);

        

        let config = {
            key: 'walk',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 25 }),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        };

        let anim = this.anims.create(config);
        this.portal = this.physics.add.sprite(this.portalPos[0], this.portalPos[1], "portal");
        this.portal.anims.load('walk');
        this.portal.anims.play('walk');
        this.portal.body.allowGravity = false;
        this.portal.setSize(80, 90);

        this.add
            .text(16, 100, "Utilise les flèches pour te déplacer \n Pour poser des blocs, utilise le clic gauche", {
                font: "16px monospace",
                fill: "#ffffff",
                padding: { x: 20, y: 10 },
            });
    }

    update(time, delta) {

        
        this.middleground.tilePositionX = this.cameras.main.scrollX * 0.2;
        this.background.tilePositionX = this.cameras.main.scrollX * 0.1;

        this.marker.update();
        this.player.update();

        this.draw();

        this.physics.world.overlap(this.player.sprite, this.coinGroup, this.player.addCoin, null, this);

        this.physics.world.overlap(this.player.sprite, this.portal, this.player.win, null, this);
    }

    draw() {
        const pointer = this.input.activePointer;
        const worldPoint = pointer.positionToCamera(this.cameras.main) as any;
        if (pointer.isDown && this.player.nbTile > 0 && this.marker.canDraw) {
            this.marker.canDraw = false;
            this.player.nbTile--;
            const tile = this.groundLayer.putTileAtWorldXY(166, worldPoint.x, worldPoint.y);
            tile.setCollision(true);
        }
        else if (!pointer.isDown)
            this.marker.canDraw = true;
    }

}
