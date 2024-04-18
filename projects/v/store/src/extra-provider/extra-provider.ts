import { ExtraToken } from './models/extra-token';


export class ExtraProvider {

    #extraList = new Map<ExtraToken<any>, any>();

    set<T>(token: ExtraToken<T>, value: T) {
        this.#extraList.set(token, value);
    }

    get<T>(token: ExtraToken<T>, defaultValue = null): T | null {
        if (this.#extraList.has(token)) {
            return defaultValue as T | null;
        }
        return this.#extraList.get(token);
    }

}
