import { Injectable } from '@angular/core';
import { Data } from "../../app/Data";
import { Vector2 } from "../engine/Vector2";
import { MouseState } from "../models/MouseState";
import { EventsTypes } from "../models/EventsTypes";
import { KeyCodes } from "../models/KeyCodes";
import { Events } from './Events';

@Injectable()
export class MouseInput {
    private static mousePos: Vector2 = new Vector2();
    private static mouseDown: number;

    private _events: Events;

    public constructor(events: Events) {
        this._events = events;
    }

    public Initialize() {
        MouseInput.mouseDown = 0;

        var canvas = document.getElementById(Data.I.Camera.CanvasName);
        document.body.onmousedown = () => this.MouseDownFun(this, this._events);
        document.body.onmouseup = () => this.MouseUpFun(this, this._events);
        canvas.addEventListener('mousemove', evt => this.MouseMoveFun(this, canvas, evt), false);
    }

    private MouseDownFun(_mouseInput: MouseInput, _events: Events): void {
        MouseInput.mouseDown++;
        if (MouseInput.mouseDown > 1) {
            MouseInput.mouseDown = 1;
        }

        _events.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseDown, null);
    }
    private MouseUpFun(_mouseInput: MouseInput,_events: Events): void {
        MouseInput.mouseDown--;
        if (MouseInput.mouseDown < 0) {
            MouseInput.mouseDown = 0;
        }

        _events.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseUp, null);
        _events.EventThrow(EventsTypes.MouseButtonPressed, KeyCodes.LeftMouseClick, null);
    }
    private MouseMoveFun(those: MouseInput, canvas: any, evt: any): void {
        var rect = canvas.getBoundingClientRect();
        MouseInput.mousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
    }

    public static GetMouseState(): number {
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

    public static GetMousePosition(): Vector2 {
        return MouseInput.mousePos.SUB(Data.I.FrameOffset).MUL(Data.I.BackFrameScale);
    }
}
