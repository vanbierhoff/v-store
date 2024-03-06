import { StoreInstanceDecorator } from '../../../../../projects/v/store/src/store/decorators/store-instance/store-instance.decorator';
import { StoreDataService } from '../../../../../projects/v/store/src/store/services/store/store-data.service';
import { StoreField } from '../../../../../projects/v/store/src/store/decorators/store-field/store-field.decorator';
import { JsType } from '../../../../../projects/v/r-types/src/validators/type-validators/models/js-type';
import { typeStoreValidator } from '../../../../../projects/v/store/src/store/validators/type-validator';
import { HttpClient } from '@angular/common/http';
import { ExtraProvider } from '../../../../../projects/v/store/src/extra-provider/extra-provider';
import { ExtraToken } from '../../../../../projects/v/store/src/extra-provider/models/extra-token';


export const ExtraValue = new ExtraToken<string>('extraValue');
export const ExtraValueSym = new ExtraToken<string>(Symbol('value'));
export const ExtraFalseValueSym = new ExtraToken<string>(Symbol('value'));

@StoreInstanceDecorator({
    key: 'key'
})
export class TestStore {

    @StoreField({
        initHook: (field) => field.extra.set(ExtraValue, 'value'),
        validators: [typeStoreValidator(JsType.string, 'errorMsh')]
        // validators: [typeStoreValidator(JsType.string, 'errorMsh')]
    })
    // @ts-ignore
    public data: number = 10;
    @StoreField({
        initHook: (field) => field.extra.set(ExtraValueSym, 'valueSymbol'),
        validators: [typeStoreValidator(JsType.string, 'errorMsh')]
    })
    public data2: any = 5;

    dataNotDec = 'notDecotr';

    constructor(protected http: HttpClient) {
    }

    method() {
        console.log('datas');
    }
}

// @Stepper({})
export class RegistrationStepper {

    // @Step({
    // allowedStates: [],
    // validators: []
    // instanceData: 'ref' // email step реализует интерфейс для степпера
    //disabled: bool
    //
    // })
    email = ''; // EmailStep содержит внутри  стейт декорированный StoreField  может являтся рендерируемым компонентом
    // EmailStep бизнес логика(модель) для шата регистрации
}
