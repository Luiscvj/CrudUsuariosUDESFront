export class AddRoleDto
{
    email :string;
    role:string;

    constructor(email:string = '',role:string = '')
    {
        this.email = email;
        this.role = role;
    }
}