import { Page } from "../../../core/abstracts/Page";
import { Data } from "../../../app/Data";
import { Color4 } from "../../../core/engine/Color4";
import { Rect } from "../../../core/engine/Rect";
import { StrokeRectParams } from "../../../core/models/drawModels/StrokeRectParams";
import { CollisionTestUI } from "./CollisionTest.ui";
import { Utils } from 'src/ts/core/services/Utils';
import { Geometry } from 'src/ts/core/services/Geometry';
import { Draw } from 'src/ts/core/services/Draw';
import { MouseInput } from 'src/ts/core/services/MouseInput';

export class CollisionTest extends Page {
    public Rects: Rect[];

    constructor(_draw: Draw) {
        super(_draw);

        CollisionTestUI.SetupUI(this.UiComponents);
    }

    public Init(): void {
        this.Rects = [];

        for (var i = 0; i < 30; i++) {
            var x = Utils.RandI(50, Data.I.WindowSize.X - 50);
            var y = Utils.RandI(50, Data.I.WindowSize.Y - 50);

            var width = Utils.RandI(10, 100);
            var height = Utils.RandI(10, 100);

            this.Rects.push(new Rect(x, y, x + width, y + height));
        }

        super.Init();
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        this.Rects[0].SetPositionFromCenter(MouseInput.GetMousePosition());

        this.checkRectsIntersections();
    }

    public checkRectsIntersections() {
        for (var rectKey in this.Rects) {
            (<any>this.Rects[rectKey]).intersect = false;
        }

        for (var i = 0; i < this.Rects.length; i++) {
            var rect1 = this.Rects[i];

            for (var j = i + 1; j < this.Rects.length; j++) {
                var rect2 = this.Rects[j];

                var intersect = Geometry.IsRectsIntersect(rect1, rect2);

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

            this._draw.RectStroke(<StrokeRectParams>{ position: rect.GetCenter(), size: rect.GetSize(), color: color, thickness: 1 });
        }
    }
}
