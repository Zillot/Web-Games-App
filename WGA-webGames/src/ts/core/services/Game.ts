import { Vector2 } from "../engine/Vector2";
import { Data } from "../../app/Data";
import { TextParams } from "../models/TextParams";
import { FillRectParams } from "../models/FillRectParams";
import { Color4 } from "../engine/Color4";
import { Value } from "../engine/Value";
import { Draw } from './Draw';

export class Game {
    private level: number;
    private scoreGoal: number;
    private nextLevelCost: number;

    private money: Value;
    private score: Value;
    private health: Value;

    public NextLevelEvent: any;
    public NextLevelBecomeAvailableChangedEvent: any;
    public GameOverEvent: any;

    constructor() {
        if (this.NextLevelBecomeAvailableChangedEvent) {
            this.NextLevelBecomeAvailableChangedEvent(this.NextLevelAvailable);
        }
    }

    public RestartGame(scoreGoal: number, health: number): void {
        this.level = 1;
        this.scoreGoal = scoreGoal;

        this.money = new Value(0, 100);
        this.score = new Value(0, 50);
        this.health = new Value(health, 50);

        this.nextLevelCost = 0;
    }

    //start getters
    public get Level(): number {
        return this.level;
    }

    public get Money(): number {
        return this.money.GetGoalVal();
    }

    public get Score(): number {
        return this.score.GetGoalVal();
    }

    public get Health(): number {
        return this.health.GetGoalVal();
    }

    public get NextLevelAvailable(): boolean {
        return this.nextLevelCost <= this.money.GetVal() && this.score.GetVal() >= this.scoreGoal;
    }
    //end getters

    public BuyNextLevel(): void  {
        if (this.NextLevelAvailable) {
            this.scoreGoal = this.scoreGoal * 3;
            this.level++;

            this.nextLevelCost = this.nextLevelCost * 2;

            if (this.NextLevelEvent) {
                this.NextLevelEvent();
            }
        }
    }

    public Hit(amount: number) {
        var health = this.health.GetGoalVal();
        if (health == 0) {
            return;
        }

        var health = this.health.GoToDeltaWithGoal(-amount);

        if (health < 0) {
            this.health.GoTo(0);
        }

        if (health == 0 && this.GameOverEvent) {
            this.GameOverEvent();
        }
    }

    public AddScore(amount: number) {
        var state = this.NextLevelAvailable;

        if (this.score.GetGoalVal() + amount > this.scoreGoal) {
            this.score.GoTo(this.scoreGoal);
        }
        else {
            this.score.GoToDeltaWithGoal(amount);
        }

        if (state != this.NextLevelAvailable && this.NextLevelBecomeAvailableChangedEvent) {
            this.NextLevelBecomeAvailableChangedEvent(this.NextLevelAvailable);
        }
    }
    public SubScore(amount: number) {
        this.score.GoToDeltaWithGoal(-amount);
    }

    public Update(timeDelta: number) {
        var state = this.NextLevelAvailable;

        this.score.Update(timeDelta);
        this.money.Update(timeDelta);
        this.health.Update(timeDelta);

        if (state != this.NextLevelAvailable && this.NextLevelBecomeAvailableChangedEvent) {
            this.NextLevelBecomeAvailableChangedEvent(this.NextLevelAvailable);
        }
    }

    public IsPlayerDead() {
        return this.health.GetVal() <= 0;
    }

    private GetWithAcuracy(value: number, numberAcuracy: number): string {
        return value.toFixed(numberAcuracy);
    }

    public Draw(additionalDraw?: any) {
        Draw.I.RectFill(<FillRectParams>{ position: new Vector2(0, 0), size: new Vector2(Data.I.WindowSize.X, 60), origin: new Vector2(1, 1), color: new Color4(0, 0, 0, 0.1) });

        Draw.I.TextFill(<TextParams>{ str: "Level: " + this.level, position: new Vector2(Data.I.Center.X, 5), color: Color4.Gray, fontName: "serif", fontSize: 30, origin: new Vector2(0, -1) });
        Draw.I.TextFill(<TextParams>{ str: this.nextLevelCost.toString(), position: new Vector2(Data.I.Center.X, 75), color: Color4.Gray.GetTransparent(0.5), fontName: "serif", fontSize: 12, origin: new Vector2(0, -1) });
        Draw.I.TextFill(<TextParams>{ str: "Score: " + this.GetWithAcuracy(this.score.GetVal(), 0) + "/" + this.scoreGoal, position: new Vector2(Data.I.Center.X, 35), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(0, -1) });
        Draw.I.TextFill(<TextParams>{ str: "Money: " + this.GetWithAcuracy(this.money.GetVal(), 0), position: new Vector2(Data.I.Center.X, 55), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(0, -1) });
        Draw.I.TextFill(<TextParams>{ str: this.GetWithAcuracy(this.health.GetVal(), 0) + " :Health", position: new Vector2(Data.I.WindowSize.X - 10, 33), color: Color4.Gray, fontName: "serif", fontSize: 18, origin: new Vector2(1, -1) });

        if (additionalDraw) {
            additionalDraw();
        }
    }
}
