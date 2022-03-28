import { CardColorType } from './CardColorType';
import { CardShapeType } from './CardShapeType';
import { Vector2 } from '../../../../../core/engine/Vector2';
import { Draw } from '../../../../../core/services/Draw';
import { Color4 } from '../../../../../core/engine/Color4';
import { CardService } from './CardService';
import { Vector2Easing } from '../../../../../core/engine/Vector2Easing';
import { FillRectParams } from '../../../../../core/models/drawModels/FillRectParams';
import { TextParams } from '../../../../../core/models/drawModels/TextParams';
import { TransitionValue } from '../../../../../core/engine/TransitionValue';

export class Card {
    public Position: Vector2Easing;
    color: CardColorType;
    shape: CardShapeType;
    num: number;
    curColor: Color4;
    id: number;
    key: String;
    visability: boolean;
    public scaleX: TransitionValue;

    constructor(num: number, shape: CardShapeType, color: CardColorType) {
        this.color = color;
        this.shape = shape;
        this.num = num;
        this.visability = false;
        this.scaleX = new TransitionValue(1, 1);
        this.key = `${num}-${shape}-${color}`

        this.curColor = CardService.getColor(this.color);
        if (this.color == CardColorType.any) {
            this.curColor = CardService.getColor(CardColorType.yellow);
        }
    }

    public Init(): void {

    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        this.Position.Update(timeDelta);
        this.scaleX.Update(timeDelta);
    }

    public Show() {
        this.scaleX.GoTo(0, 10, () => {
            this.visability = true;
            this.scaleX.GoTo(1, 10);
        });
    }

    //============ DRAW ============
    public Draw(offset: Vector2 = Vector2.Zero): void {
        if (this.visability) {
            this.DrawShown(offset);
        }
        else {
            this.DrawHidden(offset);
        }
    }

    public isStable() {
        return (<Vector2Easing>this.Position).isStable();
    }

    public DrawHidden(offset: Vector2 = Vector2.Zero, fadeAway: number = 1): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.ADD(offset), size: new Vector2(64, 64), scale: new Vector2(this.scaleX.GetVal(), 1).MUL(fadeAway), color: new Color4(200, 200, 200, 1 * fadeAway) });
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.ADD(offset), size: new Vector2(62, 62), scale: new Vector2(this.scaleX.GetVal(), 1).MUL(fadeAway), color: new Color4(100, 100, 100, 1 * fadeAway) });
        Draw.I.TextFill(<TextParams>{ str: "ётта", scale: new Vector2(this.scaleX.GetVal(), 1).MUL(fadeAway), position: this.Position.ADD(offset), color: new Color4(200, 200, 200, 1 * fadeAway), fontSize: 25 });
    }

    public DrawShown(offset: Vector2 = Vector2.Zero): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.ADD(offset), size: new Vector2(64, 64), scale: new Vector2(this.scaleX.GetVal(), 1), color: new Color4(200, 200, 200, 1) });
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.ADD(offset), size: new Vector2(62, 62), scale: new Vector2(this.scaleX.GetVal(), 1), color: new Color4(220, 220, 220, 1) });
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.ADD(offset), size: new Vector2(33), scale: new Vector2(this.scaleX.GetVal(), 1), color: new Color4(20, 20, 20, 1) });

        CardService.drawShape(this.shape, this.Position.ADD(offset), this.curColor, new Vector2(this.scaleX.GetVal(), 1));
        Draw.I.TextFill(<TextParams>{ str: `${this.num + 1}`, position: this.Position.ADD(offset).SUB(new Vector2(24 * this.scaleX.GetVal(), 22)), scale: new Vector2(this.scaleX.GetVal(), 1), color: this.curColor, fontSize: 14 });
        Draw.I.TextFill(<TextParams>{ str: `${this.num + 1}`, position: this.Position.ADD(offset).ADD(new Vector2(24 * this.scaleX.GetVal(), 22)), scale: new Vector2(this.scaleX.GetVal(), 1), color: this.curColor, fontSize: 14 });
    }
}
