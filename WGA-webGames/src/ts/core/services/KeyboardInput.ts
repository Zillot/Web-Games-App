import { Injectable } from '@angular/core';
import { EventsTypes } from "../models/EventsTypes";
import { Events } from './Events';
import { ConditionCheckFunction } from '../CallbackFunction';

@Injectable()
export class KeyboardInput {
    private _events: Events;

    public constructor(events: Events) {
        this._events = events;
    }

    public Initialize(): void {
        document.body.addEventListener("keydown", (e: KeyboardEvent) => {
            this._events.EventThrow(EventsTypes.KeyboardKeys, e.key);
        });
        document.body.addEventListener("keypress", (e: KeyboardEvent) => {
            this._events.EventThrow(EventsTypes.KeyboardKeys, e.key);
        });
        document.body.addEventListener("keyup", (e: KeyboardEvent) => {
            this._events.EventThrow(EventsTypes.KeyboardKeys, e.key);
        });
    }

    public GetKeyCodeOfChar(char: string): number {
        if (char.length != 1) {
            throw "KeyboardInput service error, length of char should only be 1 char";
        }

        var code = char.charCodeAt(0);

        if (code >= 48 && code <= 57) {
            return code;
        }

        if (code >= 97 && code <= 122) {
            return code - 32;
        }

        return -1;
    }

    public OnKeyboardEvent(handler: any, eventName: string, conditionCheck: ConditionCheckFunction, keyCodeOrChar: string): void {
        this._events.OnEvent(handler, eventName, conditionCheck, EventsTypes.KeyboardKeys, keyCodeOrChar);
    }

    public RemoveHandler(name: string): boolean {
        return this._events.RemoveHandler(name, EventsTypes.KeyboardKeys)
    }
}
