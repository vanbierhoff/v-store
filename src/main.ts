import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
    APP_INITIALIZER,
    importProvidersFrom,
    Injector,
    provideZoneChangeDetection
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/app-routing';
import { CommonModule } from '@angular/common';
import { setGlobalInjector } from '../projects/v/store/src/store/injector/injector';
import {  HttpClientModule } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (injector: Injector) => {
                setGlobalInjector({
                    get(token: any, order?: number, originalFormConstructor?: any): any {
                        const notFound = Symbol('notFound');
                        const value = injector.get(token, notFound);
                        if (value === notFound) {
                            return;
                        }
                        return value;
                    }
                });
                return () => {
                };
            },
            deps: [
                Injector
            ]
        },
        HttpClientModule,
        CommonModule,
        importProvidersFrom([
                RouterModule.forRoot(APP_ROUTES),
                HttpClientModule
            ]
        ),
        provideZoneChangeDetection({
            eventCoalescing: true,
            runCoalescing: true
        })
    ]
});
