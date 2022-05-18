import { FormControl, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

export class CustomValidator {

    static equalTo(field: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const parent = control.root;
            if (control.value && (control.value !== parent.get(field).value)) {
                return { equalTo: true };
            } else {
                return null;
            }
        };
    }

    static ageCheck(num: any): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const field = control.value;
            const date = new Date(field);
            var year = date.getFullYear();
            if (control.value) {
                let currentDate = new Date();
                const Age = currentDate.getFullYear() - year;
                if (Age < 18) {
                    return { ageCheck: true };
                } else {
                    return null;
                }

            } else {
                return null;
            }
        };
    }

}
