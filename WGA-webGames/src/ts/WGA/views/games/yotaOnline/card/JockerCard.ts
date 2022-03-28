import { CardColorType } from './CardColorType';
import { CardShapeType } from './CardShapeType';
import { Vector2 } from '../../../../../core/engine/Vector2';
import { Draw } from '../../../../../core/services/Draw';
import { Color4 } from '../../../../../core/engine/Color4';
import { CardService } from './CardService';
import { Card } from './Card';
import { ValueEasing } from '../../../../../core/engine/ValueEasing';
import { Utils } from '../../../../../core/services/Utils';
import { EasingMode } from '../../../../../core/engine/EasingMode';
import { TransitionValue } from '../../../../../core/engine/TransitionValue';
import { FillRectParams } from '../../../../../core/models/drawModels/FillRectParams';
import { TextParams } from '../../../../../core/models/drawModels/TextParams';

export class JockerCard extends Card {
    curColor: Color4;
    timeout: TransitionValue;
    scales: ValueEasing[];

    posibleColors: CardColorType[];
    posibleShapes: CardShapeType[];
    posibleNumbers: number[];

    colorIndex: number;
    shapeIndex: number;
    numberIndex: number;

    static SWITCH_PAUSE_SEC = 5;

    constructor() {
        super(4, CardShapeType.any, CardColorType.any);

        this.timeout = new TransitionValue(0, 1);
        this.timeout.GoTo(JockerCard.SWITCH_PAUSE_SEC);

        this.colorIndex = Utils.RandI(0, 3);
        this.shapeIndex = Utils.RandI(0, 3);
        this.numberIndex = Utils.RandI(0, 3);

        this.posibleColors = [CardColorType.blue, CardColorType.green, CardColorType.red, CardColorType.yellow];
        this.posibleShapes = [CardShapeType.circle, CardShapeType.plus, CardShapeType.square, CardShapeType.triangle];
        this.posibleNumbers = [0, 1, 2, 3];

        this.scales = [
            new ValueEasing(2000, EasingMode.easeInOutCubic),
            new ValueEasing(2000, EasingMode.easeInOutCubic),
            new ValueEasing(2000, EasingMode.easeInOutCubic),
            new ValueEasing(2000, EasingMode.easeInOutCubic)
        ];

        this.curColor = CardService.getColor(this.posibleColors[this.colorIndex])
        this.setNewApperance();
    }

    public Init(): void {

    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        super.Update(timeDelta)
        this.curColor.Update(timeDelta);
        this.timeout.Update(timeDelta);

        for (var i = 0; i < this.scales.length; i++) {
            this.scales[i].Update(timeDelta);
        }

        if (this.timeout.isStable()) {
            this.setNewApperance();
            this.timeout.SetValue(0);
            this.timeout.GoTo(JockerCard.SWITCH_PAUSE_SEC);
        }
    }

    public setNewApperance() {
        this.colorIndex++;
        this.shapeIndex++;
        this.numberIndex++;

        if (this.colorIndex > 3) {
            this.colorIndex = 0
        }

        if (this.shapeIndex > 3) {
            this.shapeIndex = 0
        }

        if (this.numberIndex > 3) {
            this.numberIndex = 0
        }

        for (var i = 0; i < this.scales.length; i++) {
            this.scales[i].GoToZero();
        }

        this.scales[this.shapeIndex].GoToOne();

        this.curColor.goTo(CardService.getColor(this.posibleColors[this.colorIndex]), 2000);
    }

    //============ DRAW ============
    public DrawShown(): void {
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.v2(), scale: new Vector2(this.scaleX.GetVal(), 1), size: new Vector2(64, 64), color: new Color4(200, 200, 200, 1) });
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.v2(), scale: new Vector2(this.scaleX.GetVal(), 1), size: new Vector2(62, 62), color: new Color4(220, 220, 220, 1) });
        Draw.I.RectFill(<FillRectParams>{ position: this.Position.v2(), size: new Vector2(33), scale: new Vector2(this.scaleX.GetVal(), 1), color: new Color4(20, 20, 20, 1) });

        this.DrawJockerIcon(this.Position.ADD(new Vector2(24 * this.scaleX.GetVal(), -24)));
        this.DrawJockerIcon(this.Position.ADD(new Vector2(-24 * this.scaleX.GetVal(), 24)));

        CardService.drawCircle(this.Position, this.curColor, new Vector2(this.scales[0].GetVal() * this.scaleX.GetVal()));
        CardService.drawPlus(this.Position, this.curColor, new Vector2(this.scales[1].GetVal() * this.scaleX.GetVal()));
        CardService.drawSqaure(this.Position, this.curColor, new Vector2(this.scales[2].GetVal() * this.scaleX.GetVal()));
        CardService.drawTriangle(this.Position, this.curColor, new Vector2(this.scales[3].GetVal() * this.scaleX.GetVal()));

        Draw.I.TextFill(<TextParams>{ str: `${this.numberIndex + 1}`, position: this.Position.SUB(new Vector2(24 * this.scaleX.GetVal(), 22)), scale: new Vector2(this.scaleX.GetVal(), 1), color: this.curColor, fontSize: 14 });
        Draw.I.TextFill(<TextParams>{ str: `${this.numberIndex + 1}`, position: this.Position.ADD(new Vector2(24 * this.scaleX.GetVal(), 22)), scale: new Vector2(this.scaleX.GetVal(), 1), color: this.curColor, fontSize: 14 });
    }

    public DrawJockerIcon(pos: Vector2) {
        var offset = 3;

        CardService.drawCircle(pos.ADD(new Vector2(offset, -offset)), CardService.getColor(CardColorType.blue), new Vector2(0.2 * this.scaleX.GetVal()))
        CardService.drawPlus(pos.ADD(new Vector2(offset, offset)), CardService.getColor(CardColorType.green), new Vector2(0.2 * this.scaleX.GetVal()))
        CardService.drawSqaure(pos.ADD(new Vector2(-offset, -offset)), CardService.getColor(CardColorType.red), new Vector2(0.2 * this.scaleX.GetVal()))
        CardService.drawTriangle(pos.ADD(new Vector2(-offset, offset)), CardService.getColor(CardColorType.yellow), new Vector2(0.2 * this.scaleX.GetVal()))

    }
}
