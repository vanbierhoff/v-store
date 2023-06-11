import { StoreInstanceDecorator } from '../../../../../projects/v/store/src/store/decorators/store-instance/store-instance.decorator';
import { StoreService } from '../../../../../projects/v/store/src/store/services/store/store.service';
import { StoreField } from '../../../../../projects/v/store/src/store/decorators/store-field/store-field.decorator';



@StoreInstanceDecorator({
    key: 'key'
})
export class TestStore {

    constructor(protected store: StoreService) {
    }

    @StoreField
    public data: string = '5';

    @StoreField({
        strictSet: true
    })
    public data2: number = 5;
}
