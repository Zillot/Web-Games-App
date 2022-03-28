import { Value } from '../engine/Value';

export class Timeout {
    private static queue: any[];

    public static do(ms: number, action: any) {
        if (Timeout.queue == null) {
            Timeout.queue = [];
        }

        var val = new Value(0, 1000 / ms);
        val.GoTo(1);

        Timeout.queue.push({
            value: val,
            action: action
        });
    }

    public static Update(timeDelta: number): void {
        if (Timeout.queue == null) {
            Timeout.queue = [];
        }

        for (var i = 0; i < Timeout.queue.length; i++) {
            Timeout.queue[i].value.Update(timeDelta);

            if (Timeout.queue[i].value.isStable()) {
                Timeout.queue[i].action();
                Timeout.queue.splice(i--, 1);
            }
        }
    }
}
