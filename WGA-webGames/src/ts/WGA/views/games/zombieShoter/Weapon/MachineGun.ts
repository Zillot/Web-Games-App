import { Draw } from 'src/ts/core/services/Draw';
import { Vector2 } from 'src/ts/core/engine/Vector2';
import { ReloadableGun } from 'src/ts/WGA/common/guns/ReloadableGun';

export class MachineGun extends ReloadableGun {
    constructor(position: Vector2) {
        super(position, 0.5);

        this.ShootPauseBase = 0.1;
        this.SetClipCapacity(10);
    }

    //============ UPDATE ============
    public Update(timeDelta: number, tryToHitEvent: any): void {
        super.Update(timeDelta, tryToHitEvent);
    }

    //============ DRAW ============
    public Draw(draw: Draw): void {
        super.Draw(draw);
    }
}
