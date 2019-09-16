import { Vector2 } from "../../core/engine/Vector2";
import { Bullet } from "./Bullet";
import { Value } from "../../core/engine/Value";
import { Data } from "../../app/Data";
import { FillCircleParams } from "../../core/models/FillCircleParams";
import { Color4 } from "../../core/engine/Color4";
import { FillRectParams } from "../../core/models/FillRectParams";
import { MouseState } from "../../core/models/MouseState";

export class Gun {
    static RELOADINGPAUSE: number = 0.3;
    static DEMMAGEPOWER: number = 10;
        
    public Position: Vector2;
    public Direction: Vector2;
    public Power: number;
    public AngleControll: Value;

    public Reload: number;
    public Angle: number;
    public Health: number;

    public Bullets: Bullet[];

    constructor(position: Vector2, rotationSpeed: number) {
        this.Power = Gun.DEMMAGEPOWER;
        this.Direction = new Vector2(-1, 0);
        this.Position = position;

        this.Bullets = [];

        this.Reload = 0;
        this.Health = 100;

        this.AngleControll = new Value(0, rotationSpeed);
    }

    //============ UPDATE ============
    public Update(timeDelta: number, tryToHitEvent: any): void {
        if (!this.IsDead()) {
            this.UpdateRotation(timeDelta);
        }
        this.ReloadingProccess(timeDelta);
        this.UpdateBullets(timeDelta, tryToHitEvent);
        this.ShootByGun();
        this.RemoveDeadBullets();
    }

    public ReloadingProccess(timeDelta: number): void {
        if (this.Reload > 0) {
            this.Reload -= timeDelta;
        }
    }

    public UpdateRotation(timeDelta: number): void {
        var toMouseDir = Data.I.Input.GetMousePosition().SUB(this.Position).Normalize();
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
    public Draw(): void {
        this.DrawBullets();
        this.DrawBackground();
        this.DrawGun();
    }

    public DrawBullets(): void {
        for (var item in this.Bullets) {
            this.Bullets[item].Draw();
        }
    }

    public DrawBackground(): void {
        Data.I.Draw.CircleFill(<FillCircleParams> {
            position: this.Position,
            radius: 20,
            origin: new Vector2(0, 0),
            color: Color4.ColorFromHex('#00FF00'),
            angle: this.AngleControll.GetVal()
        });
    }

    public DrawGun(): void {
        Data.I.Draw.RectFill(<FillRectParams> {
            position: this.Position,
            size: new Vector2(50, 10),
            origin: new Vector2(1, 0),
            color: Color4.ColorFromHex('#00FF00'),
            angle: this.AngleControll.GetVal()
        });

        Data.I.Draw.RectFill(<FillRectParams> {
            position: this.Position,
            size: new Vector2(5, 5),
            origin: new Vector2(0, 0),
            color: Color4.ColorFromHex('#FFFF00')
        });
    }

    public ShootByGun(): void {
        if (Data.I.Input.GetMouseState() == MouseState.Down && !this.IsDead()) {
            this.Shoot(Data.I.Input.GetMousePosition());
        }
    }

    public Shoot(point: Vector2): void {
        if (this.Reload <= 0) {
            this.Reload = Gun.RELOADINGPAUSE;
            var pos = this.Position;
            var power = Gun.DEMMAGEPOWER;
            var speed = 1000 + Data.I.Utils.RandF(-1, 1);

            this.Bullets.push(new Bullet(pos.ADD(this.Direction.MUL(40)), this.Direction, power, speed));
        }
    }
}
