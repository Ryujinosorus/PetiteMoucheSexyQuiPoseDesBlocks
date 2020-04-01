import Character from './Character';
export default class VN02 extends Phaser.Scene {
    index = -1;
    datas = [
        "Un jeune homme a été retrouvé mort ce matin.\nL’homme se prénomme Mark Pagano",
        "Son corps a été retrouvé sans vie, dans son lit,\nvers 9h du matin",
        "Ses proches disent qu’il n’avait de problème avec\npersonne...",
        "Bien sûr, les enquêteurs essayent actuellement de\ncomprendre les circonstances de sa mort.",
        "Jour -4 avant le meurtre ...",
        "Je te connais depuis qu’on est gosse mais.. waouh.\n Toi marié ?",
        "Dis pas ça, y’a encore rien de fait…",
        "Bah quoi, t’as pas envie d’être marié à ta copine ?",
        "C’est pas ça mec, c’est juste qu’on est jeune..\nOn a tous les deux un tas de responsabilité.",
        "J’ai pas envie qu’on en rajoute, on a pas besoin de se\nprécipiter.",
        "Ouais ouais, bon c’est pas tout ça mais je dois y aller.\nJe commence tôt demain !",
        "Sérieux, déjà ? J’ai pas envie de rentrer.",
        "Fait attention à toi et boit pas trop !",
        "Bon, hips.. faut peut-être que je rentre",
        "Excuse-moi, mes amies sont parties,\nest-ce que je peux m’asseoir avec toi ?",
        "Quelque heure plus tard",
        "Bon bn j'habite just la",
        "Tu peux monter boire un coup si tu veux",
        "Oh avec plaisir !",
        "...",
        ""
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
        super('VN01');

    }
    preload() {
        this.pointer = this.input.activePointer;
        this.load.image('background_bar', '../../assets/backgrounds/bar.jpg');
        this.load.image('background_store', '../../assets/backgrounds/store.jpg');
        this.load.image('background_bedroom', '../../assets/backgrounds/bedroom.jpg');
        this.load.image('background_bedroomD', '../../assets/backgrounds/bedroomD.jpg');
        this.load.image('background_dark', '../../assets/backgrounds/dark.jpg');
        this.load.image('background_street', '../../assets/backgrounds/street.jpg');
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
        let tmp = this.add.sprite(380, 500, "background_text");
        tmp.setDepth(55);
        tmp.scaleX = 0.9;
        this.background = this.add.image(0, 0, 'background_store').setOrigin(0);

        this.Mark = new Character(this, 'Mark0', 10, 200);
        this.Presentatrice = new Character(this, 'Presentatrice0', 300, 200,true);
        this.Thomas = new Character(this, 'Thomas0', 400, 200);
        this.Lilith = new Character(this, 'Lilith0', 400, 200);


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
        this.isTalking("Présentatrice");
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
            case 1:
                this.Presentatrice.changeTo("Presentatrice1");
                break;
            case 2:
                this.Presentatrice.changeTo("Presentatrice0");
                break;
            case 4:
                this.isTalking("");
                this.changeBackground("background_dark");
                this.Presentatrice.changeVisible();
                break;
            case 5:
                this.changeBackground("background_bar");
                this.isTalking("Thomas");
                this.Mark.changeVisible();
                this.Thomas.changeVisible();
                break;
            case 6:
                this.isTalking("Mark");
                this.Mark.changeTo("Mark1");
                break;
            case 7:
                this.isTalking("Thomas");
                this.Thomas.changeTo("Thomas1");
                break;
            case 8:
                this.isTalking("Mark");
                this.Mark.changeTo("Mark2");
                break;
            case 9:
                this.Mark.changeTo("Mark0");
                break;
            case 10:
                this.isTalking("Thomas");
                this.Thomas.changeTo("Thomas2");
                break;
            case 11:
                this.isTalking("Mark");
                this.Mark.changeTo("Mark2");
                this.Thomas.changeTo("Thomas0");
                break;
            case 12:
                this.isTalking("Thomas");
                this.Thomas.changeTo("Thomas1");
                break;
            case 13:
                this.Thomas.changeVisible();
                this.isTalking("Mark")
                this.Mark.changeTo("Mark1");
                break;
            case 14:
                this.Lilith.changeVisible();
                this.isTalking("Lilith");
                break;
            case 15:
                this.isTalking("");
                this.changeBackground("background_dark");
                this.Lilith.changeVisible();
                this.Mark.changeVisible();
                break;
            case 16:
                this.changeBackground("background_street");
                this.isTalking("Mark");
                this.Lilith.changeVisible();
                this.Mark.changeVisible();
                this.Mark.changeTo("Mark0");
                break;
            case 17:
                this.Mark.changeTo("Mark2");
                break;
            case 18:
                this.isTalking("Lilith");
                break;
            case 19:
                this.isTalking("");
                this.Lilith.changeVisible();
                this.Mark.changeVisible();
                this.changeBackground("background_dark");
                break;
            case 20:
                this.scene.start("Level1");
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
