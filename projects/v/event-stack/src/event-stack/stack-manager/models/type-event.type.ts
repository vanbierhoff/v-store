import { StackCallback } from "./stack-callback";

export type TypeEvent<T, KEY extends keyof T> = StackCallback<T[KEY]>;
