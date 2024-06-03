export class RoleInfoDto{
    RoleId: number;
    RoleName: string;
    RoleDescription: string;

    constructor(roleId: number= 1,roleName: string ='',roleDescription: string='')
    {
        this.RoleId = roleId;
        this.RoleName = roleName;
        this.RoleDescription = roleDescription;
    }
}