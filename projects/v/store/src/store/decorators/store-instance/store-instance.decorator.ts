import { StoreInstanceInterface } from './models/store-instance/store-instance.interface';
import { STORE_META_KEY } from '../../const/meta-keys/store-instance/store-isnatnce';
import { getGlobalInjector } from '../../injector/injector';
import map from 'lodash/map';
import { addMetaField } from '../../../../../meta-helper/src/public-api';



export function StoreInstanceDecorator(options?: StoreInstanceInterface): any {
    return function (
        target: new (...args: any[]) => any
    ) {
        addMetaField(target, STORE_META_KEY, options);
        return class extends target {
            constructor(...args: any[]) {
                const injector = getGlobalInjector();
                /**
                 * design: paramtypes. This corresponds to the types of constructor parameters. It only applies for TypeScript since,
                 * with ES6, such parameters aren’t supported. With this language, you need to supply a static getter for the parameter property.
                 */
                const designedArgs: any[] = (Reflect as any).getMetadata('design:paramtypes', target) || [];
                if (injector && designedArgs.length > 0 && args.length === 0) {
                    args = map(designedArgs, (arg, index) => {
                        return injector.get(arg, index, target);
                    });
                }
                super(...args);
            }
        };
    };
}
