import { StandartParams } from "./StandartParams";

export class TextParams extends StandartParams {
    public str: string;
    public fontName: string;
    public fontSize: number;

    constructor(params: StandartParams, fontName: string, fontSize: number) {
        super(params);
    }

    public static Normilize(item: TextParams): void {
        StandartParams.Normilize(item);
        if (item.str == null) { throw "str can not be null"; }
        if (item.fontName == null) { item.fontName = "serif" }
        if (item.fontSize == null) { item.fontSize = 10 }
    }
}
