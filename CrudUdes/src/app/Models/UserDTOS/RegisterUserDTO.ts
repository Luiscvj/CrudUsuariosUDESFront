export class RegisterUserDto{
    UserName: string;
    Email: string;
    Password: string;
    DocumentNumber: string ;
    DocumentType: number;
    Name: string;
    LastName:string;

    constructor(userName:string = '', email: string= '', password:string= '', documentNumber:string= '', documentType: number= 1, name:string= '', lastName:string= '')
    {
        this.UserName = userName;
        this.Email = email;
        this.Password = password;
        this.DocumentNumber = documentNumber;
        this.DocumentType = documentType;
        this.Name = name;
        this.LastName = lastName;
    }


}