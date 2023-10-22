import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StepItem } from './step-item';




export function stepFactory(dataStep: any , http: any): StepItem {
    const stepItem: any = new StepItem(http);

    (Object.keys(dataStep)).forEach(key => {
        stepItem[key] = dataStep[key];
    });
    return stepItem;
}
