module WGAAppModule {
    'use strict';

    export class MainIco implements IUpdateable, IDrawable, IUiComponent {
        public Position: Vector2;

        public Name: string;

        private moveDistance: number;
        private speed: number;
        private cubes: number;
        private size: number;
        private leftRigthDir: Vector2;

        private proccess: Value;
        private pointsTop: Vector2[];
        private pointsLeft: Vector2[];
        private pointsRight: Vector2[];

        constructor(position: Vector2, size: number, cubes: number, speed: number) {
            this.Position = position;
            this.speed = speed;

            this.proccess = new Value(0, speed);
            this.startMoving();

            this.SetCubeData(size, cubes);
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

        public SetCubeData(size: number, cubes: number) {
            this.cubes = cubes;
            this.size = size;

            var oneCubeSize = size / cubes;
            this.moveDistance = oneCubeSize;

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
            var stepOffset = this.proccess.GetVal() * this.moveDistance;
            var upDownDir = this.leftRigthDir.RotateTo(Math.PI / 2);

            var position = this.getStartPosition(stepOffset, upDownDir)

            for (var i = 0; i < this.cubes; i++) {
                for (var j = 0; j < this.cubes; j++) {
                    //moving by X
                    var cubePosition = position
                        .ADD(this.leftRigthDir
                            .MUL(this.size * j * this.proccess.GetVal()))
                        .ADD(stepOffset);

                    this.drawCube(cubePosition);
                }

                //moving by Y
                position = position
                    .ADD(this.leftRigthDir.RotateTo(Math.PI / 2)
                        .MUL(this.size * this.proccess.GetVal()))
                    .ADD(stepOffset);
            }
        }

        private getStartPosition(stepOffset: number, upDownDir: Vector2) {
            //moving by X to the left
            var position = this.Position
                .SUB(this.leftRigthDir
                    .MUL(this.size * (this.cubes / 2)))
                .SUB(stepOffset * ((this.cubes / 2) - 1));

            //moving by Y to the top
            position = this.Position
                .SUB(upDownDir
                    .MUL(this.size * (this.cubes / 2) * this.proccess.GetVal()))
                .SUB(stepOffset * ((this.cubes / 2) - 1));

            return position;
        }

        private drawCube(cubePosition: Vector2) {
            Setups.I.Draw.PolygonFill(<FillPolygonParams>{ color: new Color4(102, 153, 255, 1), position: cubePosition, points: this.pointsTop });
            Setups.I.Draw.PolygonFill(<FillPolygonParams>{ color: new Color4(51, 119, 255, 1), position: cubePosition, points: this.pointsLeft });
            Setups.I.Draw.PolygonFill(<FillPolygonParams>{ color: new Color4(255, 133, 102, 1), position: cubePosition, points: this.pointsRight });
        }

        private startMoving() {
            this.proccess.GoTo(1, this.speed, this.endMoving);
        }

        private endMoving() {
            this.proccess.GoTo(0, this.speed, this.startMoving);
        }
    }
}