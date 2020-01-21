import { Injector } from "@angular/core";
import { Core } from '../core/services/Core';
import { WGAApp } from './WGAApp';
import { Draw } from '../core/services/Draw';
import { Input } from '../core/services/Input';

export class InjectorHelper {
    public static Injector = Injector.create({
        providers: [
            { provide: Input, deps: [Draw] },
            { provide: Draw, deps: [] },
            { provide: WGAApp, deps: [Draw] },
            { provide: Core, deps: [WGAApp] },
        ]
    });
}
