import { ObjectId } from 'mongodb';
export default class CommonManager {
    constructor() {}

    static async getObjectId(id: string): Promise<ObjectId> {
        return new ObjectId(id);
    }

    static async getObjectIds(ids: string[]): Promise<ObjectId[]> {
        return ids.map((id: string) => new ObjectId(id));
    }
}
