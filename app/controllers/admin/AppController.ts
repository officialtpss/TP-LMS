import { sendResponse } from "@/utils/common";
import { NextFunction, Request, Response } from "express";
import { locale } from '@config/locales'
import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from "@/common/Constants";
import { IApp } from "@/models/App";
import AppFactory from "@/factories/AppFactory";
import AppService from "@/services/AppService";
import { isEmpty } from "lodash";
import { isObjectId } from "@/utils/util";


class AppController {
  static create = async (req: Request, res: Response) => {
    try{
      if (isEmpty(req.body)) return sendResponse(res, {}, locale('APP_DATA_EMPTY'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
      req.body.created = new Date();
      const appData: IApp = AppFactory.generateApp(req.body);
      await AppService.create(appData);
      return sendResponse(res,undefined,locale("APP_CREATE_SUCCESS"),RESPONSE_SUCCESS,RESPONSE_CODE.CREATED);
    }catch(error){
      return sendResponse(res,error?.message,locale("APP_CREATE_FAILED"),RESPONSE_FAILURE,RESPONSE_CODE.BAD_REQUEST);
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try{      
      const allAppData = await AppService.list({});
      return sendResponse(res,allAppData,locale("APP_GET_ALL_SUCCESS"),RESPONSE_SUCCESS,RESPONSE_CODE.CREATED);
    }catch(error){
      return sendResponse(res,error?.message,locale("APP_GET_ALL_FAILED"),RESPONSE_FAILURE,RESPONSE_CODE.BAD_REQUEST);
    }
  };  
  static getOne = async (req: Request, res: Response) => {
    try {
        if (!isObjectId(req.params.appId)) return sendResponse(res, {}, locale('APP_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.NOT_FOUND);
        const appId: string = req.params.appId;
        const oneAppData = await AppService.readById(appId);
         if(!oneAppData) return sendResponse(res, {}, locale('APP_NOT_FOUND'), RESPONSE_FAILURE, RESPONSE_CODE.NOT_FOUND);
         return sendResponse(res, oneAppData, locale('APP_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
    } catch (error) {
      return sendResponse(res,error?.message,locale("APP_GET_ONE_FAILED"),RESPONSE_FAILURE,RESPONSE_CODE.BAD_REQUEST);
    }
};

static updateOne = async (req: Request, res: Response) => {
  try {
    if (!isObjectId(req.params.appId)) return sendResponse(res, {}, locale('APP_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.NOT_FOUND);
    if (isEmpty(req.body)) return sendResponse(res, {}, locale('APP_UPDATE_EMPTY'), RESPONSE_FAILURE, RESPONSE_CODE.NO_CONTENT_FOUND);
      const appId: string = req.params.appId;
      const updateAppData: any = await AppService.findOneAndUpdate({_id:appId}, { $set: req.body });
      if(!updateAppData) return sendResponse(res, {}, locale('APP_NOT_FOUND'), RESPONSE_FAILURE, RESPONSE_CODE.NOT_FOUND);
      const appData = { ...updateAppData._doc }
      return sendResponse(res,appData, locale('APP_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
  } catch (error) {
      return sendResponse(res, error?.message, locale('APP_UPDATE_FAILED'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
  }
};

static deleteOne = async (req: Request, res: Response) => {

  try {
      if (!isObjectId(req.params.appId)) return sendResponse(res, {}, locale('APP_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
      const appId: string = req.params.courseId;
      await AppService.deleteById(appId);
      return sendResponse(res, undefined, locale('APP_DELETE_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
  } catch (error) {
    return sendResponse(res, error?.message, locale('APP_DELETE_ONE_FAILED'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
  }
};
} 



export default AppController;