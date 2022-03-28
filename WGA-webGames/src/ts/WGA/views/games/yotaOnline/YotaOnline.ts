import { Game } from "../../../../core/services/Game";
import { GamePage } from "../../../../core/abstracts/GamePage";
import { Player } from './Player';
import { Pile } from './Pile';
import { Field } from './Field';
import { Timeout } from '../../../../core/services/Timeout';
import { Vector2 } from '../../../../core/engine/Vector2';
import { Color4 } from '../../../../core/engine/Color4';
import { Draw } from '../../../../core/services/Draw';
import { timeout } from 'q';
import { FillRectParams } from '../../../../core/models/FillRectParams';

export class YotaOnline extends GamePage {
    pile: Pile;
    field: Field;
    players: Player[];
    me: Player;
    activePlayer: number;

    constructor() {
        super();
    }

    public Init(): void {
        this.players = [];
        this.RestartGame();
        super.Init();

        this.activePlayer = 0;

        /* TEMP */
        Timeout.do(1000, () => {
            this.joinGame(new Player("Player1", Color4.Black), true)

            Timeout.do(500, () => {
                this.joinGame(new Player("Player2", Color4.Blue), false)

                Timeout.do(500, () => {
                    this.joinGame(new Player("Player3", Color4.Purple), false)

                    Timeout.do(500, () => {
                        this.joinGame(new Player("Player4", Color4.Gray), false)

                        Timeout.do(500, () => {
                            this.joinGame(new Player("Player5", Color4.Cyan), false)

                            Timeout.do(500, () => {
                                this.joinGame(new Player("Player6", Color4.DarkGreen), false)
                            });
                        });
                    });
                });
            });
        })
    }

    public joinGame(player: Player, me: boolean) {
        player.Init();
        this.players.push(player);

        var position = new Vector2(60 + 100 * (this.players.length - 1), 30)

        if (me) {
            this.me = player;
            var position = new Vector2(300, 550)
        }

        player.DrawCardFromPile(this.pile, 4, me, position);
    }

    public RestartGame(): void {
        this.pile = new Pile(2).Init();
        this.field = new Field().Init();

        Timeout.do(500, () => {
            this.field.DrawCardFromPile(this.pile);
        })
    }

    public GameOverHandler() {
        
    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        super.Update(timeDelta);

        for (var player = 0; player < this.players.length; player++) {
            this.players[player].Update(timeDelta);
        }

        this.pile.Update(timeDelta);
        this.field.Update(timeDelta);
    }

    //============ DRAW ============
    public Draw(): void {
        super.Draw();

        Draw.I.FillScreen(Color4.White);

        this.pile.Draw();
        this.field.Draw();

        for (var player = 0; player < this.players.length; player++) {
            this.players[player].DrawIcon(new Vector2(60 + 100 * player, 30), this.activePlayer == player);
            if (this.players[player] != this.me) {
                this.players[player].DrawCardsForOponenet(new Vector2(60 + 100 * player, 30));
            }
        }

        if (this.me != null) {
            this.me.DrawCards();
        }
    }
}
