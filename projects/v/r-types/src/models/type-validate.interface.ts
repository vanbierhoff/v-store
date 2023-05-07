import { Observable } from 'rxjs';

export interface CheckedValue {
    value: any;
    valid: boolean
}


export enum StrategyValidate  {
    SYNC = 'sync',
    ASYNC = 'async',
    RASYNC= 'rasync'
}


export interface ReturnableValue {
    [StrategyValidate.SYNC] : CheckedValue,
    [StrategyValidate.ASYNC] : Promise<CheckedValue>
    [StrategyValidate.RASYNC] : Observable<CheckedValue>
}
