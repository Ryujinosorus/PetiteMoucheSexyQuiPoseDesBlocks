import PlatformerScene from './PlatformerScene';

export class MenuScene extends Phaser.Scene {
    playbutton;
    creditbutton;
    constructor() {
        super('menu');
    }
    preload() {
        this.load.image('screen', '../assets/images/menu.png');
        this.load.image('jouer', '../assets/images/jouerbutton.png');
        this.load.image('jouer-hover', '../assets/images/jouerbuttonhover.png');
        this.load.image('credits', '../assets/images/creditsbutton.png');
        this.load.image('credits-hover', '../assets/images/creditsbuttonhover.png');
    }
    create() {

        this.add.image(0, 0, 'screen').setOrigin(0).setDepth(0);
        this.playbutton = this.add.image((this.game.config.width as number) / 2, (this.game.config.height as number) / 2, "jouer").setDepth(1);
        this.creditbutton = this.add.image((this.game.config.width as number) / 2, (this.game.config.height as number) / 2 + (this.game.config.height as number) / 5, "credits").setDepth(1);
        this.playbutton.setScale(0.8, 0.8);
        this.creditbutton.setScale(0.8, 0.8);

        this.playbutton.setInteractive({ useHandCursor: true });

        this.playbutton.on('pointerover', (pointer) => {
            this.playbutton.setTexture("jouer-hover");
        });

        this.playbutton.on('pointerout', (pointer) => {
            this.playbutton.setTexture("jouer");
        });

        this.creditbutton.setInteractive({ useHandCursor: true });

        this.creditbutton.on('pointerover', (pointer) => {
            this.creditbutton.setTexture("credits-hover");
        });

        this.creditbutton.on('pointerout', (pointer) => {
            this.creditbutton.setTexture("credits");
        });

        this.playbutton.on('pointerup', (pointer) => {
            this.scene.start('VN01');
        }, this);

        this.creditbutton.on('pointerup', (pointer) => {
            this.scene.start('credit');
        }, this);

    }
    update() {

    }
}