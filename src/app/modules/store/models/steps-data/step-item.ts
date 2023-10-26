import { StoreField, StoreInstanceDecorator } from '@v/short-store';
import { HttpClient } from '@angular/common/http';



@StoreInstanceDecorator()
export class StepItem {

  constructor(protected http: HttpClient) {
  }

  @StoreField
  public stepName: string;

  @StoreField
  public stepHeader: string;

  @StoreField
  public description: string;

  @StoreField()
  public keyWord: string;

  @StoreField
  public win: {
    description: string;
    whatNext: string;
  };

  @StoreField
  public loose: {
    description: string;
  };

  @StoreField
  public nextStep: string;

  @StoreField
  public ready: boolean = false;

  @StoreField
  public prevStep: string;

}
