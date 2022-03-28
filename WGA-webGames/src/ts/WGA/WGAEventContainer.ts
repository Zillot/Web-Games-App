import { KeyEventFunction } from "../core/KeyEventFunction";
import { ConditionCheckFunction } from '../core/CallbackFunction';

export class WGAEventContainer {
    public Handler: KeyEventFunction;
    public ConditionCheck: ConditionCheckFunction;
    public Name: string;
    public Type: string;
    public EventId: string;
}
