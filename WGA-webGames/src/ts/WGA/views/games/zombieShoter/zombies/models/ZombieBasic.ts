import { Vector2 } from 'src/ts/core/engine/Vector2';
import { Zombie } from './Zombie';
import { ExDraw } from 'src/ts/WGA/services/ExDraw';

export class ZombieBasic extends Zombie {
    constructor(position: Vector2, hp: number, speed: number) {
        super(position, hp, speed);
    }

    public Draw(): void {
        var scale = 0.8 + (this.Hp / this.MaxHp) * 0.2;
        ExDraw.I.DrawZombie(this.Position, this.Angle, this.Color, this.Color.GetInvertColor(), scale);
    }
}
