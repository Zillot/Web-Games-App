/// <reference path="../../../core/ui/Button.ts"/>
/// <reference path="../../../core/engine/Color4.ts"/>
/// <reference path="../../../core/engine/Vector2.ts"/>
/// <reference path="../../../app/Setups.ts"/>

module WGAAppModule {
    'use strict';

    export class CameraTestUI {
        public static upButton: Button;
        public static get UpButton() {
            if (this.upButton == null) {
                this.upButton = Button.GetButton({
                    name: "upButton",
                    text: "up",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraPosition();
                        Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(0, -100)));
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 20),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.upButton;
        }

        public static downButton: Button;
        public static get DownButton() {
            if (this.downButton == null) {
                this.downButton = Button.GetButton({
                    name: "downButton",
                    text: "down",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraPosition();
                        Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(0, 100)));
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 60),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.downButton;
        }

        public static rightButton: Button;
        public static get RightButton() {
            if (this.rightButton == null) {
                this.rightButton = Button.GetButton({
                    name: "rightButton",
                    text: "right",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraPosition();
                        Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(100, 0)));
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 100),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.rightButton;
        }

        public static leftButton: Button;
        public static get LeftButton() {
            if (this.leftButton == null) {
                this.leftButton = Button.GetButton({
                    name: "leftButton",
                    text: "left",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraPosition();
                        Setups.I.Draw.SetCameraPosition(camera.ADD(new Vector2(-100, 0)));
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 140),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.leftButton;
        }

        public static zoomPlusButton: Button;
        public static get ZoomPlusButton() {
            if (this.zoomPlusButton == null) {
                this.zoomPlusButton = Button.GetButton({
                    name: "zpButton",
                    text: "z+",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraZoom();
                        Setups.I.Draw.SetCameraZoom(camera + 0.05);
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 180),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.zoomPlusButton;
        }

        public static zoomMInusButton: Button;
        public static get ZoomMInusButton() {
            if (this.zoomMInusButton == null) {
                this.zoomMInusButton = Button.GetButton({
                    name: "zmButton",
                    text: "z-",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraZoom();
                        Setups.I.Draw.SetCameraZoom(camera - 0.05);
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 220),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.zoomMInusButton;
        }

        public static rotatePlusButton: Button;
        public static get RotatePlusButton() {
            if (this.rotatePlusButton == null) {
                this.rotatePlusButton = Button.GetButton({
                    name: "rpButton",
                    text: "r+",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraAngle();
                        Setups.I.Draw.SetCameraAngle(camera + 0.05);
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 260),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.rotatePlusButton;
        }

        public static rotateMinusButton: Button;
        public static get RotateMinusButton() {
            if (this.rotateMinusButton == null) {
                this.rotateMinusButton = Button.GetButton({
                    name: "rmButton",
                    text: "r-",
                    onClick: function () {
                        var camera = Setups.I.Draw.GetCameraAngle();
                        Setups.I.Draw.SetCameraAngle(camera - 0.05);
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 300),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.rotateMinusButton;
        }

        public static rotateResetButton: Button;
        public static get RotateResetButton() {
            if (this.rotateResetButton == null) {
                this.rotateResetButton = Button.GetButton({
                    name: "rstButton",
                    text: "rst",
                    onClick: function () {
                        Setups.I.Draw.ResetCamera();
                    },
                    position: new Vector2(Setups.I.WindowWidth - 20, 340),
                    size: new Vector2(30, 30),
                    color: Color4.White
                });
            }

            return this.rotateResetButton;
        }
    }
}