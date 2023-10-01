import map from 'lodash/map';
import { getGlobalInjector } from '../../store/injector/injector';
import { ManualInjectInterface } from './models/manual-inject.interface';



/**
 *
 * Decorator for inject deps with use Angular DI
 * @description Decorator search dependencies in DI mechanism and inject their into a class
 */
export function InjectDepsDecorator(manual?: ManualInjectInterface[]): any {
    return function (
        target: new (...args: any[]) => any
    ) {
        return class extends target {
            constructor(...args: any[]) {
                const injector = getGlobalInjector();
                /**
                 * design: paramtypes. This corresponds to the types of constructor parameters. It only applies for TypeScript since,
                 * with ES6, such parameters aren’t supported. With this language, you need to supply a static getter for the parameter property.
                 */
                const designedArgs: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
                if (injector && designedArgs.length > 0) {
                    args = map(designedArgs, (arg, index) => {
                        let deps;
                        if (manual && manual[index]) {
                            deps = injector.get(manual[index].token);
                        } else {
                            deps = injector.get(arg, index, target);
                        }
                        if (deps) {
                            return deps;
                        }
                        return arg;
                    });
                }
                super(...args);
            }
        };
    };
}
