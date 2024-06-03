import { RoleDto } from "../RoleDTOS/RoleDto";

export class UserRolesDto
{
    userId: number;
    name: string;
    lastName: string;
    documentNumber: string;
    documentTypeId: number;
    userName: string;
    roles: RoleDto[] = []
 

    constructor(userId:number = 0, name: string = '',lastName: string = '',documentNumber: string = '', documentTypeId:number = 0, userName: string = '', roles: RoleDto[] = []){
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
        this.documentNumber = documentNumber;
        this.documentTypeId = documentTypeId;
        this.userName =   userName;
        this.roles = roles;

        
       
        
    }
}