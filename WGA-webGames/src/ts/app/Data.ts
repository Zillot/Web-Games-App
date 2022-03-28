import { Vector2 } from "../core/engine/Vector2";
import { Camera } from '../core/models/Camera';
import { MouseInput } from '../core/services/MouseInput';
import { KeyboardInput } from '../core/services/KeyboardInput';

export class Data {
    public static I: Data;
    public static _initialize = (() => {
        Data.I = new Data();
    })();

    public CanvasSize: Vector2;
    public WindowSize: Vector2;
    public RealWindowSize: Vector2;

    public CameraScale: number;
    public FrameScale: number;
    public BackFrameScale: number;

    public Center: Vector2;
    public RealCenter: Vector2;

    public FrameRealOffset: Vector2;
    public FrameOffset: Vector2;

    public Camera: Camera;
    public MouseInput: MouseInput;
    public KeyboardInput: KeyboardInput;
}
