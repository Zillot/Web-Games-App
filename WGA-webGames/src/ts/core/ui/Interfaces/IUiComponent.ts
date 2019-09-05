export interface IUiComponent {
    Name: string;

    Init(): void;
    Dispose(): void;
    Update(timeDelta: number): void;
    Draw(): void;
}
