module WGAAppModelue {
    'use strict';

    export class Color4 {
        public R: number;
        public G: number;
        public B: number;
        public A: number;

        constructor(R: number, G: number, B: number, A: number) {
            this.R = R;
            this.G = G;
            this.B = B;
            this.A = A;
        }

        public GetInvertColor(): Color4 {
            return new Color4(255 - this.R, 255 - this.G, 255 - this.B, this.A);
        }

        public GetRgba(): string {
            return 'rgba(' + this.R + ', ' + this.G + ', ' + this.B + ', ' + this.A + ')';
        }

        public GetTransparent(opacity: number): Color4 {
            return new Color4(this.R, this.G, this.B, opacity);
        }

        public static ColorFromHex(hex: string): Color4 {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return new Color4(
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                1);
        }

        private static white: Color4;
        public static White(): Color4 {
            if (!Color4.white) {
                Color4.white = new Color4(255, 255, 255, 1);
            }
            return Color4.white;
        }

        private static black: Color4;
        public static Black(): Color4 {
            if (!Color4.black) {
                Color4.black = new Color4(0, 0, 0, 1);
            }
            return Color4.black;
        }

        private static gray: Color4;
        public static Gray(): Color4 {
            if (!Color4.gray) {
                Color4.gray = new Color4(100, 100, 100, 1);
            }
            return Color4.gray;
        }

        private static red: Color4;
        public static Red(): Color4 {
            if (!Color4.red) {
                Color4.red = new Color4(255, 64, 0, 1);
            }
            return Color4.red;
        }

        private static orange: Color4;
        public static Orange(): Color4 {
            if (Color4.orange == null) {
                Color4.orange = new Color4(255, 128, 1, 1);
            }
            return Color4.orange;
        }

        private static yellow: Color4;
        public static Yellow(): Color4 {
            if (Color4.yellow == null) {
                Color4.yellow = new Color4(255, 255, 0, 1);
            }
            return Color4.yellow;
        }

        private static green: Color4;
        public static Green(): Color4 {
            if (Color4.green == null) {
                Color4.green = new Color4(64, 255, 0, 1);
            }
            return Color4.green;
        }

        private static cyan: Color4;
        public static Cyan(): Color4 {
            if (Color4.cyan == null) {
                Color4.cyan = new Color4(0, 255, 255, 1);
            }
            return Color4.cyan;
        }

        private static blue: Color4;
        public static Blue() {
            if (Color4.blue == null) {
                Color4.blue = new Color4(0, 0, 255, 1);
            }
            return Color4.blue;
        }

        private static violet: Color4;
        public static Violet(): Color4 {
            if (Color4.violet == null) {
                Color4.violet = new Color4(191, 0, 255, 1);
            }
            return Color4.violet;
        }

        private static purple: Color4;
        public static Purple(): Color4 {
            if (Color4.purple == null) {
                Color4.purple = new Color4(255, 0, 191, 1);
            }
            return Color4.purple;
        }

        private static tomato: Color4;
        public static Tomato(): Color4 {
            if (Color4.tomato == null) {
                Color4.tomato = new Color4(230, 46, 0, 1);
            }
            return Color4.tomato;
        }
    }
}