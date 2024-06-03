import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { Route } from '@angular/router';
import { RegisterUserDto } from '../../Models/UserDTOS/RegisterUserDTO';
import { Observable } from 'rxjs';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { LoginDto } from '../../Models/UserDTOS/LoginDto';
import { AddRoleDto } from '../../Models/RoleDTOS/AddRoleDto';
import { UserRolesDto } from '../../Models/UserDTOS/UserRolesDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http  = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'User';
  constructor() { }

  RegisterUser(model: RegisterUserDto):Observable<any>{
    
    return this.http.post<any>(`${this.apiUrl}`,model);
  }

  LoginUser(model: LoginDto): Observable<LoginDto>
  {
   
    return this.http.post<LoginDto>(`${this.apiUrl}/LoginUser`,model);
  }

/*   userByDocumentNumber(documentNumber:string):Observable<UserDto>
  {
    const params = new HttpParams().set('DocumentNumber',documentNumber);
    return this.http.get<UserDto>(`${this.apiUrl}`,{params});
  }
 */
  userList():Observable<UserDto[] >
  {
    
    return this.http.get<UserDto[]>(`${this.apiUrl}/GetUserList`);
  }

  deleteUser(userId: number): Observable<any>
  {
    const params = new HttpParams().set('userId',userId);
    return this.http.delete(`${this.apiUrl}`,{params});
  }

  updateUser(userData: UserDto): Observable<any>
  {
    console.log(userData);
    return this.http.put(`${this.apiUrl}`,userData);
  }

  getUserByDocumentNumber(documentNumber: string): Observable<UserDto>
  {
    console.log(documentNumber);
    const params = new HttpParams().set('DocumentNumber', documentNumber)
    return this.http.get<UserDto>(`${this.apiUrl}/UserByDocumentNumber`, {params} );
  }

  addRole(addRolDto: AddRoleDto): Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/AddRole`,addRolDto);
  }

  ListUserRoles(userId: number) :Observable<UserRolesDto>
  {
    const params = new HttpParams().set("userId", userId);
    return this.http.get<UserRolesDto>(`${this.apiUrl}/getUserRolesByUserId`,{params});
  }

  isEmailAlreadyUse(email: string): Observable<boolean>
  {
    const params = new HttpParams().set("emailToFind", email);
    return this.http.get<boolean>(`${this.apiUrl}/EmailAlreadyUse`,{params});
  }
}
