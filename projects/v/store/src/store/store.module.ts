import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModuleInterface } from './models/store-module.interface';
import { CUSTOM_STORE_ITEM_TOKEN } from './const/tokens/custom-store-item.token';
import { StoreItem } from './store-items/store-item/store-item';
import { StoreDataService, StoreSubscribersService } from './services';
import { FIELD_MANAGER_TOKEN } from './const';
import { FieldManager } from './store-items/store-field/field-manager/field-manager';



@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        StoreDataService,
        StoreSubscribersService,
        {
            provide: CUSTOM_STORE_ITEM_TOKEN,
            useValue: StoreItem
        },
        {
            provide: FIELD_MANAGER_TOKEN,
            useValue: FieldManager
        }
    ]
})
export class StoreModule {
    static forChild(config?: StoreModuleInterface): StoreModule {
        return {
            ngModule: StoreModule,
            providers: [
                StoreDataService,
                StoreSubscribersService,
                {
                    provide: CUSTOM_STORE_ITEM_TOKEN,
                    useValue: config?.storeItem || StoreItem
                },
                {
                    provide: FIELD_MANAGER_TOKEN,
                    useValue: config?.fieldManager || FieldManager
                }
            ]
        };
    }

    static forRoot(config?: StoreModuleInterface): ModuleWithProviders<StoreModule> {
        return {
            ngModule: StoreModule,
            providers: [
                StoreDataService,
                StoreSubscribersService,
                {
                    provide: CUSTOM_STORE_ITEM_TOKEN,
                    useValue: config?.storeItem || StoreItem
                },
                {
                    provide: FIELD_MANAGER_TOKEN,
                    useValue: config?.fieldManager || FieldManager
                }
            ]
        };
    }
}
