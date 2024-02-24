import { ExtraToken } from './models/extra-token';


export class ExtraProvider {

    #list: Record<string | symbol, any> = {};

    set<T>(token: ExtraToken<T>, value: T) {
        this.#list[token.name] = value;
    }

    get(token: ExtraToken<any>) {
        if (!(token instanceof ExtraToken)) {
            return;
        }
        if (this.#list[token.name]) {
            return this.#list[token.name];
        }

    }




}
