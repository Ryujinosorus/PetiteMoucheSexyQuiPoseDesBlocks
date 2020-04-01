export default class CreditScene extends Phaser.Scene {
    jason;
    thomas;
    alex;
    matthias;
    devList;
    retourbutton;
    naim;
    jasonText;
    thomasText;
    alexText;
    matthiasText;
    naimText;
    constructor() {
        super('credit');
        this.devList = ["jason", "matthias", "naim", "alex", "thomas"];
    }
    preload() {
        this.load.image('credit', '../assets/images/credit.png');
        this.devList.forEach((personne) => {
            this.load.spritesheet(
                personne,
                "../../assets/spritesheets/test/".concat(personne).concat("-idle.png"),
                {
                    frameWidth: 256,
                    frameHeight: 256,
                    margin: 0,
                }
            );
            this.load.spritesheet(
                personne.concat("-A"),
                "../../assets/spritesheets/test/".concat(personne).concat("-attack.png"),
                {
                    frameWidth: 256,
                    frameHeight: 256,
                    margin: 0,
                }
            );
            this.load.image('retour', '../assets/images/retourbutton.png');
            this.load.image('retour-hover', '../assets/images/retourbuttonhover.png');
        });

    }

    create() {
        this.add.image(0, 0, 'credit').setOrigin(0).setDepth(0);
        this.retourbutton = this.add.image(75, 40, "retour").setDepth(1);
        this.retourbutton.setScale(0.5, 0.5);
        this.jason = this.add.sprite(90, this.game.config.height as number - 140, "jason");
        this.jasonText = this.add.text(35, this.game.config.height as number - 230, "Jason Guestin", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.jason.setScale(1);
        this.thomas = this.add.sprite(245, this.game.config.height as number - 140, "thomas");
        this.thomasText = this.add.text(165, this.game.config.height as number - 230, "Thomas Derisbourg", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.thomas.setScale(1);
        this.alex = this.add.sprite(395, this.game.config.height as number - 140, "alex");
        this.alexText = this.add.text(320, this.game.config.height as number - 230, "Alexandre Ratajczak", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.alex.setScale(1);
        this.naim = this.add.sprite(545, this.game.config.height as number - 140, "naim");
        this.naimText = this.add.text(485, this.game.config.height as number - 230, "Naim Es-sebbani", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.naim.setScale(1);
        this.matthias = this.add.sprite(695, this.game.config.height as number - 140, "matthias");
        this.matthiasText = this.add.text(630, this.game.config.height as number - 230, "Matthias Fontaine", {
            font: "14px monospace",
            fill: "#ffffff",
        });
        this.matthias.setScale(1);

        this.devList.forEach((personne) => {
            this.anims.create({
                key: personne.concat("-idle"),
                frames: this.anims.generateFrameNumbers(personne, { start: 0, end: 11 }),
                frameRate: 10,
                repeat: -1
            });
            this.anims.create({
                key: personne.concat("-attack"),
                frames: this.anims.generateFrameNumbers(personne.concat("-A"), { start: 0, end: 23 }),
                frameRate: 10,
                repeat: 0
            });
        });

        this.setAllInteractive();

        this.jason.play("jason-idle");
        this.jason.on('pointerover', (pointer) => {
            this.jasonText.setStyle({ fill: "#edc400" });
        });

        this.matthias.play("matthias-idle");
        this.matthias.on('pointerover', (pointer) => {
            this.matthiasText.setStyle({ fill: "#ba0ade" });
        });

        this.naim.play("naim-idle");
        this.naim.on('pointerover', (pointer) => {
            this.naimText.setStyle({ fill: "#e80027" });
        });

        this.alex.play("alex-idle");
        this.alex.on('pointerover', (pointer) => {
            this.alexText.setStyle({ fill: "#00ea0a" });
        });

        this.thomas.play("thomas-idle");
        this.thomas.on('pointerover', (pointer) => {
            this.thomasText.setStyle({ fill: "#0aa9de" });
        });

        this.jason.on('pointerout', (pointer) => {
            this.jasonText.setStyle({ fill: "#ffffff" });
        });
        this.matthias.on('pointerout', (pointer) => {
            this.matthiasText.setStyle({ fill: "#ffffff" });
        });
        this.alex.on('pointerout', (pointer) => {
            this.alexText.setStyle({ fill: "#ffffff" });
        });
        this.thomas.on('pointerout', (pointer) => {
            this.thomasText.setStyle({ fill: "#ffffff" });
        });
        this.naim.on('pointerout', (pointer) => {
            this.naimText.setStyle({ fill: "#ffffff" });
        });

        this.retourbutton.on('pointerover', (pointer) => {
            this.retourbutton.setTexture("retour-hover");
        });
        this.retourbutton.on('pointerout', (pointer) => {
            this.retourbutton.setTexture("retour");
        });
        this.retourbutton.on('pointerup', (pointer) => {
            this.scene.start('menu');
        });
    }

    update() {

    }
    setAllInteractive() {
        this.jason.setInteractive();
        this.matthias.setInteractive();
        this.naim.setInteractive();
        this.alex.setInteractive();
        this.thomas.setInteractive();
        this.retourbutton.setInteractive({ useHandCursor: true });
    }
}