/// <reference path="../../../core/abstracts/Page.ts"/>

module WGAAppModule {
    'use strict';

    export class CollisionTest extends Page {
        public Rects: Rect[];
        
        constructor() {
            super();
        }

        public Init(): void {
            this.Rects = [];

            for (var i = 0; i < 30; i++) {
                var x = Setups.I.Utils.RandI(50, Setups.I.WindowWidth - 50);
                var y = Setups.I.Utils.RandI(50, Setups.I.WindowHeight - 50);

                var width = Setups.I.Utils.RandI(10, 50);
                var height = Setups.I.Utils.RandI(10, 50);

                this.Rects.push(new Rect(x, y, x + width, y + height));
            }

            super.Init();
        }

        public Update(timeDelta: number): void {
            super.Update(timeDelta);

            this.Rects[0].SetPositionFromCenter(Setups.I.Input.GetMousePosition());

            this.checkRectsIntersections();
        }

        public checkRectsIntersections() {
            for (var i = 0; i < this.Rects.length; i++) {
                var rect1 = this.Rects[i];

                for (var j = i + 1; j < this.Rects.length; j++) {
                    var rect2 = this.Rects[j];

                    var intersect = Setups.I.Geometry.IsRectsIntersect(rect1, rect2);

                    if (intersect) {
                        (<any>rect1).intersect = true;
                        (<any>rect2).intersect = true;
                    }
                }
            }
        }

        public Draw(): void {
            this.DrawRectangles();
            super.Draw();
        }

        public DrawRectangles(): void {
            for (var rectKey in this.Rects) {
                var rect: Rect = this.Rects[rectKey];

                var color = Color4.Black;
                if ((<any>rect).intersect) {
                    var color = Color4.Red;
                }

                Setups.I.Draw.RectStroke(<StrokeRectParams>{ position: rect.GetCenter(), size: rect.GetSize(), color: color, thickness: 1 });
            }
        }
    }
}