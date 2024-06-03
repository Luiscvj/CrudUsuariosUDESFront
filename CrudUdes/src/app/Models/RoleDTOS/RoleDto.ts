export class RoleDto{
    roleId: number;
    roleName: string;

    constructor(roleId: number = 1,roleName: string='')
    {
        this.roleId = roleId;
        this.roleName = roleName;
    }
}