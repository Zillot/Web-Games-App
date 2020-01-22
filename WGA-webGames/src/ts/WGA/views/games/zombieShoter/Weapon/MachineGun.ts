import { Draw } from 'src/ts/core/services/Draw';
import { Vector2 } from 'src/ts/core/engine/Vector2';
import { ReloadableGun } from 'src/ts/WGA/common/guns/ReloadableGun';

export class MachineGun extends ReloadableGun {
    constructor(position: Vector2, rotationSpeed: number) {
        super(position, rotationSpeed);
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
