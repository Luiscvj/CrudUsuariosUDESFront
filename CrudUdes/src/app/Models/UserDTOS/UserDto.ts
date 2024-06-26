import { RoleDto } from "../RoleDTOS/RoleDto";

export class UserDto{
    userId: number;
    name: string;
    lastName: string;
    documentNumber: string;
    documentTypeId: number;
    userName: string;
    email?:string;
    roleName?: string
 
    
    constructor(userId:number, name : string,lastName: string,documentNumber: string, documentTypeId:number, userName: string, email?:string, role?:string){
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
        this.documentNumber = documentNumber;
        this.documentTypeId = documentTypeId;
        this.userName =   userName;
        this.email = email;
        this.roleName= role 
       
        
    }
}