import concat from 'lodash/concat';


/**
 * @description Method return array keys object included symbol keys
 *
 * @param target - object.
 */
export function getKeys(target: object): Array<string | symbol> {
    return concat<string | symbol>(
        Object.keys(target),
        Object.getOwnPropertySymbols(target));
}
