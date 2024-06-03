import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../Helpers/CustomValidator';
import { MyErrorStateMatcher } from '../../Helpers/MyErrorStateMatcher';
import {MatButtonModule} from '@angular/material/button';
import { RegisterUserDto } from '../../Models/UserDTOS/RegisterUserDTO';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public formBuild = inject(FormBuilder);
  private _apiUserService = inject(UserService);
  public documentType = 0;
  constructor(private router:Router){}

  public registerForm: FormGroup = this.formBuild.group(
    {
      userName: new FormControl('',
      {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      email: new FormControl('',
      {
        validators: [Validators.required,Validators.email],
        asyncValidators:[CustomValidators.emailInUse(this._apiUserService)],
        updateOn: 'blur', 
      }),
      password: new FormControl('',
      {
        validators: [Validators.required,CustomValidators.strongPassword()]
      }),
      documentNumber: new FormControl('',
      {
        validators: [Validators.required,Validators.maxLength(40)]
      }),
    
      name: new FormControl('',
      {
        validators: [Validators.required, Validators.maxLength(120)]
      }),
      lastName: new FormControl('',
      {
        validators: [Validators.required, Validators.maxLength(100)]
      })
   })

   matcher = new MyErrorStateMatcher();
   hide = true;

   singUp()
   {
     const registerModel: RegisterUserDto= new RegisterUserDto(this.registerForm.value.userName,
                                                               this.registerForm.value.email,
                                                               this.registerForm.value.password,
                                                               this.registerForm.value.documentNumber,
                                                               this.documentType,
                                                               this.registerForm.value.name,
                                                               this.registerForm.value.lastName);
      this._apiUserService.RegisterUser(registerModel).subscribe(
        {
          next:(data)=>
            {
              console.log(data.message);
              if(data.statusCode == 201)
                {
                  alert('Usuario creado exitosamente');
                  this.router.navigate(['/login']);
                }else
                {
                  alert("No se pudo crear el usuario")
                }
            }
        }
      )
     
   }

   volver()
   {
    this.router.navigate(['/login']);
   }
    

}
