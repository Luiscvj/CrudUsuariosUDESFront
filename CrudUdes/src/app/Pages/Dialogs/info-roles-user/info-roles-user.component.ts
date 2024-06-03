import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
  } from '@angular/material/dialog';
  import {
    FormsModule,  
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,} from '@angular/forms';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
import { UserRolesDto } from '../../../Models/UserDTOS/UserRolesDto';
@Component({
  selector: 'app-info-roles-user',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
     ],
  templateUrl: './info-roles-user.component.html',
  styleUrl: './info-roles-user.component.css'
})
export class InfoRolesUserComponent {
  constructor
  (
    public dialogRef: MatDialogRef<InfoRolesUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserRolesDto
  ){}


  onNoClick(): void 
  {
    this.dialogRef.close();
  }
}
