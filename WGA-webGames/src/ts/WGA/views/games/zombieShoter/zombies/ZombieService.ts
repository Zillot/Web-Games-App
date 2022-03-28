import { Utils } from 'src/ts/core/services/Utils';
import { Vector2 } from 'src/ts/core/engine/Vector2';
import { Data } from 'src/ts/app/Data';
import { Game } from 'src/ts/core/services/Game';
import { Zombie } from './models/Zombie';
import { ZombieBasic } from './models/ZombieBasic';
import { ZombieHeavy } from './models/ZombieHeavy';
import { ZombieSwat } from './models/ZombieSwat';
import { ZombieDog } from './models/ZombieDog';
import { Draw } from 'src/ts/core/services/Draw';

export class ZombieService {
    public Zombies: Zombie[];

    private maxZombies: number;
    private zombieSpawnPause: number;

    private GetZombieHp: any;
    private GetZombieSpeed: any;
    private GetZombiePosition: any;

    private game: Game;

    private spawnChances = [
        { key: "basic", value: 25 },
        { key: "dog", value: 25 },
        { key: "heavy", value: 25 },
        { key: "swat", value: 25 }
    ];

    constructor(game: Game) {
        this.game = game;

        this.RestartGame();

        //value formulas
        this.GetZombieHp = () => { return 500 * this.game.Level; }
        this.GetZombieSpeed = () => { return 50 * (this.game.Level / 2); }
        this.GetZombiePosition = () => { return new Vector2(-40, Utils.RandI(100, Data.I.WindowSize.Y - 100)); }
    }

    public RestartGame(): void {
        this.Zombies = [];

        this.maxZombies = 4;
        this.zombieSpawnPause = 2;
    }

    //============ UPDATE ============
    public Update(timeDelta: number): void {
        this.UpdateSpawnLogic(timeDelta);
        this.UpdateZombies(timeDelta);
    }

    public UpdateZombies(timeDelta: number): void {
        for (var zombieKey in this.Zombies) {
            var zombie = this.Zombies[zombieKey];

            zombie.Update(timeDelta);

            if (zombie.NotOnTheGameField()) {
                zombie.MarkToBeRemoved();
                this.game.SubScore(5);
                this.game.Hit(zombie.Power * 5);
            }

            this.RemoveDeadZombie(zombie);
        }
    }

    public UpdateSpawnLogic(timeDelta: number): void {
        if (this.Zombies.length < this.maxZombies && this.zombieSpawnPause <= 0) {
            this.SpawnZombie();
            this.zombieSpawnPause = 4 / this.game.Level;
        }

        if (this.zombieSpawnPause > 0) {
            this.zombieSpawnPause -= timeDelta;
        }
    }

    public RemoveDeadZombie(zombie: Zombie): void {
        if (zombie.ShouldBeRemoved()) {
            var index = this.Zombies.indexOf(zombie);
            this.Zombies.splice(index, 1);
        }
    }

    public NextLevelHandler() {
        this.maxZombies += (2 * this.game.Level);
    }

    public SpawnZombie(): void {
        var pos = this.GetZombiePosition();
        var hp = this.GetZombieHp();
        var speed = this.GetZombieSpeed();

        var selection = "";

        var number = Math.random() * 100;
        var buffer = 0;

        for (var spawnChance in this.spawnChances) {
            if (number > buffer && number <= buffer + this.spawnChances[spawnChance].value) {
                selection = this.spawnChances[spawnChance].key;
                break;
            }

            buffer += this.spawnChances[spawnChance].value;
        }

        switch (selection) {
            case "basic": this.Zombies.push(new ZombieBasic(pos, hp, speed)); break;
            case "dog": this.Zombies.push(new ZombieDog(pos, hp, speed)); break;
            case "heavy": this.Zombies.push(new ZombieHeavy(pos, hp, speed)); break;
            case "swat": this.Zombies.push(new ZombieSwat(pos, hp, speed)); break;
        }
    }

    //============ DRAW ============
    public Draw(draw: Draw): void {
        for (var zombiesKey in this.Zombies) {
            this.Zombies[zombiesKey].Draw(draw);
        }
    }
}
