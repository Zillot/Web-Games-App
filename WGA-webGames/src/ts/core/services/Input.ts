import { Injectable } from '@angular/core';
import { WGAEventContainer } from "../../WGA/WGAEventContainer";
import { Data } from "../../app/Data";
import { Vector2 } from "../engine/Vector2";
import { MouseState } from "../models/MouseState";
import { EventsTypes } from "../models/EventsTypes";
import { KeyCodes } from "../models/KeyCodes";
import { Draw } from './Draw';

import * as $ from 'jquery';

@Injectable()
export class Input {
    public static I: Input;
    public static _initialize = (() => {
        Input.I = new Input(null);
    })();

    private static mousePos: Vector2 = new Vector2();
    private static eventsHandlers: WGAEventContainer[] = [];

    private mouseDown: number;

    private enableEvent: boolean;

    public constructor(private _draw: Draw) {

    }

    public Initialize() {
        this.mouseDown = 0;

        var canvas = document.getElementById(Data.I.Camera.CanvasName);
        document.body.onmousedown = () => this.MouseDownFun(this);
        document.body.onmouseup = () => this.MouseUpFun(this);
        canvas.addEventListener('mousemove', evt => this.MouseMoveFun(this, canvas, evt), false);

        $(document).keydown((e: any) => {
            this.EventThrow(EventsTypes.KeyboardKeyPressed, e.key, e.char);
        });
    }

    public GetKeyCodeOfChar(char: string) {
        if (char.length != 1) {
            throw "input service error, length of char should only be 1 char";
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

    public MouseDownFun(those: Input): void {
        those.mouseDown++;
        if (those.mouseDown > 1) {
            those.mouseDown = 1;
        }

        those.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseDown, null);
    }
    public MouseUpFun(those: Input): void {
        those.mouseDown--;
        if (those.mouseDown < 0) {
            those.mouseDown = 0;
        }

        this.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseUp, null);
        this.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseClick, null);
    }
    public MouseMoveFun(those: Input, canvas: any, evt: any): void {
        var rect = canvas.getBoundingClientRect();
        Input.mousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    }

    public GetMouseState(): number {
        if (this.mouseDown == 0) {
            return MouseState.Up;
        }
        else if (this.mouseDown == 1) {
            return MouseState.Down;
        }
        else {
            return MouseState.Undefined;
        }
    }
    public PreventHandlers(): void {
        this.enableEvent = false;
    }
    public EventThrow(typeId: number, keyCode: number, keyChar: string): void {
        this.enableEvent = true;

        for (var eventKey in Input.eventsHandlers) {
            var event = Input.eventsHandlers[eventKey];

            try {
                if (this.enableEvent && event.Type == typeId && (event.KeyCode == null || event.KeyCode == keyCode)) {
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
    public GetMousePosition(): Vector2 {
        return Input.mousePos.SUB(Data.I.FrameOffset).MUL(Data.I.BackFrameScale);
    }
    public OnInputEvent(handler: any, name: string, typeId: number, keyCode: number): WGAEventContainer {
        this.RemoveHandler(name, typeId);

        Input.eventsHandlers.push(<WGAEventContainer>{
            Handler: handler,
            Name: name,
            Type: typeId,
            KeyCode: keyCode
        });

        return Input.eventsHandlers[Input.eventsHandlers.length - 1];
    }
    public RemoveHandlerByObj(handler: any): boolean {
        return this.RemoveHandler(handler.name, handler.type);
    }
    public RemoveHandler(name: string, typeId: number): boolean {
        var status = false;

        for (var i = 0; i < Input.eventsHandlers.length; i++) {
            var event = Input.eventsHandlers[i];

            if (event.Name == name && event.Type == typeId) {
                Input.eventsHandlers.splice(i, 1);
                status = true;
                break;
            }
        }

        return status;
    }
}
