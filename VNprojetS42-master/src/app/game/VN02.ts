import Character from './Character';
export default class VN02 extends Phaser.Scene {
    index = -1;
    datas = [
        "Au reveil ...",
        "Merde� c�est carr�ment mauvais, j�suis foutu",
        "Mmmh, qu�est-ce qui est mauvais ?",
        "Coucher avec une inconnue ? Alors que je vais me marier ?",
        "Bon �coute, je veux pas que tu te fasses une fausse id�e\nde moi",
        "Ce qu�il s�est pass� cette nuit c�est pas quelque chose\nd�habituelle pour moi",
        "/Check l�heure/ Oups, il est d�j� 9h. Je serais bien \nrest� un peu plus longtemps mais je dois y aller, ciao !",
        "Attend tu peux pas partir comme sa !",
        "Elle a pas entendu ...",
        "Cette nuit au bar avec Thomas ...",
        " Ah ouais, l� par contre je peux plus rien pour toi mec ...",
        "Rigole pas, c�est chaud ce qui m�arrive, c�est pas comme\nsijepouvais juste m�excuser pour que tout s�arrange.",
        "Je commence � me demander si je peux vraiment rendre ma\ncopineheureuse..",
        "�coute, tu vas rentrer chez toi.\nT�endormir et demain tu feras comme si de rien n��tait.",
        "Je vais garder ce secret, mais �vite �a la prochaine fois\nque tu vois une jolie fille.",
        "Ouai...Je retourne dormir chez moi, je suis �clatax",
        "Et trompe pas Rosa cette nuit",
        "...",
        "Ahahaha je rigole ! A la prochaine !",
        "1H plus tard chez Mark ...",
        "Bon n'empeche j'ai bien aim� cette nuit avec Lilith",
        "Mais il faut surout pas que Rosa le sache !",
        "De tout facon elle le saura jamais ",
        "Sur ce une nuit bien merit� ...",
        "Mark s'endort ...",
        ""
    ];

    Mark;
    Presentatrice;
    Thomas;
    Lilith;
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
        super('VN02');

    }
    preload() {
        this.pointer = this.input.activePointer;
        this.load.image('background_bar', '../../assets/backgrounds/bar.jpg');
        this.load.image('background_store', '../../assets/backgrounds/store.jpg');
        this.load.image('background_bedroom', '../../assets/backgrounds/bedroom.jpg');
        this.load.image('background_bedroom', '../../assets/backgrounds/transition1.jpg');
        this.load.image('background_dark', '../../assets/backgrounds/dark.jpg');
        this.load.image('background_text', '../../assets/backgrounds/text.png');

        this.load.image('Mark0', '../../assets/characters/Mark/Mark0.png');
        this.load.image('Mark1', '../../assets/characters/Mark/Mark1.png');
        this.load.image('Mark2', '../../assets/characters/Mark/Mark2.png');
        this.load.image('MarkN0', '../../assets/characters/Mark/MarkN0.png');
        this.load.image('MarkN1', '../../assets/characters/Mark/MarkN1.png');
        this.load.image('MarkN2', '../../assets/characters/Mark/MarkN2.png');

        this.load.image('Presentatrice0', '../../assets/characters/nurse/nurse0.png');
        this.load.image('Presentatrice1', '../../assets/characters/nurse/nurse1.png');

        this.load.image('Thomas0', '../../assets/characters/Thomas/Thomas0.png');
        this.load.image('Thomas1', '../../assets/characters/Thomas/Thomas1.png');
        this.load.image('Thomas2', '../../assets/characters/Thomas/Thomas2.png');
        this.load.image('Thomas3', '../../assets/characters/Thomas/Thomas3.png');

        this.load.image('Lilith0', '../../assets/characters/Lilith/Lilith0.png');
        this.load.image('Lilith1', '../../assets/characters/Lilith/Lilith1.png');
        this.load.image('Lilith2', '../../assets/characters/Lilith/Lilith2.png');
    }

    create() {
        this.background = this.add.image(0, 0, 'background_dark').setOrigin(0);
        let tmp = this.add.sprite(380, 500, "background_text");
        tmp.setDepth(55);
        tmp.scaleX = 0.9;
        this.Mark = new Character(this, 'MarkN1', 10, 200);
        this.Presentatrice = new Character(this, 'Presentatrice0', 300, 200);
        this.Thomas = new Character(this, 'Thomas0', 400, 200);
        this.Lilith = new Character(this, 'Lilith1', 400, 200);


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
                this.Lilith.changeVisible();
                this.Mark.changeVisible();
                this.changeBackground("background_bedroom");
                break;
            case 2:
                this.isTalking("Lilith");
                this.Lilith.changeTo("Lilith2");
                break;
            case 3:
                this.isTalking("Frank");
                this.Mark.changeTo("MarkN2");
                this.Lilith.changeTo("Lilith1");
                break;
            case 4:
                this.isTalking("Lilith");
                this.Mark.changeTo("MarkN2");
                this.Lilith.changeTo("Lilith2");
                break;
            case 5:
                this.Mark.changeTo("MarkN0");
                this.Lilith.changeTo("Lilith1");
                break;
            case 7:
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN2");
                this.Lilith.changeVisible();
                break;
            case 9:
                this.isTalking("");
                this.changeBackground("background_dark");
                this.Mark.changeVisible();
                break;
            case 10:
                this.Thomas.changeVisible();
                this.Mark.changeVisible();
                this.Mark.changeTo('Mark0');
                this.changeBackground("background_bar");
                this.isTalking("Thomas");
                break;
            case 11:
                this.Thomas.changeTo('Thomas2');
                this.isTalking('Mark');
                break;
            case 12:
                this.Mark.changeTo('Mark1');
                this.Thomas.changeTo('Thomas0');
                break;
            case 13:
                this.isTalking("Thomas")
                this.Thomas.changeTo("Thomas2");
                break;
            case 14:
                this.Thomas.changeTo("Thomas0");
                break;
            case 15:
                this.isTalking("Mark");
                this.Mark.changeTo("Mark0");
                break;
            case 16:
                this.isTalking("Thomas");
                this.Mark.changeTo("Mark1");
                break;
            case 17:
                this.isTalking("Mark");
                this.Thomas.changeTo("Thomas1");
                break;
            case 18:
                this.isTalking("Thomas");
                this.Mark.changeTo("Mark0");
                break;
            case 19:
                this.changeBackground("background_dark");
                this.isTalking("");
                this.Thomas.changeVisible();
                this.Mark.changeVisible();
                break;
            case 20:
                this.Mark.changeVisible();
                this.changeBackground("background_bedroom");
                this.isTalking("Mark");
                this.Mark.changeTo("MarkN0");
                break;
            case 21:
                this.Mark.changeTo("MarkN2");
                break;
            case 22:
                break;
            case 23:
                this.Mark.changeTo("MarkN0");
                break;
            case 24:
                this.changeBackground("background_dark");
                this.isTalking("");
                this.Mark.changeVisible();
                break;
            case 25:
                this.scene.start("Level2");
                break;

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
