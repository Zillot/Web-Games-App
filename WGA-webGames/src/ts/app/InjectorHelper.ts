import { Injector } from "@angular/core";
import { Core } from '../core/services/Core';
import { WGAApp } from './WGAApp';
import { Draw } from '../core/services/Draw';
import { Events } from '../core/services/Events';
import { KeyboardInput } from '../core/services/KeyboardInput';
import { MouseInput } from '../core/services/MouseInput';
import { Pages } from '../core/services/Pages';

export class InjectorHelper {
    public static Injector = Injector.create({
        providers: [
            { provide: Pages, deps: [] },
            { provide: Events, deps: [] },
            { provide: Draw, deps: [] },
            { provide: MouseInput, deps: [Events] },
            { provide: KeyboardInput, deps: [Events] },
            { provide: WGAApp, deps: [Draw, Pages] },
            { provide: Core, deps: [WGAApp] },
        ]
    });
}
