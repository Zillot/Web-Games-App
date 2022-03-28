import { CardColorType } from './CardColorType';
import { CardShapeType } from './CardShapeType';
import { Vector2 } from '../../../../../core/engine/Vector2';
import { Draw } from '../../../../../core/services/Draw';
import { Color4 } from '../../../../../core/engine/Color4';
import { FillRectParams } from '../../../../../core/models/FillRectParams';
import { FillCircleParams } from '../../../../../core/models/FillCircleParams';
import { FillTriangleParams } from '../../../../../core/models/FillTriangleParams';

export class CardService {
    constructor() {
       
    }

    static getColor(color: CardColorType): Color4 {
        switch (color) {
            case CardColorType.yellow: return new Color4(230, 184, 0, 1);
            case CardColorType.red: return new Color4(255, 0, 0, 1);
            case CardColorType.blue: return new Color4(0, 45, 179, 1);
            case CardColorType.green: return new Color4(0, 153, 51, 1);
        }
    }

    static drawShape(shape: CardShapeType, pos: Vector2, color: Color4, scale: Vector2): void {
        switch (shape) {
            case CardShapeType.circle: this.drawCircle(pos, color, scale); break;
            case CardShapeType.plus: this.drawPlus(pos, color, scale); break;
            case CardShapeType.square: this.drawSqaure(pos, color, scale); break;
            case CardShapeType.triangle: this.drawTriangle(pos, color, scale); break;
        }
    }

    static drawCircle(pos: Vector2, color: Color4, scale: Vector2): void {
        Draw.I.CircleFill(<FillCircleParams>{ color: color, origin: Vector2.Zero, scale: scale, radius: 13, position: pos });
    }

    static drawSqaure(pos: Vector2, color: Color4, scale: Vector2): void {
        Draw.I.RectFill(<FillRectParams>{ position: pos, origin: Vector2.Zero, size: new Vector2(26, 26), scale: scale, color: color });
    }

    static drawPlus(pos: Vector2, color: Color4, scale: Vector2): void {
        Draw.I.RectFill(<FillRectParams>{ position: pos, origin: Vector2.Zero, size: new Vector2(26, 12), scale: scale, color: color });
        Draw.I.RectFill(<FillRectParams>{ position: pos, origin: Vector2.Zero, size: new Vector2(12, 26), scale: scale, color: color });
    }

    static drawTriangle(pos: Vector2, color: Color4, scale: Vector2): void {
        Draw.I.TriangleFill(<FillTriangleParams>{ position: pos, origin: Vector2.Zero, size: new Vector2(26, 26), scale: scale, color: color });
    }
}
