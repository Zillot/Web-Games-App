module WGAAppModule {
    'use strict';

    export class Button {
        private name: string;
        private text: string;
        private onClick: any;
        private position: Vector2;
        private size: Vector2;
        private color: Color4;
        private fontSize: number;

        constructor() {
        }

        public Init(): void {
            Setups.I.Input.OnInputEvent(() => {
                this.Click();
            }, this.name + '-OnClick', EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseClick);
        }

        public Dispose(): void {

        }

        public Update(timeDelta: number): void {

        }

        public Draw(): void {
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size.ADD(new Vector2(3)), color: Color4.Black() });
            Setups.I.Draw.RectFill(<FillRectParams>{ position: this.position, size: this.size, color: this.color });
            Setups.I.Draw.TextFill(<TextParams>{ str: this.text, position: this.position, color: Color4.Black(), fontSize: 14 });
        }
        //-------------
        public Click(): void {
            if (Setups.I.Geometry.IsPointInRect(Setups.I.Input.GetMousePosition(), Rect.FromVectors(this.position.SUB(this.size.DIV(2)), this.size))) {
                if (this.onClick != null) {
                    this.onClick();
                }
            }
        }

        public static GetButton(name: string | any, text?: string, onClick?: any, position?: Vector2, size?: Vector2, color?: Color4, fontSize?: number): Button {
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

            btn.Init();

            return btn;
        }
    }
}