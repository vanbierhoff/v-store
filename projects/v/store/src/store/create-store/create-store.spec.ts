import { inject, TestBed } from '@angular/core/testing';
import { createStore } from './create-store';
import { Injector } from '@angular/core';
import { setGlobalInjector } from '../injector/injector';

import { StoreItemTest } from './test-models/store';




describe('Create Store', () => {


    it('should create', () => {
       inject([Injector], (injector: Injector) => {
            setGlobalInjector(injector);
            const store = createStore(StoreItemTest);
            expect(store).toBeTruthy();
        });
    });
});
