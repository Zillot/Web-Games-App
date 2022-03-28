import { Card } from './card/Card';
import { Vector2 } from '../../../../core/engine/Vector2';
import { Pile } from './Pile';
import { Timeout } from '../../../../core/services/Timeout';
import { debug } from 'util';
import { EasingMode } from '../../../../core/engine/EasingMode';
import { Draw } from '../../../../core/services/Draw';
import { ValueEasing } from '../../../../core/engine/ValueEasing';
import { Color4 } from '../../../../core/engine/Color4';
import { FillRectParams } from '../../../../core/models/drawModels/FillRectParams';
import { TextParams } from '../../../../core/models/drawModels/TextParams';

export class Player {
    cardList: Card[];
    playerName: String;
    score: number;
    playerColor: Color4;

    scaleX: ValueEasing;
    fadeAway: ValueEasing;
    breath: ValueEasing;

    constructor(name: String, color: Color4) {
        this.scaleX = new ValueEasing(600, EasingMode.easeOutBack);
        this.scaleX.Pause()

        this.playerName = name;
        this.playerColor = color

        this.fadeAway = new ValueEasing(600, EasingMode.easeInCubic);
        this.fadeAway.Pause()

        this.breath = new ValueEasing(500, EasingMode.easeInOutCubic);
        this.breath.SetCallback(() => { this.RestartBreath() })

        Timeout.do(500, () => {
            this.scaleX.Play()
        })
    }

    public RestartBreath() {
        this.breath.SetCallback(() => { this.RestartBreath() })

        if (this.breath.GetVal() == 0) {
            this.breath.GoToOne()
        }
        else {
            this.breath.GoToZero()
        }
    }

    public Init(): Player {
        this.cardList = [];

        return this;
    }

    public DrawCardFromPile(pile: Pile, amount: number, me: boolean, postion: Vector2) {
        for (var i = 0; i < amount; i++) {
            let card = pile.getPlayerCard();

            card.Position.GoTo(postion, 800, EasingMode.easeInOutCubic, () => {
                card.Show()
            });

            if (me) {
                postion.ADDE(new Vector2(70, 0));
            }

            this.cardList.splice(0, 0, card);

            this.fadeAway.Restart();
        }
    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        this.scaleX.Update(timeDelta);
        this.fadeAway.Update(timeDelta);
        this.breath.Update(timeDelta);

        for (var card = 0; card < this.cardList.length; card++) {
            this.cardList[card].Update(timeDelta);
        }
    }

    //============ DRAW ============
    public DrawCards(): void {
        for (var card = 0; card < this.cardList.length; card++) {
            this.cardList[card].Draw();
        }
    }

    public DrawCardsForOponenet(position: Vector2) {
        for (var card = 0; card < this.cardList.length; card++) {
            this.cardList[card].DrawHidden(Vector2.Zero, 1 - this.fadeAway.GetVal());
        }
    }

    public DrawIcon(position: Vector2, yourTurn: boolean) {
        if (yourTurn) {
            Draw.I.RectFill(<FillRectParams>{ position: position, size: new Vector2(86, 36), scale: new Vector2(this.scaleX.GetVal() + 0.1 * this.breath.GetVal(), this.scaleX.GetVal() + 0.2 * this.breath.GetVal()), color: Color4.Tomato });
        }

        Draw.I.RectFill(<FillRectParams>{ position: position, size: new Vector2(80, 30), scale: new Vector2(this.scaleX.GetVal()), color: new Color4(200, 200, 200, 1) });
        Draw.I.RectFill(<FillRectParams>{ position: position.SUB(new Vector2(35 * this.scaleX.GetVal(), 0)), size: new Vector2(10, 30), scale: new Vector2(this.scaleX.GetVal()), color: this.playerColor });
        Draw.I.TextFill(<TextParams>{ str: `${this.playerName}`, scale: new Vector2(this.scaleX.GetVal(), 1), position: position.ADD(new Vector2(5 * this.scaleX.GetVal(), 0)), color: new Color4(0, 0, 0, 1), fontSize: 15 });
    }
}
