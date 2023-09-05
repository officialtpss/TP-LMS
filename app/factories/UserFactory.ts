import { IUser, User } from '@/models/User';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class UserFactory extends BaseFactory {
    public static checkKeysInModel(keys: string | string[]) {
        return super._checkKeysInModel(keys, User);
    }

    static generateUser(data: any): IUser {
        try {
            return new User(data);
        } catch (err) {
            throw new InvalidBuildDataError('User');
        }
    }

}
