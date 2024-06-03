import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../Helpers/CustomValidator';
import { MyErrorStateMatcher } from '../../Helpers/MyErrorStateMatcher';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { appsettings } from '../../Settings/appsettings';
import { LoginDto } from '../../Models/UserDTOS/LoginDto';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: 
  [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public _apiUrl = appsettings.apiUrl + "User";
  private _apiuserService = inject(UserService);
  public formBuild = inject(FormBuilder);
  
  hide = true;
  matcher = new MyErrorStateMatcher();
  constructor(private router:Router){}

  public loginForm : FormGroup = this.formBuild.group(
    {
      email: new FormControl('',[Validators.required, Validators.email]),     
      password: new FormControl('', [Validators.required])
    });

  logIn()
  {
    const loginModel:LoginDto = new LoginDto(
                                              this.loginForm.value.email,
                                              this.loginForm.value.password
                                            );
   this._apiuserService.LoginUser(loginModel).subscribe(
    {
      next:(data)=>
        {
          if(data != null )
            {
              console.log(data);
              this.router.navigate(['/home']);
            }else
            {
              alert('incorrect credentials');
            }
        }
    }) 
  }

  registrarse(event: Event)
  {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

}
