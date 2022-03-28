export abstract class Deleteable  {
    private shouldBeRemoved: boolean;

    constructor() {
        this.shouldBeRemoved = false;
    }

    public MarkToBeRemoved(): void {
        this.shouldBeRemoved = true;
    }
    public ShouldBeRemoved(): boolean {
        return this.shouldBeRemoved;
    }
}
