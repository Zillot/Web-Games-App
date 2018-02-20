class Button {
    //name
    //text
    //onClick
    //position
    //size
    //color

    constructor() {
    }

    init() {
        var those = this;
        Setups.input.onInputEvent(function() {
            those.click(those);
        }, this.name + '-OnClick', EventsTypes.leftMouseClick);
    }

    dispose() {

    }

    update(timeDelta) {

    }

    draw(ctx) {
        Setups.draw.rect(this.position, this.size, new Vector2(0, 0), this.color);
        Setups.draw.textFill(this.text, this.position, Color4.Black(), null, 14, new Vector2(0, 0));
    }
    //-------------
    click() {
        if (Geometry.IsPointInRect(Setups.input.getMousePosition(), Rect.fromVectors(this.position.SUB(this.size.DIV(2)), this.size))) {
            if (this.onClick != null) {
                this.onClick();
            }
        }
    }

    static getButton(name, text, onClick, position, size, color, fontSize) {
        if (name.name != null) {
            text = name.text;
            onClick = name.onClick;
            position = name.position;
            size = name.size;
            color = name.color;
            fontSize = name.fontSize;
            name = name.name;
        }

        var btn = new Button();

        btn.name = name;
        btn.text = text;
        btn.onClick = onClick;
        btn.position = position;
        btn.size = size;
        btn.color = color;
        btn.fontSize = fontSize;

        btn.init();

        return btn;
    }
}