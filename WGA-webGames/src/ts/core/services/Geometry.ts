import { Vector2 } from "../engine/Vector2";
import { Rect } from "../engine/Rect";
import { Circle } from '../engine/Circle';

export class Geometry {
    public static IsPointInRect(point: Vector2, rect: Rect) {
        var onX = rect.Left < point.X && rect.Right > point.X;
        var onY = rect.Top < point.Y && rect.Bottom > point.Y;

        return onX && onY;
    }
    public static IsPointInCircle(point: Vector2, circle: Circle) {
        return Vector2.Distance(point, circle.Position) < circle.Radius;
    }

    public static IsRectsIntersect(rect1: Rect, rect2: Rect) {
        var onX = rect1.Left < rect2.Right && rect1.Right > rect2.Left;
        var onY = rect1.Top < rect2.Bottom && rect1.Bottom > rect2.Top;

        return onX && onY;
    }

    public static IsRectIntersectCirle(rect: Rect, circle: Circle) {
        var onX1 = Math.abs(rect.Left - circle.Position.X) <= circle.Radius;
        var onX2 = Math.abs(rect.Right - circle.Position.X) <= circle.Radius;
        var onY1 = Math.abs(rect.Top - circle.Position.Y) <= circle.Radius;
        var onY2 = Math.abs(rect.Bottom - circle.Position.Y) <= circle.Radius;

        var intersetWithEdges = onX1 || onX2 || onY1 || onY2;
        var isCircleInsideRect = Geometry.IsPointInRect(circle.Position, rect);

        return intersetWithEdges || isCircleInsideRect;
    }

    public static IsCirclesIntersect(circle1: Circle, circle2: Circle) {
        var actualDisance = Vector2.Distance(circle1.Position, circle2.Position);

        return actualDisance < (circle1.Radius + circle2.Radius);
    }

    public static CircleFromVector(position: Vector2, radius: number): Circle {
        return new Circle(position, radius);
    }

    public static CircleInnerFromRect(rect: Rect): Circle {
        var size = rect.GetSize();
        var maxSize = Math.min(size.X, size.Y);
        return new Circle(rect.GetCenter(), maxSize / 2);
    }

    public static CircleMiddleFromRect(rect: Rect): Circle {
        var size = rect.GetSize();
        var maxSize = Math.max(size.X, size.Y);
        return new Circle(rect.GetCenter(), maxSize / 2);
    }

    public static CircleOuterFromRect(rect: Rect): Circle {
        var diagonal = Vector2.Distance(new Vector2(rect.Left, rect.Top), new Vector2(rect.Right, rect.Bottom));
        return new Circle(rect.GetCenter(), diagonal / 2);
    }

    public static RectFromVectors(position: Vector2, size: Vector2): Rect {
        return new Rect(
            position.X,
            position.Y,
            position.X + size.X,
            position.Y + size.Y
        );
    }

    public static RectInnerFromCircle(circle: Circle): Rect {
        var halfSize = circle.Radius * 0.7071067811865475;
        return new Rect(
            circle.Position.X - halfSize,
            circle.Position.Y - halfSize,
            circle.Position.X + halfSize,
            circle.Position.Y + halfSize
        );
    }

    public static RectOuterFromCircle(circle: Circle): Rect {
        return new Rect(
            circle.Position.X - circle.Radius,
            circle.Position.Y - circle.Radius,
            circle.Position.X + circle.Radius,
            circle.Position.Y + circle.Radius
        );
    }
}
