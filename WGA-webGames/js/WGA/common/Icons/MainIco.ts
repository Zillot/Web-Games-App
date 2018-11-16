module WGAAppModule {
    'use strict';

    export class MainIco implements IUpdateable, IDrawable {
        public Position: Vector2;

        private speed: number;
        private cubes: number;
        private size: number;
        private direction: Vector2;

        private proccess: Value;
        private pointsTop: Vector2[];
        private pointsLeft: Vector2[];
        private pointsRight: Vector2[];

        constructor(position: Vector2, size: number, cubes: number, direction: Vector2, hp: number, speed: number, hitDistnace: number) {
            this.Position = position;
            this.speed = speed;

            this.proccess = new Value(0, 1);

            this.SetCubeData(size, cubes);
        }

        public SetCubeData(size: number, cubes: number) {
            this.cubes = cubes;
            this.size = size;

            var oneCubeSize = size / cubes;

            this.pointsTop = [
                new Vector2(0, 0),
                new Vector2(-oneCubeSize, -oneCubeSize / 2),
                new Vector2(0, -oneCubeSize),
                new Vector2(oneCubeSize, -oneCubeSize / 2),
            ];
            this.pointsLeft = [
                new Vector2(0, 0),
                new Vector2(0, oneCubeSize),
                new Vector2(-oneCubeSize, oneCubeSize / 2),
                new Vector2(-oneCubeSize, -oneCubeSize / 2),
            ];
            this.pointsLeft = [
                new Vector2(0, 0),
                new Vector2(oneCubeSize, -oneCubeSize / 2),
                new Vector2(oneCubeSize, oneCubeSize / 2),
                new Vector2(0, oneCubeSize),
            ];
        }

        public Update(timeDelta: number): void {
            this.proccess.Update(timeDelta);
        }

        public Draw(): void {
            var position = this.Position.SUB(this.direction.MUL(this.size));

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var cubePosition = position.ADD(this.direction.MUL(this.size).MUL(j));

                    Setups.I.Draw.PolygonFill(<FillPolygonParams> { color: new Color4(102, 153, 255, 1), position: cubePosition, points: this.pointsTop });
                    Setups.I.Draw.PolygonFill(<FillPolygonParams> { color: new Color4(51, 119, 255, 1), position: cubePosition, points: this.pointsLeft });
                    Setups.I.Draw.PolygonFill(<FillPolygonParams> { color: new Color4(255, 133, 102, 1), position: cubePosition, points: this.pointsRight });
                }

                position = position.ADD(this.direction.RotateTo(Math.PI / 2).MUL(this.size));
            }
        }
    }
}