import { Injectable } from '@angular/core';
import { WGAEventContainer } from "../../WGA/WGAEventContainer";

@Injectable()
export class Events {
    public static I: Events;
    public static _initialize = (() => {
        Events.I = new Events();
    })();

    private static eventsHandlers: WGAEventContainer[] = [];

    public constructor() {

    }

    public Initialize() {

    }

    public EventThrow(typeId: number, keyCode: number, keyChar: string): void {
        for (var eventKey in Events.eventsHandlers) {
            var event = Events.eventsHandlers[eventKey];

            try {
                if (event.Type == typeId && (event.KeyCode == null || event.KeyCode == keyCode)) {
                    event.Handler(keyCode, keyChar);
                }
                else {
                    break;
                }
            }
            catch (ex) {

            }
        }
    }
    public OnEvent(handler: any, name: string, typeId: number, keyCode: number): WGAEventContainer {
        this.RemoveHandler(name, typeId);

        Events.eventsHandlers.push(<WGAEventContainer>{
            Handler: handler,
            Name: name,
            Type: typeId,
            KeyCode: keyCode
        });

        return Events.eventsHandlers[Events.eventsHandlers.length - 1];
    }
    public RemoveHandlerByObj(handler: any): boolean {
        return this.RemoveHandler(handler.name, handler.type);
    }
    public RemoveHandler(name: string, typeId: number): boolean {
        var status = false;

        for (var i = 0; i < Events.eventsHandlers.length; i++) {
            var event = Events.eventsHandlers[i];

            if (event.Name == name && event.Type == typeId) {
                Events.eventsHandlers.splice(i, 1);
                status = true;
                break;
            }
        }

        return status;
    }
}
