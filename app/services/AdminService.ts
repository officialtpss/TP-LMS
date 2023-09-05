import { IAdmin, Admin } from '@/models/Admin';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export default class AdminService {
    static async create(resource: IAdmin): Promise<IAdmin> {
        return await resource.save();
    }

    static async readById(id: string, skipItems: object = {}): Promise<IAdmin | null> {
        return Admin.findById(id, skipItems).select('-__v').exec();
    }

    static async updateById(administratorId: string, administratorFields: UpdateQuery<IAdmin>): Promise<IAdmin> {
        return await Admin.findByIdAndUpdate(administratorId, administratorFields, { upsert: true }).exec();
    }

    static async update(query: FilterQuery<IAdmin>, doc: UpdateQuery<IAdmin>, options: QueryOptions = {}) {
        return Admin.updateOne(query, doc, options);
    }

    static async deleteById(id: string): Promise<IAdmin | null> {
        return Admin.findByIdAndDelete(id);
    }

    static async findOne(query: FilterQuery<IAdmin>, doc: any = {}): Promise<IAdmin | null> {
        return Admin.findOne(query, doc);
    }
}
