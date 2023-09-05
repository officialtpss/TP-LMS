import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import AdminFactory from '@/factories/AdminFactory';
import { IAdmin } from '@/models/Admin';
import AdminService from '@/services/AdminService';
import CryptoSecurityService from '@/services/CryptoSecurityService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class AdminController {

    static async checkEmailExistOrNot(req: Request, res: Response, next: NextFunction) {
        const exist = await AdminService.findOne({ email: req.body.email });
        if (exist) return sendResponse(res, undefined, `${req.body.email} already exist`, RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        next();
    }

    static async login(req: Request, res: Response | any, next: NextFunction) {
        try {
            req.body.password = CryptoSecurityService.decryptDBLevel(CryptoSecurityService.decrypt(req.body.password));
            const userData: IAdmin | any = await AdminService.findOne(req.body, { password: 0 });
            if (!userData) return sendResponse(res, undefined, locale('INVALID_CREDENTIAL'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            res.user = userData;
            next();
        } catch (error) {
            return sendResponse(res, error?.message, locale('INVALID_CREDENTIAL'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST)
        }
    }

    static async create(req: Request, res: Response) {
        try {
            req.body.password = CryptoSecurityService.decryptDBLevel(CryptoSecurityService.decrypt(req.body.password));
            req.body.created = new Date();
            const userData: IAdmin = AdminFactory.generateUser(req.body);
            await AdminService.create(userData);
            return sendResponse(res, undefined, locale('ADMIN_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
        } catch (error) {
            console.log('error', error);
            return sendResponse(res, undefined, locale('ADMIN_CREATE_FAILED'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST)
        }
    }

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.adminId)) return sendResponse(res, {}, locale('ADMIN_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const adminId: string = req.params.adminId;
            const findOneuserData = await AdminService.readById(adminId, { password: 0 });
            return sendResponse(res, findOneuserData, locale('ADMIN_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('AdminController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.adminId)) return sendResponse(res, {}, locale('ADMIN_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('ADMIN_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (req.body.password) {
                req.body.password = CryptoSecurityService.decryptDBLevel(CryptoSecurityService.decrypt(req.body.password));
            }
            const adminId: string = req.params.adminId;
            const updateuserData: any = await AdminService.updateById(adminId, { $set: req.body });
            const userData = { ...updateuserData._doc }
            delete userData.password;
            return sendResponse(res, userData, locale('ADMIN_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('AdminController.update() Error: ', error);
            next(error);
        }
    };

}

export default AdminController;
