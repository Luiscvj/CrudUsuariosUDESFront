import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { UserService } from "../Services/User/user.service";
import { Observable, map } from "rxjs";

export class CustomValidators{
    static strongPassword(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null =>{
            const value = control.value
            if(!value) return null;
          

            const hasUpperCase = /[A-Z]/.test(value);// to evaluate the user input
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumeric = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%&]/.test(value);
            const isValidLength = value.length > 8;
            const noSpaces = !/\s/.test(value);//no spaces

            const isValidPassword = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength && noSpaces;
            
            return  !isValidPassword ? { strongPassword: true}: null;
            
        }
        
    }



    static emailInUse(user: UserService):AsyncValidatorFn
    {
        return (control:AbstractControl):Observable<ValidationErrors| null>=>
            {
                return  user.isEmailAlreadyUse(control.value)
                .pipe(
                    map(userNameExists => userNameExists ? {emailInUse: true } : null),
                    
                ); 
            }
    }

}