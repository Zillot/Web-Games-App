module WGAAppModule {
    'use strict';

    export class Geometry {
        public IsPointInRect(point: Vector2, rect: Rect) {
            var onX = rect.Left < point.X && rect.Right > point.X;
            var onY = rect.Top < point.Y && rect.Bottom > point.Y;

            return onX && onY;
        }

        public IsRectsIntersect(rect1: Rect, rect2: Rect) {
            var onX = rect1.Left < rect2.Right && rect1.Right > rect2.Left;
            var onY = rect1.Top < rect2.Bottom && rect1.Bottom > rect2.Top;

            return onX && onY;
        }
    }
}