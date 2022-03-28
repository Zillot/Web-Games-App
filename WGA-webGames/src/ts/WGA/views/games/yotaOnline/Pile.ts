import { CardColorType } from './card/CardColorType';
import { CardShapeType } from './card/CardShapeType';
import { Vector2Easing } from '../../../../core/engine/Vector2Easing';
import { JockerCard } from './card/JockerCard';
import { Card } from './card/Card';

export class Pile {
    static SHUFFLE_TIMES: number = 50;

    cardList: Card[];
    baseJokersCount: number;

    constructor(jokers: number) {
        this.baseJokersCount = jokers;
    }

    public Init(): Pile {
        this.cardList = [];

        for (var color: number = 0; color < 4; color++) {
            for (var shape: number = 0; shape < 4; shape++) {
                for (var number: number = 0; number < 4; number++) {
                    this.cardList.push(new Card(
                        number,
                        CardShapeType[CardShapeType[shape]],
                        CardColorType[CardColorType[color]]));
                }
            }
        }

        for (var joker = 0; joker < this.baseJokersCount; joker++) {
            this.cardList.push(new JockerCard());
        }

        this.shuffle();

        for (var card = 0; card < this.cardList.length; card++) {
            this.cardList[card].Position = new Vector2Easing(50, 120 + 6 * card);
            this.cardList[card].id = card;
        }

        return this;
    }

    public shuffle(): void {
        for (var i = 0; i < Pile.SHUFFLE_TIMES; i++) {
            this.cardList = this.cardList.sort(() => Math.random() - 0.5)
        }
    }

    public getPlayerCard() {
        var card = this.cardList[this.cardList.length - 1]
        var cardIndex = this.cardList.indexOf(card);

        this.cardList.splice(cardIndex, 1);

        return card;
    }

    public getStartingCard() {
        var onlyAceptable = this.cardList.filter(x => x.num != 4);
        var card = onlyAceptable[onlyAceptable.length - 1]
        var cardIndex = this.cardList.indexOf(card);

        this.cardList.splice(cardIndex, 1);

        return card;
    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        for (var card = 0; card < this.cardList.length; card++) {
            this.cardList[card].Update(timeDelta);
        }
    }

    //============ DRAW ============
    public Draw(): void {
        for (var card = 0; card < this.cardList.length; card++) {
            this.cardList[card].DrawHidden();
        }
    }
}
