import { RESPONSE_CODE, RESPONSE_SUCCESS } from "@/common/Constants";
import { SECRET_KEY } from "@/config/config";
import { locale } from "@/config/locales";
import CryptoSecurityService from "@/services/CryptoSecurityService";
import { sendResponse } from "@/utils/common";
import { Request, Response, Router } from "express";

const path = '/app-info';

const InfoRouter = Router({ mergeParams: true });

const getAppInfo = (req: Request, res: Response) => {
    const appInfo = { '_v': CryptoSecurityService.encrypAtob(SECRET_KEY) };
    return sendResponse(res, appInfo, locale('APP_INFO'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
}
InfoRouter.post(`${path}`, getAppInfo);
export default InfoRouter;