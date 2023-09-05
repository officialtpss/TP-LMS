import { JWT_SECRET } from '@/config/config';
import { locale } from '@/config/locales';
import { sendResponse } from '@/utils/common';
import jwt from 'jsonwebtoken';
import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '../Constants';

export default class JWTAuthenticator {
  /**
   *
   * @encode- here generate jwt token
   */
  static encode = (req: any, res: any) => {
    try {
      const token = jwt.sign({
        user: res.user.email,
        id: res.user.id,
      }, JWT_SECRET, { expiresIn: '24h' });
      return sendResponse(res, {
        token,
        profile: res.user,
      }, locale('LOGIN_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
    } catch (error) {
      return sendResponse(res, {}, locale('SERVER_ERROR'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
    }
  };

  /**
   *
   * @decode- here jwt token decode
   */
  static decode = (req: any, res: any, next: any) => {
    try {
      const accessToken = req.headers?.authorization?.split(' ');
      if (!accessToken || accessToken[0] !== 'Bearer') {
        return sendResponse(res, {}, locale('USER_UNAUTHORISED'), RESPONSE_FAILURE, RESPONSE_CODE.FORBIDDEN);
      }
      jwt.verify(accessToken[1], JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          return sendResponse(res, {}, locale('LOG_OUT_SUCCESS'), RESPONSE_FAILURE, RESPONSE_CODE.FORBIDDEN);
        }
        res.userEmail = decoded.user;
        res.userId = decoded.id;
        next();
      });
    } catch (error) {
      return sendResponse(res, {}, locale('SERVER_ERROR'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
    }
  };
} 