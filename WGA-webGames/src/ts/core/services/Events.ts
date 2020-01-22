import { Injectable } from '@angular/core';
import { WGAEventContainer } from 'src/ts/WGA/WGAEventContainer';
import { ConditionCheckFunction } from '../CallbackFunction';

@Injectable()
export class Events {
    public static I: Events;
    public static _initialize = (() => {
        Events.I = new Events();
    })();

    private static eventsHandlers: WGAEventContainer[] = [];

    private preventNextEvent: boolean;

    public constructor() {

    }

    public Initialize() {

    }

    public PreventNextEvent() {
        this.preventNextEvent = true;
    }

    public EventThrow(typeId: string, eventId: string): boolean {
        this.preventNextEvent = false;

        for (var eventKey in Events.eventsHandlers) {
            var event = Events.eventsHandlers[eventKey];

            try {
                if (event.Type == typeId && event.EventId == eventId && (event.ConditionCheck == null || event.ConditionCheck())) {
                    event.Handler(eventId);

                    if (this.preventNextEvent) {
                        return true;
                    }
                }
            }
            catch { }
        }

        return false;
    }
    public OnEvent(handler: any, name: string, conditionCheck: ConditionCheckFunction, typeId: string, eventId: string): WGAEventContainer {
        this.RemoveHandler(name, typeId);

        Events.eventsHandlers.push(<WGAEventContainer> {
            Handler: handler,
            ConditionCheck: conditionCheck,
            Name: name,
            Type: typeId,
            EventId: eventId
        });

        return Events.eventsHandlers[Events.eventsHandlers.length - 1];
    }
    public RemoveHandlerByObj(handler: any): boolean {
        return this.RemoveHandler(handler.name, handler.type);
    }
    public RemoveHandler(name: string, typeId: string): boolean {
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
