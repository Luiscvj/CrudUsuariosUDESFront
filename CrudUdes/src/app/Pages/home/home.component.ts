import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { UserService } from '../../Services/user.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule 
} from '@angular/material/dialog';
import { EditUserComponent } from '../Dialogs/edit-user/edit-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: 
          [
            MatCardModule,
            FormsModule,
            ReactiveFormsModule,
            MatInputModule,
            MatInputModule,
            MatButtonModule,
            MatTableModule,
            MatIconModule,
            MatDialogModule 
            
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _apiuserService = inject(UserService);
  public userList: UserDto[] = [];
  public displayedColumns: string[]=['UserName','Email','Name','LastName','accion'];

  constructor(private router: Router,public dialog:MatDialog){}

  

   ngOnInit(): void  {
    this.obtenerUsuarios();
  }

  obtenerUsuarios()
  {
    this._apiuserService.userList().subscribe(
      {
        next:(data)=>
          {
            if(data.length > 0)
              {
               
                this.userList = data;
              }
          }
      })
      
  }

  deleteUser(model:UserDto)
  {
    console.log(model);
    if(confirm("Desea eliminar el usuario?: " + model.userName))
      {
        this._apiuserService.deleteUser(model.userId).subscribe(
          {
            next:(data)=>
              {
                console.log(data);
                if(data.statusCode = 204)
                  {
                    
                    this.obtenerUsuarios();
                    alert("Usuario eliminado con exito");
                  }
              }
          })
      }
  }

  updateUser(userData:UserDto): void
  {
      const dialogRef= this.dialog.open(EditUserComponent,
        {
          data:{
                userId: userData.userId,
                userName: userData.userName,
                name: userData.name,
                lastName: userData.lastName,
                documentNumber: userData.documentNumber,
                documentTypeId: userData.documentTypeId
               }
        })


        dialogRef.afterClosed().subscribe(
          {
            next:(data:UserDto)=>
              { 
                if(data == null) return 
                 this._apiuserService.updateUser(data).subscribe(
                  {
                    next:(result)=>
                      {
                        if(result.statusCode = 204)
                          {
                              alert("Usuario actualizado con exito")
                              this.obtenerUsuarios();
                          }
                          else
                          {
                              alert("No se pudo actualizar el usuario")
                          }
                      }
                  })
              }
          })
  }

  


}
