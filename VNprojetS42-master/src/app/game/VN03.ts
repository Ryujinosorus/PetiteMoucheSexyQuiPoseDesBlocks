import Character from './Character';
export default class VN02 extends Phaser.Scene {
    index = -1;
    datas = [
        "Au reveil ...",
        "AHHH ! Encore.. ce maudit cauchemar !",
        "Enfin reveillé mon loup ? Alors de quoi voulais-tu me\nparler ?",
        "Mais !!? Qu es ce que tu fais la ? ",
        "Je me suis endormi tout seul cette nuit ! ",
        "As-tu trop bu hier ? Tu n'as fais que m'appeler et tu\nne t'en rappelles même pas. ",
        "C'est pas possible... arghh",
        "T'es sûr que ça va ? Tu agis bizarrement..",
        "Moi... bizarre ?",
        "C'est toi qui est apparu comme sa, et tu fous la merde\ndans ma vie ! ",
        "Bref, je vais prendre une douche avant de repartir.",
        "TOK ! TOK ! TOK!",
        "Hein mais qui sa peut bien être maintenant ?! ",
        "Salut chérie,c'est moi <3",
        "J'espere que passe pas tout ton temps au bar avec Thomas ! ",
        "On a mariage a preparé je te rapele",
        "Sinon attention a toi mon ange ",
        "Hey, salut princesse sa te dit de m'attendre au parc en bas",
        "Le temps que je m'habille",
        "Ok ! Fais toi beau chérie ! ",
        "OH PUTAIN !",
        "LA CHANCE !!!!",
        "Bon je sort en laissant la porte ouverte, et elle se\ndébrouille !",
        "Plus tard au soir ...",
        "Ah....",
        "Enfin tranquille ",
        "Heuresement que Rosa n'est pas au courant pour Lilith",
        "Avec le mariage qui arrive ...",
        "Sa a été cool avec Lilith mais c'est pas sérieux ...",
        "Je dois arreter de la voir ",
        "Mark s'endort ...",
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
        super('VN03');

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
        this.Rosa = new Character(this, "Rosa0",400,200);


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
        this.isTalking("");
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
                this.isTalking("Mark");
                this.Mark.changeVisible();
                this.changeBackground("background_bedroomD");
                break;
            case 2:
                this.changeBackground("background_bedroom");
                this.isTalking("Lilith");
                this.Lilith.changeVisible();
                this.Mark.changeTo("MarkN2");
                break;
            case 3:
                this.isTalking("Mark");
                break;
            case 4:
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN1");
                break;
            case 5:
                this.isTalking("Lilith");
                this.Lilith.changeTo("Lilith2");
                break;
            case 6:
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN2");
                this.Lilith.changeTo("Lilith2");
                break;
            case 7:
                this.isTalking("Lilith");
                break;
            case 8:
                this.isTalking("Mark");
                break;
            case 9:
                this.Mark.changeTo("MarkN1");
                break;
            case 1:
                break;
            case 10:
                this.isTalking("Lilith");
                this.Lilith.changeTo("Lilith1");
                this.Lilith.mooveTo(800);
                break;
            case 11:
                this.Lilith.changeVisible();
                this.isTalking("Porte");
                break;
            case 12:
                this.Mark.changeTo("MarkN2");
                this.isTalking("Mark");
                break;
            case 13:
                this.isTalking("Rosa");
                this.Rosa.changeVisible();
                break;
            case 14:
                this.Rosa.changeTo('Rosa1');
                break;
            case 15:
                this.Rosa.changeTo('Rosa2');
                break;
            case 16:
                this.Rosa.changeTo('Rosa0');
            case 17:
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN0");
                break;
            case 18:
                this.Mark.changeTo("MarkN2");
                break;
            case 19:
                this.isTalking("Rosa");
                this.Mark.changeTo("MarkN0");
                break;
            case 20:
                this.Rosa.changeVisible();
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN1");
                break;
            case 21:
                this.Mark.changeTo("MarkN2");
                break;
            case 23:
                this.Mark.changeVisible();
                this.isTalking("");
                this.changeBackground("background_dark");
                break;
            case 24:
                this.changeBackground("background_bedroom");
                this.Mark.changeVisible();
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN0");
                break;
            case 24:
                this.Mark.changeTo("MarkN2");
                break;
            case 26:
                this.Mark.changeTo("MarkN0");
                break;
            case 27:
                this.Mark.changeTo("MarkN2");
                break;
            case 29:
                this.Mark.changeTo("MarkN0");
                break;
            case 30:
                this.Mark.changeVisible();
                this.isTalking("");
                this.changeBackground("background_dark");
                break;
            case 31:
                this.scene.start("Level3");
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
