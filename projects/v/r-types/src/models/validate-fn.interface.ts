import { ReturnableValue, StrategyValidate } from './type-validate.interface';


export type ValidateFnSync = (value: any, strategy: StrategyValidate.SYNC) => ReturnableValue[StrategyValidate.SYNC]
export type ValidateFnAsync = (value: any, strategy: StrategyValidate.ASYNC) => ReturnableValue[StrategyValidate.ASYNC]
export type ValidateFnRasync = (value: any, strategy: StrategyValidate.RASYNC) => ReturnableValue[StrategyValidate.RASYNC]


export type ValidateFn = (value: any, type:StrategyValidate) =>  ReturnableValue[typeof type]
