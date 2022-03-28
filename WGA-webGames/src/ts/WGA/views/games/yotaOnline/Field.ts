import { Card } from './card/Card';
import { Vector2 } from '../../../../core/engine/Vector2';
import { Pile } from './Pile';
import { Timeout } from '../../../../core/services/Timeout';
import { Vector2Easing } from '../../../../core/engine/Vector2Easing';
import { debug } from 'util';
import { EasingMode } from '../../../../core/engine/EasingMode';

export class Field {
    cardList: Card[];
    position: Vector2;

    constructor() {

    }

    public Init(): Field {
        this.cardList = [];
        this.position = new Vector2(0, 0);

        return this;
    }

    public DrawCardFromPile(pile: Pile) {
        var card = pile.getStartingCard();

        card.Position.GoTo(new Vector2(420, 300), 800, EasingMode.easeInOutCubic, () => {
            card.Show()
        });

        this.cardList.push(card);
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
            this.cardList[card].Draw(this.position);
        }
    }
}
