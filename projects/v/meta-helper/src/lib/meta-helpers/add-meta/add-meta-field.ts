import { AddMetaOptionsInterface } from './models/add-meta-options.interface';
import 'reflect-metadata'

export function addMetaField<Meta>(target: object, metaKey: string, metadata: Meta, options?: AddMetaOptionsInterface): void {
    const usedTarget = options?.notUseConstructor ? target : target.constructor;

    // getMeta
    const fieldList: Meta[] = Reflect.getMetadata(metaKey,
        usedTarget);

    // if not meta - created
    if (!fieldList) {
        const newFieldList = [];
        newFieldList.push(metadata);
        Reflect.defineMetadata(metaKey, newFieldList, usedTarget);
        return;
    }

    // If there is data, add a new field
    if (fieldList) {
        fieldList.push(metadata);
        Reflect.defineMetadata(metaKey, fieldList, usedTarget
        );
        return;
    }
}
