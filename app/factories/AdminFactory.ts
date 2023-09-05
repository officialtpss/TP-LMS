
import { Admin, IAdmin } from '@/models/Admin';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class AdminFactory extends BaseFactory {
    public static checkKeysInModel(keys: string | string[]) {
        return super._checkKeysInModel(keys, Admin);
    }

    static generateUser(data: any): IAdmin {
        try {
            return new Admin(data);
        } catch (err) {
            throw new InvalidBuildDataError('Admin');
        }
    }

}
