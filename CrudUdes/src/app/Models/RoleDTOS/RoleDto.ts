export class RoleDto{
    RoleId: number;
    RoleName: string;

    constructor(roleId: number = 1,roleName: string='')
    {
        this.RoleId = roleId;
        this.RoleName = roleName;
    }
}