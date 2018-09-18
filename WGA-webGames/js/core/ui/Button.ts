module WGAAppModule {
    'use strict';

    export class Button implements IUiComponent {
        public Name: string;

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
                },
                this.Name + '-OnClick',
                EventsTypes.MouseButtonPressed,
                KeyCodes.LeftMouseClick);
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

        public static GetButton(buttonBody: any): Button {
            var newButton = new Button();
            newButton.Name = buttonBody.name;
            newButton.text = buttonBody.text;
            newButton.onClick = buttonBody.onClick;
            newButton.position = buttonBody.position;
            newButton.size = buttonBody.size;
            newButton.color = buttonBody.color;
            newButton.fontSize = buttonBody.fontSize;

            newButton.Init();

            return newButton;
        }
    }
}