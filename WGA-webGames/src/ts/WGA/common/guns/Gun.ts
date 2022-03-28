import { Vector2 } from "../../../core/engine/Vector2";
import { Bullet } from "./../Bullet";
import { TransitionValue } from "../../../core/engine/TransitionValue";
import { FillCircleParams } from "../../../core/models/drawModels/FillCircleParams";
import { Color4 } from "../../../core/engine/Color4";
import { FillRectParams } from "../../../core/models/drawModels/FillRectParams";
import { MouseState } from "../../../core/models/MouseState";
import { Utils } from 'src/ts/core/services/Utils';
import { Draw } from 'src/ts/core/services/Draw';
import { MouseInput } from 'src/ts/core/services/MouseInput';
import { CallbackFunction } from 'src/ts/core/CallbackFunction';

export class Gun {
    public Position: Vector2;
    public Direction: Vector2;
    public Power: number;
    public Damage: number;
    public AngleControll: TransitionValue;

    public ShootPauseControll: TransitionValue;
    public ShootPauseBase: number;
    public Angle: number;
    public Health: number;

    public Bullets: Bullet[];

    public OnShootEvent: CallbackFunction;

    constructor(position: Vector2, rotationSpeed: number) {
        this.Power = 50;
        this.Direction = new Vector2(-1, 0);
        this.Position = position;
        this.Health = 100;

        this.Bullets = [];

        this.ShootPauseBase = 0.3;
        this.ShootPauseControll = new TransitionValue(0, 1);
        this.ShootPauseControll.GoToFrom(this.ShootPauseBase, 0);

        this.AngleControll = new TransitionValue(0, rotationSpeed);
    }

    //============ UPDATE ============
    public Update(timeDelta: number, tryToHitEvent: any): void {
        if (!this.IsDead()) {
            this.UpdateRotation(timeDelta);
        }

        this.ShootPauseControll.Update(timeDelta);
        this.UpdateBullets(timeDelta, tryToHitEvent);
        this.ShootByGun();
        this.RemoveDeadBullets();
    }

    public UpdateRotation(timeDelta: number): void {
        var toMouseDir = MouseInput.GetMousePosition().SUB(this.Position).Normalize();
        var delta = Vector2.AngleBetween(this.Direction, toMouseDir);

        this.AngleControll.GoToDelta(delta);
        this.AngleControll.Update(timeDelta);

        this.Direction = Vector2.Left.RotateTo(this.AngleControll.GetVal());
    }

    public UpdateBullets(timeDelta: number, tryToHitEvent: any): void {
        for (var bulletKey in this.Bullets) {
            var bullet = this.Bullets[bulletKey];

            bullet.Update(timeDelta);

            if (bullet.NotOnTheGameField()) {
                bullet.MarkToBeRemoved();
                continue;
            }

            if (tryToHitEvent) {
                tryToHitEvent(bullet);
            }
        }
    }

    public RemoveDeadBullets(): void {
        for (var i = 0; i < this.Bullets.length; i++) {
            if (this.Bullets[i].ShouldBeRemoved()) {
                this.Bullets.splice(i, 1);
            }
        }
    }

    public Hit(value: number): void {
        var oldSatate = this.IsDead();
        this.Health -= value;
        if (oldSatate != this.IsDead()) {
            //TODO: just died logic
        }
    }

    public IsDead(): boolean {
        return this.Health <= 0;
    }

    //============ DRAW ============
    public Draw(draw: Draw): void {
        this.DrawBullets(draw);
        this.DrawBackground(draw);
        this.DrawGun(draw);
    }

    public DrawBullets(draw: Draw): void {
        for (var item in this.Bullets) {
            this.Bullets[item].Draw(draw);
        }
    }

    public DrawBackground(draw: Draw): void {
        draw.CircleFill(<FillCircleParams> {
            position: this.Position,
            radius: 20,
            origin: new Vector2(0, 0),
            color: Color4.ColorFromHex('#00FF00'),
            angle: this.AngleControll.GetVal()
        });
    }

    public DrawGun(draw: Draw): void {
        draw.RectFill(<FillRectParams> {
            position: this.Position,
            size: new Vector2(50, 10),
            origin: new Vector2(1, 0),
            color: Color4.ColorFromHex('#00FF00'),
            angle: this.AngleControll.GetVal()
        });

        draw.RectFill(<FillRectParams> {
            position: this.Position,
            size: new Vector2(5, 5),
            origin: new Vector2(0, 0),
            color: Color4.ColorFromHex('#FFFF00')
        });
    }

    public ShootByGun(): void {
        if (MouseInput.GetMouseState() == MouseState.Down && !this.IsDead()) {
            this.Shoot(MouseInput.GetMousePosition());
        }
    }

    public Shoot(point: Vector2): void {
        if (this.ShootPauseControll.IsStill()) {
            this.ShootPauseControll.GoToFrom(this.ShootPauseBase, 0);
            var speed = 1000 + Utils.RandF(-1, 1);

            this.Bullets.push(new Bullet(this.Position.ADD(this.Direction.MUL(40)), this.Direction, this.Power, speed));

            if (this.OnShootEvent != null) {
                this.OnShootEvent();
            }
        }
    }
}
