import { EasingMode } from "./EasingMode";

export class Easing {
    private easingMode: EasingMode;
    private easingFun: any;

    constructor(easingMode: EasingMode) {
        if (Easing.easingList == null) {
            Easing.easingList = [];
            Easing.easingList[EasingMode.linear] = Easing.linear;

            Easing.easingList[EasingMode.easeOutCubic] = Easing.easeOutCubic;
            Easing.easingList[EasingMode.easeInOutCubic] = Easing.easeInOutCubic;
            Easing.easingList[EasingMode.easeInCubic] = Easing.easeInCubic;

            Easing.easingList[EasingMode.easeInBack] = Easing.easeInBack;
            Easing.easingList[EasingMode.easeOutBack] = Easing.easeOutBack;
            Easing.easingList[EasingMode.easeInOutBack] = Easing.easeInOutBack;
        }

        this.easingFun = Easing.easingList[easingMode];
    }

    public getValue(x) {
        return this.easingFun(x);
    }

    private static easingList: any[];

    private static linear(x: number): number {
        return x;
    }

    private static easeInCubic(x: number): number {
        return x * x * x;
    }

    private static easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3);
    }

    private static easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    private static easeInBack(x: number): number {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return c3 * x * x * x - c1 * x * x;
    }

    private static easeOutBack(x: number): number {
        const c1 = 1.70158;
        const c3 = c1 + 1;

        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    private static easeInOutBack(x: number): number {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;

        return x < 0.5
            ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    }
}
