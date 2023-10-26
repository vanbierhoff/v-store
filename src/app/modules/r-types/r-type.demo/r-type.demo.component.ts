import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RType } from '../../../../../projects/v/r-types/src/decorators/type-decorator/r-type.decorator';
import { JsType } from '../../../../../projects/v/r-types/src/validators/type-validators/models/js-type';
import {
    TypeDecoratorInterface
} from '../../../../../projects/v/r-types/src/decorators/type-decorator/models/type-decorator.interface';
import { REmailValidator } from '../../../../../projects/v/r-types/src/validators/r-validators/r-email.validator';
import { EventStackItemInterface, EventStackManager } from '../../../../../projects/v/event-stack/src/event-stack';
import { StackCallback } from '../../../../../projects/v/event-stack/src/event-stack/stack-manager/models/stack-callback';


@Component({
    selector: 'app-r-type.demo',
    templateUrl: './r-type.demo.component.html',
    styleUrls: ['./r-type.demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class RTypeDemoComponent implements OnInit {


    @RType<Array<number>>({
        typeOrValidator: JsType.array,
        defaultValue: [2, 3, 4, 5]
    })
    numberLiteral: TypeDecoratorInterface<number>;

    @RType<string>({
        typeOrValidator: REmailValidator,
        defaultValue: 'data'
    })
    email: TypeDecoratorInterface<number>;


    ngOnInit() {
        console.log(this.numberLiteral.get());
        console.log(this.numberLiteral.validate());
        console.log(this.email.validate());
        this.email.set('data@email.com');
        console.log(this.email.validate());
    }

}
