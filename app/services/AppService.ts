import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IApp, App } from '@/models/App'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export default class AppService {
    static async create(resource: IApp): Promise<IApp> {
        return await resource.save();
    }
    static async list(query: FilterQuery<IApp>, findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IApp[]> {
        const cursor = App.find(query, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }
    static async readById(id: string, skipItems: object = {}): Promise<IApp | null> {
        return App.findById(id, skipItems).select('-__v').exec();
    }

    static async updateById(appId: string, appFields: UpdateQuery<IApp>): Promise<IApp> {
        return await App.findByIdAndUpdate(appId, appFields, { upsert: true }).exec();
    }

    static async update(query: FilterQuery<IApp>, doc: UpdateQuery<IApp>, options: QueryOptions = {}) {
        return App.updateOne(query, doc, options);
    }

    static async findOneAndUpdate(query: FilterQuery<IApp>, doc: UpdateQuery<IApp>, options: QueryOptions = {}) {
        return App.findOneAndUpdate(query, doc, { new: true}).exec();
    }
    static async deleteById(id: string): Promise<IApp | null> {
        return App.findByIdAndDelete(id);
    }

    static async findOne(query: FilterQuery<IApp>, doc: any = {}): Promise<IApp | null> {
        return App.findOne(query, doc);
    }
}
