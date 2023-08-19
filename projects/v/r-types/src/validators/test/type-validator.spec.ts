import { TestBed } from '@angular/core/testing';
import { typeValidator } from '@v/r-types';
import { JsType } from '../type-validators/models/js-type';


describe('Validators', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            providers: []
        })
            .compileComponents();

    });

    it('string: should to be true', () => {
        const validator = typeValidator(JsType.string);
        expect(validator('sdfsdf')).toBeTrue();
        expect(validator('5')).toBeTrue();
    });

    it('string: should to be false', () => {
        const validator = typeValidator(JsType.string);
        expect(validator([])).toBeFalse();
        expect(validator(5)).toBeFalse();
        expect(validator(true)).toBeFalse();
        expect(validator(null)).toBeFalse();
        expect(validator(undefined)).toBeFalse();
        expect(validator({data: true})).toBeFalse();
    });

    it('array type: should to be good', () => {
        const validator = typeValidator(JsType.array);
        expect(validator([1, 2, 3])).toBeTrue();
        expect(validator('5')).toBeFalse();
        expect(validator(null)).toBeFalse();
        expect(validator(undefined)).toBeFalse();
    });

    it('function type: should to be good', () => {
        const validator = typeValidator(JsType.function);
        const fn = () => 10;
        expect(validator(fn)).toBeTrue();
        expect(validator('5')).toBeFalse();
        expect(validator(null)).toBeFalse();
        expect(validator(undefined)).toBeFalse();
    });

    it('number type: should to be good', () => {
        const validator = typeValidator(JsType.number);
        expect(validator(10)).toBeTrue();
        expect(validator(+'10')).toBeTrue();
        expect(validator('5')).toBeFalse();
        expect(validator(null)).toBeFalse();
        expect(validator(undefined)).toBeFalse();
    });

    it('boolean type: should to be good', () => {
        const validator = typeValidator(JsType.boolean);
        expect(validator(true)).toBeTrue();
        expect(validator(false)).toBeTrue();
        expect(validator(+'10')).toBeFalse();
        expect(validator('5')).toBeFalse();
        expect(validator(null)).toBeFalse();
        expect(validator(undefined)).toBeFalse();
    });
});
