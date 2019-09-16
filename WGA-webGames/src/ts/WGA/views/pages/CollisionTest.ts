import { Page } from "../../../core/abstracts/Page";
import { Data } from "../../../app/Setups";
import { Color4 } from "../../../core/engine/Color4";
import { Rect } from "../../../core/engine/Rect";
import { StrokeRectParams } from "../../../core/models/StrokeRectParams";
import { CollisionTestUI } from "./CollisionTest.ui";

export class CollisionTest extends Page {
    public Rects: Rect[];

    constructor() {
        super();

        CollisionTestUI.SetupUI(this.UiComponents);
    }

    public Init(): void {
        this.Rects = [];

        for (var i = 0; i < 30; i++) {
            var x = Data.I.Utils.RandI(50, Data.I.WindowWidth - 50);
            var y = Data.I.Utils.RandI(50, Data.I.WindowHeight - 50);

            var width = Data.I.Utils.RandI(10, 100);
            var height = Data.I.Utils.RandI(10, 100);

            this.Rects.push(new Rect(x, y, x + width, y + height));
        }

        super.Init();
    }

    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        this.Rects[0].SetPositionFromCenter(Data.I.Input.GetMousePosition());

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

                var intersect = Data.I.Geometry.IsRectsIntersect(rect1, rect2);

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

            Data.I.Draw.RectStroke(<StrokeRectParams>{ position: rect.GetCenter(), size: rect.GetSize(), color: color, thickness: 1 });
        }
    }
}
