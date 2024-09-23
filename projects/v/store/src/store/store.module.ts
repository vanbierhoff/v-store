import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModuleInterface } from './models/store-module.interface';
import { CUSTOM_STORE_ITEM_TOKEN } from './const/tokens/custom-store-item.token';
import { StoreInstance } from './store-items/store-instance/store-instance';
import {
    STORE_DATA_SERVICE_TOKEN,
    STORE_SUBSCRIBERS_TOKEN,
    StoreDataService,
    StoreSubscribersService
} from './services';
import { FIELD_MANAGER_TOKEN } from './const';
import { FieldManager } from './store-items/store-field/field-manager/field-manager';
import { STORE_INSTANCE_FOR_FIELD_MANAGER } from './const/tokens/store-instance-for-field-manager';
import { StoreFieldInstance } from './store-items/store-field/store-field-instance';



@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        StoreDataService,
        StoreSubscribersService,
        {
            provide: CUSTOM_STORE_ITEM_TOKEN,
            useValue: StoreInstance
        },
        {
            provide: FIELD_MANAGER_TOKEN,
            useValue: FieldManager
        },
        {
            provide: STORE_SUBSCRIBERS_TOKEN,
            useClass: StoreSubscribersService
        },
        {
            provide: STORE_INSTANCE_FOR_FIELD_MANAGER,
            useValue: StoreFieldInstance
        },
        {
            provide: STORE_DATA_SERVICE_TOKEN,
            useClass: StoreDataService
        },

    ]
})
export class StoreModule {

    static forChild(config?: StoreModuleInterface): any {
        return {
            ngModule: StoreModule,
            providers: [
                StoreDataService,
                StoreSubscribersService,
                {
                    provide: CUSTOM_STORE_ITEM_TOKEN,
                    useValue: config?.storeItem || StoreInstance
                },
                {
                    provide: FIELD_MANAGER_TOKEN,
                    useValue: config?.fieldManager || FieldManager
                },
                {
                    provide: STORE_INSTANCE_FOR_FIELD_MANAGER,
                    useValue: config?.storeFieldInstance || StoreFieldInstance
                },
                {
                    provide: STORE_DATA_SERVICE_TOKEN,
                    useClass: config?.storeData || StoreDataService
                }
            ]
        };
    }

    static forRoot(config?: StoreModuleInterface): any {
        return {
            ngModule: StoreModule,
            providers: [
                StoreDataService,
                StoreSubscribersService,
                {
                    provide: CUSTOM_STORE_ITEM_TOKEN,
                    useValue: config?.storeItem || StoreInstance
                },
                {
                    provide: FIELD_MANAGER_TOKEN,
                    useValue: config?.fieldManager || FieldManager
                },
                {
                    provide: STORE_INSTANCE_FOR_FIELD_MANAGER,
                    useValue: config?.storeFieldInstance || StoreFieldInstance
                },
                {
                    provide: STORE_DATA_SERVICE_TOKEN,
                    useClass: config?.storeData || StoreDataService
                }
            ]
        };
    }
}
