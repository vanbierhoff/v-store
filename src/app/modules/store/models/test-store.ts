import { StoreInstanceDecorator } from '../../../../../projects/v/store/src/store/decorators/store-instance/store-instance.decorator';
import { SyncStoreService } from '../../../../../projects/v/store/src/store/services/store/sync-store.service';
import { StoreField } from '../../../../../projects/v/store/src/store/decorators/store-field/store-field.decorator';



@StoreInstanceDecorator({
    key: 'key'
})
export class TestStore {

    constructor(protected store: SyncStoreService) {
    }

    @StoreField
    public data: string = '5';

    @StoreField({})
    public data2: number = 5;


    dataNotDec = 'notDecotr';

    method() {
        console.log('datas');
    }
}
