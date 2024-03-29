import { Vector2 } from 'src/ts/core/engine/Vector2';
import { TransitionValue } from 'src/ts/core/engine/TransitionValue';
import { Gun } from './Gun';
import { Draw } from 'src/ts/core/services/Draw';
import { FillRectParams } from 'src/ts/core/models/drawModels/FillRectParams';
import { Color4 } from 'src/ts/core/engine/Color4';
import { TextParams } from 'src/ts/core/models/drawModels/TextParams';

export class ReloadableGun extends Gun {
    public ClipCapacityLeft: number;
    public ClipCapacityBase: number;

    public ReloadingTimeBase: number;
    public ReloadingControll: TransitionValue;

    constructor(position: Vector2, rotationSpeed: number) {
        super(position, rotationSpeed);

        this.Power = 10;
        this.ShootPauseBase = 0.3;

        this.ClipCapacityBase = 100;
        this.ClipCapacityLeft = this.ClipCapacityBase;

        this.ReloadingTimeBase = 3;
        this.ReloadingControll = new TransitionValue(0, 1);

        this.OnShootEvent = () => {
            this.ClipCapacityLeft--;
        }
    }

    //============ UPDATE ============
    public Update(timeDelta: number, tryToHitEvent: any): void {
        super.Update(timeDelta, tryToHitEvent);
        this.ReloadingControll.Update(timeDelta);

        this.RemoveDeadBullets();
    }

    //============ DRAW ============
    public Draw(draw: Draw): void {
        super.Draw(draw);

        draw.TextFill(<TextParams>{
            str: this.ClipCapacityLeft + "/" + this.ClipCapacityBase,
            position: this.Position.ADD(new Vector2(0, 25)),
            color: Color4.Gray,
            fontName: "serif",
            fontSize: 6,
            origin: new Vector2(0, -1)
        });

        if (!this.ReloadingControll.IsStill()) {
            draw.RectFill(<FillRectParams>{
                position: this.Position.ADD(new Vector2(0, 35)),
                origin: new Vector2(0, 0),
                size: new Vector2(40 * (this.ReloadingControll.GetVal() / this.ReloadingTimeBase), 2),
                color: Color4.Red
            });
        }
    }

    public Reload(): void {
        this.ReloadingControll.GoToFrom(this.ReloadingTimeBase, 0, 100, () => {
            this.ClipCapacityLeft = this.ClipCapacityBase;
        });
    }

    public NeedsToBeReload() {
        return this.ClipCapacityLeft <= (this.ClipCapacityBase * 0.2) && this.ReloadingControll.IsStill();
    }

    public Shoot(point: Vector2): void {
        if (this.ClipCapacityLeft > 0 && this.ReloadingControll.IsStill()) {
            super.Shoot(point);
        }
    }

    public SetClipCapacity(capacity: number) {
        this.ClipCapacityBase = capacity;
        this.ClipCapacityLeft = this.ClipCapacityBase;
    }
}
