import { Component, Inject } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
import { UserDto } from '../../../Models/UserDTOS/UserDto';
import { MatSelectModule } from '@angular/material/select';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { FilterUserDialog } from '../../../Helpers/Dialogs/FilterUserDialog';
@Component({
  selector: 'app-filter-user',
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
    MatSelectModule,
    MatCheckboxModule],
  templateUrl: './filter-user.component.html',
  styleUrl: './filter-user.component.css'
})
export class FilterUserComponent {
   showDocumentNumberInput : boolean = true;
   showRoleIdInput: boolean = false;
   showByMissingRole: boolean = false;
 constructor
 (
    public dialogRef: MatDialogRef<FilterUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterUserDialog
 ){}

 
 onNoClick():void
 {
   this.dialogRef.close();
 }

 toggleCheckBox(source: string):void
 {
   if(source =='document')
     {
       this.showRoleIdInput = false;
       this.showByMissingRole = false
     }else if(source == 'role')
     {
      this.showDocumentNumberInput = false;
      this.showByMissingRole = false;
     }else if(source == 'missing')
      {
        this.showDocumentNumberInput = false;
        this.showRoleIdInput = false
      }
    
 }

}
