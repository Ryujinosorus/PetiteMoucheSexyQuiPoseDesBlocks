import Character from './Character';
export default class VN04 extends Phaser.Scene {
    index = -1;
    datas = [
        "Hein ?Mais ou suis-je ?",
        "Que m'est il arrivé ? ",
        "Pourquoi je n'arrive pas a bouger ?",
        "Suis'je vivant au moins ? ",
        "Rosa ? Ou es tu Rosa ?!",
        "J'ai encore fait ce reve puis...",
        "Rosa ...",
        "Je n'ai meme pas pu m'excuser de l'avoir trompé ...",
        "Ohh Rosa, je donnerai tout pour te revoir",
        "Toi qui était avec moi lorsque sa n'allait pas",
        "Toi qui était la lorsque sa n'allait pas ...",
        "Dire que je l'ai trompé avec cette fille",
        "Comment s'appellait elle déja ? ",
        "Lilia ?",
        "Lilith ? ",
        "Ou l'ai je rencontrer ?",
        "Dans la rue?",
        "C'était une ancienne amie ?",
        "Et ma femme ? ",
        "Comment s'appellait elle déja ?",
        "..."
    ];

    Mark;
    Presentatrice;
    Thomas;
    Lilith;
    Rosa;

    pointer;

    isUp = true;

    text = "";
    actualText = "";
    ppl;
    textShowed;
    pplWhoTalk;

    isEnd = true;

    background;
    constructor() {
        super('VN04');

    }
    preload() {
        this.pointer = this.input.activePointer;
        this.load.image('background_bar', '../../assets/backgrounds/bar.jpg');
        this.load.image('background_store', '../../assets/backgrounds/store.jpg');
        this.load.image('background_bedroom', '../../assets/backgrounds/bedroom.jpg');
        this.load.image('background_bedroomD', '../../assets/backgrounds/bedroomD.jpg');
        this.load.image('background_dark', '../../assets/backgrounds/dark.jpg');
        this.load.image('background_text', '../../assets/backgrounds/text.png');

        this.load.image('Mark0', '../../assets/characters/Mark/Mark0.png');
        this.load.image('Mark1', '../../assets/characters/Mark/Mark1.png');
        this.load.image('Mark2', '../../assets/characters/Mark/Mark2.png');
        this.load.image('MarkN0', '../../assets/characters/Mark/MarkN0.png');
        this.load.image('MarkN1', '../../assets/characters/Mark/MarkN1.png');
        this.load.image('MarkN2', '../../assets/characters/Mark/MarkN2.png');
        this.load.image('MarkD', '../../assets/characters/Mark/MarkD.png');

        this.load.image('Presentatrice0', '../../assets/characters/nurse/nurse0.png');
        this.load.image('Presentatrice1', '../../assets/characters/nurse/nurse1.png');

        this.load.image('Thomas0', '../../assets/characters/Thomas/Thomas0.png');
        this.load.image('Thomas1', '../../assets/characters/Thomas/Thomas1.png');
        this.load.image('Thomas2', '../../assets/characters/Thomas/Thomas2.png');
        this.load.image('Thomas3', '../../assets/characters/Thomas/Thomas3.png');

        this.load.image('Lilith0', '../../assets/characters/Lilith/Lilith0.png');
        this.load.image('Lilith1', '../../assets/characters/Lilith/Lilith1.png');
        this.load.image('Lilith2', '../../assets/characters/Lilith/Lilith2.png');

        this.load.image('Rosa0', '../../assets/characters/Rosa/Rosa0.png');
        this.load.image('Rosa1', '../../assets/characters/Rosa/Rosa1.png');
        this.load.image('Rosa2', '../../assets/characters/Rosa/Rosa2.png');
    }

    create() {
        this.background = this.add.image(0, 0, 'background_dark').setOrigin(0);
        let tmp = this.add.sprite(380, 500, "background_text");
        tmp.setDepth(55);
        tmp.scaleX = 0.9;

        this.Mark = new Character(this, 'MarkD', 10, 200);
        this.Presentatrice = new Character(this, 'Presentatrice0', 300, 200);
        this.Thomas = new Character(this, 'Thomas0', 400, 200);
        this.Lilith = new Character(this, 'Lilith1', 400, 200);
        this.Rosa = new Character(this, "Rosa0", 400, 200);


        this.textShowed = this.add
            .text(60, 475, "", {
                font: "20px monospace",
                fill: "#ffffff",
                padding: { x: 0, y: 0 },
            });
        this.pplWhoTalk = this.add
            .text(150, 425, "", {
                font: "20px monospace",
                fill: "#ffffff",
                padding: { x: 0, y: 0 },
            });
        this.textShowed.setDepth(100);
        this.pplWhoTalk.setDepth(100);
        this.isTalking("Mark");
    }

    update(time, delta) {
        if (this.pointer.isDown && this.isUp) {
            this.isUp = false;
            if (this.isEnd) {
                this.startLoadingText();
            }
            else if (!this.isEnd)
                this.fullLinePls();

        }
        else if (!this.pointer.isDown) {
            this.isUp = true;
            this.goNext();
        }


        this.textShowed.text = this.actualText;
        this.pplWhoTalk.text = this.ppl;

    }
    startLoadingText() {
        this.isEnd = false;
        this.index++;
        if (this.index > this.datas.length - 1)
            return;
        this.text = this.datas[this.index];
        this.actualText = "";
        this.lookForEvents();
    }

    fullLinePls() {
        this.actualText = this.text;
        this.isEnd = true;
    }
    goNext() {
        if (this.text == this.actualText)
            this.isEnd = true;
        else {
            this.actualText += this.text[this.actualText.length];
        }
    }
    lookForEvents() {
        console.log(this.index);
        switch (this.index) {
            case 20:
                this.scene.start("credit");
        }
    }
    changeBackground(name) {
        this.background = this.add.image(0, 0, name);
        this.background.setOrigin(0);
    }
    isTalking(name) {
        this.ppl = name;
    }
}
