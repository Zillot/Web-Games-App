import { Vector2 } from "../engine/Vector2";
import { BaseIco } from './BaseIco';
import { Button } from './Button';
import { Draw } from '../services/Draw';
import { MouseInput } from '../services/MouseInput';
import { KeyboardInput } from '../services/KeyboardInput';

export class ButtonWithIco extends Button {
    private icon: BaseIco;

    constructor(position: Vector2) {
        super(position);
    }

    public Init(): void {
        super.Init();

        if (this.icon) {
            this.icon.Init();
        }
    }

    public Dispose(): void {
        super.Dispose()

        if (this.icon) {
            this.icon.Dispose();
        }
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        if (this.icon) {
            this.icon.Update(timeDelta);
        }
    }

    public Draw(draw: Draw): void {
        super.Draw(draw);

        if (this.icon) {
            this.icon.SetOffset(this.position.ADD(this.offset))
            this.icon.Draw(draw);
        }
    }

    public static GetButton(buttonBody: any): ButtonWithIco {
        var newButton = new ButtonWithIco(buttonBody.position);
        newButton.CopyFrom(<Button>buttonBody);
        newButton.icon = buttonBody.icon;

        return newButton;
    }
}
