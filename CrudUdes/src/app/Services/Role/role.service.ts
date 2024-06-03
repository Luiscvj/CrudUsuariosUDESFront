import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = appsettings.apiUrl + 'Role'
  constructor(private http: HttpClient ) { }

  UsersWithCurrentRole(roleId : number): Observable<UserDto[]>
  { 
    const params = new HttpParams().set("roleId",roleId)
    return this.http.get<UserDto[]>(`${this.apiUrl}/UsersWithCurrentRole`,{params});
  }

  UsersWithoutCurrentRole(roleMissingId: number): Observable<UserDto[]>
  {
    const params = new HttpParams().set("roleId",roleMissingId);
    return this.http.get<UserDto[]>(`${this.apiUrl}/UsersWithoutCurrentRole`,{params});
  }
}
