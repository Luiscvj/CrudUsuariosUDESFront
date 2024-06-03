import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { UserService } from '../../Services/User/user.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule 
} from '@angular/material/dialog';
import { EditUserComponent } from '../Dialogs/edit-user/edit-user.component';
import { FilterUserComponent } from '../Dialogs/filter-user/filter-user.component';
import { FilterUserDialog } from '../../Helpers/Dialogs/FilterUserDialog';
import { RoleService } from '../../Services/Role/role.service';
import { AddRoleDto } from '../../Models/RoleDTOS/AddRoleDto';
import { InfoRolesUserComponent } from '../Dialogs/info-roles-user/info-roles-user.component';
import { UserRolesDto } from '../../Models/UserDTOS/UserRolesDto';

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

  public userList: UserDto[] = [];
  role: string = '';
  userRoles: UserRolesDto = new UserRolesDto();
  public displayedColumns: string[]=['UserName','Email','Name','LastName','accion'];

  constructor(private router: Router,public dialog:MatDialog, private _apiRoleService:RoleService,  private _apiuserService:UserService){}

  

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
                documentTypeId: userData.documentTypeId,
                roleName: userData.roleName,
                email: userData.email
               }
        })


        dialogRef.afterClosed().subscribe(
          {
            next:(data:UserDto)=>
              { 
                
                if(data == null) return 
                if(data.email && data.roleName)
                  {
                   
                    const addRol =  new AddRoleDto(data.email, data.roleName);    
                    
                    this._apiuserService.addRole(addRol).subscribe(
                      {
                        next:(data)=>
                          {
                            if(data.statusCode == 400)
                              {
                                alert("El usuario ya tiene el rol: " + addRol.role);
                              }
                          }
                      })
                  }
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

  getUserByDocumentNumber(documentNumber:string)
  {
    this._apiuserService.getUserByDocumentNumber(documentNumber).subscribe(
      {
        next:(userData)=>
          {
            console.log(userData.name);
          }
      })
  }

  filterUsers()
  {
    const filterData :FilterUserDialog=
    {
      roleId :0,
      documentNumber: '',
      roleMissing: 0
    }
    

    const dialogRef = this.dialog.open(FilterUserComponent,
      {
        data:{ documentNumber: filterData.documentNumber, roleId: filterData.roleId, roleMissing: filterData.roleMissing}
      })

  dialogRef.afterClosed().subscribe(result =>
    {
        if(result.documentNumber != '' && (result.roleId && result.roleMissing)== 0 )
          {
            this._apiuserService.getUserByDocumentNumber(result.documentNumber).subscribe(
              {
                next:(data)=>
                  {
                    this.userList = [];
                    this.userList.push(data);
                  }
              })
          }else if(result.roleId > 0 && result.documentNumber == '' && result.roleMissing == 0)
            {
              this._apiRoleService.UsersWithCurrentRole(result.roleId).subscribe(
                {
                  next:(data)=>
                    {
                      this.userList = [];
                      this.userList = data;
                    }
                }
              )
            }else if( result.roleMissing > 0 && result.documentNumber ==''  && result.roleId==0)
              {
                this._apiRoleService.UsersWithoutCurrentRole(result.roleMissing).subscribe(
                  {
                    next:(data)=>
                      {
                        this.userList = [];
                        this.userList = data;
                      }
                  })
              }
    })
  }

  checkRoleInfoFromUser(model: UserDto)
  {
     
     this._apiuserService.ListUserRoles(model.userId).subscribe(
      {
       next:(data:UserRolesDto)=>
        {
          if(data)
            {
              this.userRoles = data;
              
            }else
            {
              alert("Ocurrio un  error");
            }
   
        }
      })
    
     setTimeout(()=>
      {
        console.log(this.userRoles);
        const dialogRef = this.dialog.open(InfoRolesUserComponent,
          { 
            data:{userName: this.userRoles.userName, documentNumber: this.userRoles.documentNumber,roles: this.userRoles.roles}
          }) 
      },200)
   
  }

 
}
