import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IUser, User } from '@/models/User';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export default class UserService {
    static async create(resource: IUser): Promise<IUser> {
        return await resource.save();
    }

    static async list(query: FilterQuery<IUser>, findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IUser[]> {
        const cursor = User.find(query, findOptions);
        console.log('AllUsers',sortOptions)
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }

    static async readById(id: string, skipItems: object = {}): Promise<IUser | null> {
        return User.findById(id, skipItems).select('-__v').exec();
    }

    static async updateById(administratorId: string, administratorFields: UpdateQuery<IUser>): Promise<IUser> {
        return await User.findByIdAndUpdate(administratorId, administratorFields, { upsert: true }).exec();
    }

    static async update(query: FilterQuery<IUser>, doc: UpdateQuery<IUser>, options: QueryOptions = {}) {
        return User.updateOne(query, doc, options);
    }

    static async deleteById(id: string): Promise<IUser | null> {
        return User.findByIdAndDelete(id);
    }

    static async findOne(query: FilterQuery<IUser>, doc: any = {}): Promise<IUser | null> {
        return User.findOne(query, doc);
    }
}
