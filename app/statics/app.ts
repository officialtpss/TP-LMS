import { ILooseObject } from "@/common/interfaces/ILooseObject";

export const ADMIN_TYPE: ILooseObject[] = [
    {
        name: 'System Admin',
        id: 'systemAdmin',
        type: 'systemAdmin',
        description: 'Admin who can manage whole Application',
    }
];

export function isAdminRole(type: string) {
    return ADMIN_TYPE.find(user => user.type == type);
}
