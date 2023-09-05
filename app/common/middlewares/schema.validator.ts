import { locale } from '@/config/locales';
import { sendResponse } from '@/utils/common';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { RESPONSE_CODE, RESPONSE_FAILURE } from '../Constants';

const validator = (schemaObject: Joi.SchemaMap | undefined) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const payload = Object.assign({}, req.params || {}, req.query || {}, req.body || {});
        const { error } = Joi.object(schemaObject).validate(payload);
        if (error) {
            return sendResponse(res, errorHandler(error), locale('USER_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        }
        next()
    };
};

const errorHandler = (error: Joi.ValidationError) => {
    const err = error.details?.map(err => err?.message?.replace(/"/g, ''));
    return err;
};

export default validator;