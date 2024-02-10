import { AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl) {

    let re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (control.value.search(/\d/) == -1) {
        return { noDigit: true };
    } else if (control.value.search(/[a-zA-Z]/) == -1) {
        return { noLetter: true };
    } 

    return null;
}

export function phoneValidator(control: AbstractControl) {

    let re = /^(?:254|\+254|0)?(7(?:(?:[0123456789][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;;

    if (!re.test(control.value)) {
        return { invalidPhone: true }
    }

    return null;
}