import { Vector2 } from 'src/ts/core/engine/Vector2';
import { Zombie } from './Zombie';
import { ExDraw } from 'src/ts/WGA/services/ExDraw';
import { Color4 } from 'src/ts/core/engine/Color4';
import { Draw } from 'src/ts/core/services/Draw';
import { TextParams } from 'src/ts/core/models/TextParams';

export class ZombieSwat extends Zombie {
    constructor(position: Vector2, hp: number, speed: number) {
        super(position, hp, speed);
    }

    public Draw(): void {
        var scale = 0.8 + (this.Hp / this.MaxHp) * 0.2;
        ExDraw.I.DrawZombie(this.Position, this.Angle, this.Color, this.Color.GetInvertColor(), scale);
        Draw.I.TextFill(<TextParams>{ str: "SWAT", position: this.Position.ADD(new Vector2(0, 50)), color: Color4.Gray, fontName: "serif", fontSize: 6, origin: new Vector2(0, -1) });
    }
}
