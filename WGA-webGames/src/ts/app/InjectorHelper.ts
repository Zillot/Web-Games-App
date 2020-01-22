import { Injector } from "@angular/core";
import { Core } from '../core/services/Core';
import { WGAApp } from './WGAApp';
import { Draw } from '../core/services/Draw';
import { Events } from '../core/services/Events';
import { KeyboardInput } from '../core/services/KeyboardInput';
import { MouseInput } from '../core/services/MouseInput';

export class InjectorHelper {
    public static Injector = Injector.create({
        providers: [
            { provide: Events },
            { provide: MouseInput, deps: [Events] },
            { provide: KeyboardInput, deps: [Events] },
            { provide: Draw, deps: [] },
            { provide: WGAApp, deps: [Draw] },
            { provide: Core, deps: [WGAApp] },
        ]
    });
}
