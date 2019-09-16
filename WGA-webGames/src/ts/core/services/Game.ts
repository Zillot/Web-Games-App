import { Vector2 } from "../engine/Vector2";
import { Data } from "../../app/Setups";
import { TextParams } from "../models/TextParams";
import { FillRectParams } from "../models/FillRectParams";
import { Color4 } from "../engine/Color4";
import { Value } from "../engine/Value";

export class Game {
    private level: number;
    private scoreGoal: number;
    private scoreCurrent: number;

    private money: Value;
    private score: Value;
    private health: Value;

    public NextLevelEvent: any;
    public GameOverEvent: any;

    constructor(scoreGoal: number, health: number) {
        this.level = 1;
        this.scoreGoal = scoreGoal;
        this.scoreCurrent = 0;

        this.money = new Value(0, 1);
        this.score = new Value(0, 1);
        this.health = new Value(0, 1);
    }

    //start getters
    public get Level() {
        return this.level;
    }

    public get Money() {
        return this.money;
    }

    public get Score() {
        return this.score;
    }

    public get Health() {
        return this.health;
    }
    //end getters

    public Hit(amount: number) {
        var health = this.health.GetGoalVal();
        if (health == 0) {
            return;
        }

        var health = this.health.GoToDelta(-amount);

        if (health < 0) {
            this.health.GoToDelta(0);
        }

        if (health == 0 && this.GameOverEvent) {
            this.GameOverEvent();
        }
    }

    public AddScore(amount: number) {
        this.score.GoToDelta(amount);
    }
    public SubScore(amount: number) {
        this.score.GoToDelta(-amount);
    }

    public Update(timeDelta: number) {
        this.score.Update(timeDelta);

        if (this.scoreCurrent >= this.scoreGoal) {
            this.scoreGoal = this.scoreGoal * 3;
            this.level++;

            if (this.NextLevelEvent) {
                this.NextLevelEvent();
            }
        }
    }

    public IsPlayerDead() {
        return this.health.GetVal() <= 0;
    }

    public Draw(additionalDraw?: any) {
        Data.I.Draw.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Data.I.WindowWidth, 60), origin: new Vector2(1, 1), color: new Color4(0, 0, 0, 0.1) });

        Data.I.Draw.TextFill(<TextParams>{ str: "Level: " + this.level, position: new Vector2(Data.I.Center.X, 5), color: Color4.Gray, fontName: "serif", fontSize: 30, origin: new Vector2(0, -1) });
        Data.I.Draw.TextFill(<TextParams>{ str: "Score: " + this.score.GetVal, position: new Vector2(Data.I.Center.X, 35), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(0, -1) });
        Data.I.Draw.TextFill(<TextParams>{ str: this.money.GetVal() + " :Money", position: new Vector2(Data.I.WindowWidth - 10, 7), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });
        Data.I.Draw.TextFill(<TextParams>{ str: this.health.GetVal() + " :Health", position: new Vector2(Data.I.WindowWidth - 10, 33), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });

        if (additionalDraw) {
            additionalDraw();
        }
    }
}
