module WGAAppModule {
    'use strict';

    export class Input {
        private mousePos: Vector2;
        private mouseDown: number;

        private eventsHandlers: WGAEventContainer[];
        private enableEvent: boolean;

        constructor() {
            this.mousePos = new Vector2();
            this.eventsHandlers = [];

            this.mouseDown = 0;

            var canvas = document.getElementById(Setups.I.CanvasName);
            document.body.onmousedown = () => this.MouseDownFun(this);
            document.body.onmouseup = () => this.MouseUpFun(this);
            canvas.addEventListener('mousemove', evt => this.MouseMoveFun(this, canvas, evt), false);
        }

        public MouseDownFun(those: Input): void {
            those.mouseDown++;
            if (those.mouseDown > 1) {
                those.mouseDown = 1;
            }

            those.EventThrow(EventsTypes.leftMouseDown);
        }
        public MouseUpFun(those: Input): void {
            those.mouseDown--;
            if (those.mouseDown < 0) {
                those.mouseDown = 0;
            }
            this.EventThrow(EventsTypes.leftMouseUp);
            this.EventThrow(EventsTypes.leftMouseClick);
        }
        public MouseMoveFun(those: Input, canvas: any, evt: any): void {
            var rect = canvas.getBoundingClientRect();
            those.mousePos = new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
        }

        public GetMouseState(): number {
            if (this.mouseDown == 0) {
                return MouseState.up;
            }
            else if (this.mouseDown == 1) {
                return MouseState.down;
            }
            else {
                return MouseState.undefined;
            }
        }
        public PreventHandlers(): void {
            this.enableEvent = false;
        }
        public EventThrow(typeId: number): void {
            this.enableEvent = true;

            for (var eventKey in this.eventsHandlers) {
                var event = this.eventsHandlers[eventKey];

                try {
                    if (this.enableEvent && event.Type == typeId) {
                        event.Handler();
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
            return this.mousePos.SUB(Setups.I.FrameRealOffset).MUL(Setups.I.BackFrameScale);
        }
        public OnInputEvent(handler: any, name: string, typeId: number): WGAEventContainer {
            this.RemoveHandler(name, typeId);

            this.eventsHandlers.push(<WGAEventContainer>{
                Handler: handler,
                Name: name,
                Type: typeId
            });

            return this.eventsHandlers[this.eventsHandlers.length - 1];
        }
        public RemoveHandlerByObj(handler: any): boolean {
            return this.RemoveHandler(handler.name, handler.type);
        }
        public RemoveHandler(name: string, typeId: number): boolean {
            var status = false;

            for (var i = 0; i < this.eventsHandlers.length; i++) {
                var event = this.eventsHandlers[i];

                if (event.Name == name && event.Type == typeId) {
                    this.eventsHandlers.splice(1, i);
                    status = true;
                }
            }

            return status;
        }
    }
}