class Button {
    //name
    //text
    //clickEvent
    //position
    //size
    //color

    constructor() { }

    init() {
        this.buttons = [];

        this.buttons.push();
    }

    update(timeDelta) {

    }

    draw(ctx) {
        Setups.draw.rect(this.position, this.size, null, this.color);
        Setups.draw.textFill(this.text, this.position, black);
    }
    //-------------
    static getButton(name, text, clickEvent, position, size, color) {
        var btn = new Button();

        btn.name = name;
        btn.text = text;
        btn.clickEvent = clickEvent;
        btn.position = position;
        btn.size = size;
        btn.color = color;

        return btn;
    }
}