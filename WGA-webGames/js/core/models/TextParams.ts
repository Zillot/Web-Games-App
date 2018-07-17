module WGAAppModule {
    'use strict';

    export class TextParams extends StandartParams {
        public str: string;
        public fontName: string;
        public fontSize: number;

        constructor(params: StandartParams, fontName: string, fontSize: number) {
            super(params);
        }

        public Normilize(item: TextParams): void {
            StandartParams.Normilize(item);
            if (this.str == null) { throw "str can not be null"; }
            if (this.fontName == null) { this.fontName = "serif" }
            if (this.fontSize == null) { this.fontSize = 10 }
        }
    }
}