/// <reference path="../../../../core/abstracts/WGAGame.ts"/>

module WGAAppModule {
    'use strict';

    export class Playground extends WGAGame {
        public circleSpeed: number;
        public circlePosition: Vector2;
        public circleDirection: Vector2;
        public platform1Position: Vector2;
        public platform2Position: Vector2;

        public platformWi: number;

        public col1: boolean;
        public col2: boolean;
        public col3: boolean;
        public col4: boolean;

        constructor() {
            super();
        }

        public Init(): void {
            PlaygroundUI.SetupUI(this.UiComponents);

            this.Restart();
            this.platform1Position = new Vector2(50, Setups.I.WindowHeight / 2);
            this.platform2Position = new Vector2(Setups.I.WindowWidth - 50, Setups.I.WindowHeight / 2);

            super.Init();
        }

        public Restart() {
            this.platformWi = 400;
            this.circleSpeed = 200;
            this.circlePosition = Setups.I.Center;
            this.circleDirection = new Vector2((Math.random() - 0.5) * 6, (Math.random() - 0.5) / 100).Normalize();
        }

        //============ UPDATE ============
        public Update(timeDelta: number): void {
            this.circleSpeed += timeDelta * 40;
            this.platformWi -= timeDelta * 2;

            this.circlePosition = this.circlePosition.ADD(this.circleDirection.MUL(timeDelta * this.circleSpeed));

            this.col1 = this.dirUpdate(this.platform1Position, this.col1, new Vector2(5, this.platformWi / 2), true);
            this.col2 = this.dirUpdate(this.platform2Position, this.col2, new Vector2(5, this.platformWi / 2), true);
            this.col3 = this.dirUpdate(new Vector2(Setups.I.WindowWidth / 2, -300), this.col3, new Vector2(Setups.I.WindowWidth, 300), false);
            this.col4 = this.dirUpdate(new Vector2(Setups.I.WindowWidth / 2, Setups.I.WindowHeight + 300), this.col4, new Vector2(Setups.I.WindowWidth, 300), false);

            if (this.circlePosition.X < -400 || this.circlePosition.X > Setups.I.WindowWidth + 400) {
                this.Restart();
            }

            if (Setups.I.Input.IsKeyActive(KeyCodes.UpArrow)) {
                if (this.platform2Position.Y > this.platformWi / 2) {
                    this.platform2Position = this.platform2Position.ADD(new Vector2(0, -1).MUL(timeDelta * 400));
                }
            }
            if (Setups.I.Input.IsKeyActive(KeyCodes.DownArrow)) {
                if (this.platform2Position.Y < Setups.I.WindowHeight - this.platformWi / 2) {
                    this.platform2Position = this.platform2Position.ADD(new Vector2(0, 1).MUL(timeDelta * 400));
                }
            }

            if (Setups.I.Input.IsKeyActive(KeyCodes.KeyW)) {
                if (this.platform1Position.Y > this.platformWi / 2) {
                    this.platform1Position = this.platform1Position.ADD(new Vector2(0, -1).MUL(timeDelta * 400));
                }
            }
            if (Setups.I.Input.IsKeyActive(KeyCodes.KeyS)) {
                if (this.platform1Position.Y < Setups.I.WindowHeight - this.platformWi / 2) {
                    this.platform1Position = this.platform1Position.ADD(new Vector2(0, 1).MUL(timeDelta * 400));
                }
            }
        }

        public dirUpdate(pos: Vector2, colMarker: boolean, platformSize: Vector2, xRefllect: boolean): boolean {
            var xColision = Math.abs(this.circlePosition.X - pos.X) < platformSize.X + 10;
            var yColision = Math.abs(this.circlePosition.Y - pos.Y) < platformSize.Y + 10;

            if (colMarker) {
                if (!xColision || !yColision) {
                    colMarker = false;
                }
                else {
                    return colMarker;
                }
            }

            if (xColision && yColision) {
                if (xRefllect) {
                    this.circleDirection = this.circleDirection.MUL(new Vector2(-1, 1));
                    this.circleDirection = this.circleDirection.RotateTo((Math.random() - 0.5) * 0.35);
                }
                else {
                    this.circleDirection = this.circleDirection.MUL(new Vector2(1, -1));
                }
            }

            return xColision && yColision;
        }

        //============ DRAW ============
        public Draw(): void {
            Setups.I.Draw.CircleFill(<FillCircleParams>{ color: Color4.Black, position: this.circlePosition, radius: 10 });
            Setups.I.Draw.RectFill(<FillRectParams>{ color: Color4.Green, position: this.platform1Position, size: new Vector2(10, this.platformWi) });
            Setups.I.Draw.RectFill(<FillRectParams>{ color: Color4.Red, position: this.platform2Position, size: new Vector2(10, this.platformWi) });

            Setups.I.Draw.TextFill(<TextParams>{ str: Math.floor(this.circleSpeed) + "", position: Setups.I.Center, fontSize: 100, color: Color4.Gray.GetTransparent(0.05), scale: 1 + (this.circleSpeed / 1000) * 2 });
        }
    }

}