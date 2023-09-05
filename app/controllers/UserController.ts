import {
  RESPONSE_CODE,
  RESPONSE_FAILURE,
  RESPONSE_SUCCESS,
} from "@/common/Constants";
import { locale } from "@/config/locales";
import UserFactory from "@/factories/UserFactory";
import { IUser } from "@/models/User";
import CryptoSecurityService from "@/services/CryptoSecurityService";
import UserService from "@/services/UserService";
import { sendResponse } from "@/utils/common";
import { logger } from "@/utils/logger";
import { isEmpty, isObjectId } from "@utils/util";
import { NextFunction, Request, Response } from "express";

class UserController {
  static async checkEmailExistOrNot(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const exist = await UserService.findOne({ email: req.body.email });
    if (exist)
      return sendResponse(
        res,
        undefined,
        `${req.body.email} already exist`,
        RESPONSE_FAILURE,
        RESPONSE_CODE.BAD_REQUEST
      );
    next();
  }

  static async login(req: Request, res: Response | any, next: NextFunction) {
    try {
      req.body.password = CryptoSecurityService.decryptDBLevel(
        CryptoSecurityService.decrypt(req.body.password)
      );
      const userData: IUser | any = await UserService.findOne(req.body, {
        password: 0,
      });
      if (!userData)
        return sendResponse(
          res,
          undefined,
          locale("INVALID_CREDENTIAL"),
          RESPONSE_FAILURE,
          RESPONSE_CODE.BAD_REQUEST
        );
      res.user = userData;
      next();
    } catch (error) {
      return sendResponse(
        res,
        error?.message,
        locale("INVALID_CREDENTIAL"),
        RESPONSE_FAILURE,
        RESPONSE_CODE.BAD_REQUEST
      );
    }
  }

  static async create(req: Request, res: Response) {
    try {
      req.body.password = CryptoSecurityService.decryptDBLevel(
        CryptoSecurityService.decrypt(req.body.password)
      );
      req.body.created = new Date();
      const userData: IUser = UserFactory.generateUser(req.body);
      await UserService.create(userData);
      return sendResponse(
        res,
        undefined,
        locale("USER_CREATE_SUCCESS"),
        RESPONSE_SUCCESS,
        RESPONSE_CODE.CREATED
      );
    } catch (error) {
      return sendResponse(
        res,
        undefined,
        locale("USER_CREATE_FAILED"),
        RESPONSE_FAILURE,
        RESPONSE_CODE.BAD_REQUEST
      );
    }
  }

  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limitCount: any = req.query.limit ? req.query.limit : 10;
      const pageCount: any = req.query.page ? req.query.page : 0;
      
      const allUserData = await UserService.list({},{ password: 0 },{ created: 1 },pageCount,limitCount);
      return sendResponse(
        res,
        allUserData,
        locale("USER_GET_ALL_SUCCESS"),
        RESPONSE_SUCCESS,
        RESPONSE_CODE.SUCCESS
      );
    } catch (error) {
      logger.error("UserController.getOne() Error: ", error);
      next(error);
    }
  };
  static getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!isObjectId(req.params.userId))
        return sendResponse(
          res,
          {},
          locale("USER_INVALID_ID"),
          RESPONSE_FAILURE,
          RESPONSE_CODE.BAD_REQUEST
        );
      const userId: string = req.params.userId;
      const findOneuserData = await UserService.readById(userId, {
        password: 0,
      });
      return sendResponse(
        res,
        findOneuserData,
        locale("USER_GET_ONE_SUCCESS"),
        RESPONSE_SUCCESS,
        RESPONSE_CODE.SUCCESS
      );
    } catch (error) {
      logger.error("UserController.getOne() Error: ", error);
      next(error);
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!isObjectId(req.params.userId))
        return sendResponse(
          res,
          {},
          locale("USER_INVALID_ID"),
          RESPONSE_FAILURE,
          RESPONSE_CODE.BAD_REQUEST
        );
      if (isEmpty(req.body))
        return sendResponse(
          res,
          {},
          locale("USER_INVALID_DATA"),
          RESPONSE_FAILURE,
          RESPONSE_CODE.BAD_REQUEST
        );
      if (req.body.password) {
        req.body.password = CryptoSecurityService.decrypt(req.body.password);
      }
      const userId: string = req.params.userId;
      const updateuserData: any = await UserService.updateById(userId, {
        $set: req.body,
      });
      const userData = { ...updateuserData._doc };
      delete userData.password;
      return sendResponse(
        res,
        userData,
        locale("USER_UPDATE_SUCCESS"),
        RESPONSE_SUCCESS,
        RESPONSE_CODE.SUCCESS
      );
    } catch (error) {
      logger.error("UserController.update() Error: ", error);
      next(error);
    }
  };
}

export default UserController;
