import { StoreInstanceDecorator } from '../../../../../projects/v/store/src/store/decorators/store-instance/store-instance.decorator';
import { StoreService } from '../../../../../projects/v/store/src/store/services/store/store.service';
import { StoreField } from '../../../../../projects/v/store/src/store/decorators/store-field/store-field.decorator';
import { JsType } from '../../../../../projects/v/r-types/src/validators/type-validators/models/js-type';
import { typeStoreValidator } from '../../../../../projects/v/store/src/store/validators/type-validator';



@StoreInstanceDecorator({
    key: 'key'
})
export class TestStore {

    @StoreField({
        initHook: (field) => console.log(field),
        validators: [typeStoreValidator(JsType.string, 'errorMsh')]
    })
    public data: string = '5';
    @StoreField({})
    public data2: number = 5;
    dataNotDec = 'notDecotr';

    constructor(protected store: StoreService) {
    }

    method() {
        console.log('datas');
    }
}
