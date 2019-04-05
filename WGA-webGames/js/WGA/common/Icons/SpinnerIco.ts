module WGAAppModule {
    'use strict';

    export class SpinnerIco implements IUpdateable, IDrawable, IUiComponent {
        public Position: Vector2;

        public Name: string;

        private moveDistance: number;
        private speed: number;
        private circles: number;
        private radius: number;

        private proccess: Value;
        private pointsTop: Vector2[];
        private pointsLeft: Vector2[];
        private pointsRight: Vector2[];

        constructor(position: Vector2, radius: number, circles: number, speed: number) {
            this.Position = position;
            this.speed = speed;
            this.radius = radius;
            this.circles = circles;

            this.proccess = new Value(0, speed);
            this.startMoving(this);
        }

        public Init(): void {

        }

        public Dispose(): void {

        }

        public Pause() {
            this.proccess.Pause();
        }

        public Play() {
            this.proccess.Play();
        }

        public Update(timeDelta: number): void {
            this.proccess.Update(timeDelta);
        }

        public Draw(): void {
            var count = Math.floor(this.circles / 3);
            var min = 0.75 / count;
            var step = min;
            var max = min + step * count;

            var stepOffset = this.proccess.GetVal() * this.moveDistance;

            var position = this.Position;
            var rotateStep = ((Math.PI * 2) / this.circles);

            var direction = Vector2.Up.RotateTo(-rotateStep * count + rotateStep * this.proccess.GetVal());

            for (var j = 0; j < this.circles; j++) {
                //moving by X
                var cubePosition = position.ADD(direction.MUL(this.radius));

                var additional = this.proccess.GetVal() * step;

                var scale = 0;
                if (j < count) {
                    scale = min + j * step + additional;
                }
                else if (j == count) {
                    scale = max - additional;
                }
                else {
                    scale = max - (j - count) * step - additional;
                }

                scale = scale < 0.3 ? 0.3 : scale;
                Setups.I.Draw.CircleFill(<FillCircleParams>{ color: Color4.Blue, radius: this.radius / (this.circles / 3), scale: scale, position: cubePosition });
                direction = direction.RotateTo(rotateStep);
            }
        }

        private startMoving(those) {
            those.proccess.GoTo(1, those.speed, () => {
                those.endMoving(those);
            });
        }

        private endMoving(those) {
            those.proccess.SetValue(0);
            those.startMoving(those);
            //those.proccess.GoTo(0, those.speed, () => {
           //     those.startMoving(those);
            //});
        }
    }
}