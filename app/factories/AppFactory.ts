import { IApp, App } from '@/models/App';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class AppFactory extends BaseFactory {
    public static checkKeysInModel(keys: string | string[]) {
        return super._checkKeysInModel(keys, App);
    }

    static generateApp(data: any): IApp {
        try {
            return new App(data);
        } catch (err) {
            throw new InvalidBuildDataError('App');
        }
    }

}
