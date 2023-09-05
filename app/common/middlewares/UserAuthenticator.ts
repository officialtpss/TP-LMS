import { locale } from '@config/locales';
import { isAdminRole } from '@statics/app';
import { sendResponse } from '@utils/common';
import { NextFunction, Response } from 'express';
import { RESPONSE_CODE, RESPONSE_FAILURE } from '../Constants';
import { ILooseObject } from '../interfaces/ILooseObject';

export default class UserAuthenticator {
    static isAdminAuthenticated() {
        return [UserAuthenticator.authenticateAdminRole];
    }

    static authenticateAdminRole(req: ILooseObject, res: Response, next: NextFunction) {
        if (isAdminRole('systemAdmin')) {
            next();
        } else {
            return sendResponse(res, {}, locale('USER_UNAUTHORISED'), RESPONSE_FAILURE, RESPONSE_CODE.FORBIDDEN);
        }
    }

    static isSystemAdminAuthenticated(req: ILooseObject, res: Response | any, next: NextFunction) {
        if (isAdminRole(req.body?.role || req.query?.role)) {
            next();
        } else {
            return sendResponse(res, {}, locale('USER_UNAUTHORISED'), RESPONSE_FAILURE, RESPONSE_CODE.FORBIDDEN);
        }
    }
}
