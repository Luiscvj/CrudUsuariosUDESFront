export class UserDto{
    userId: number;
    name: string;
    lastName: string;
    documentNumber: string;
    documentTypeId: number;
    userName: string;
    constructor(userId:number, name : string,lastName: string,documentNumber: string, documentTypeId:number, userName: string){
        this.userId = userId;
        this.name = name;
        this.lastName = lastName;
        this.documentNumber = documentNumber;
        this.documentTypeId = documentTypeId;
        this.userName =   userName;
        
    }
}