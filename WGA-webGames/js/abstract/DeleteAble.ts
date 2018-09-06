module WGAAppModule {
    'use strict';

    export abstract class DeleteAble  {
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
}