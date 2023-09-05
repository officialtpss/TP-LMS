import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { LOG_LEVEL } from '@config/config';
import { NextFunction, Response } from 'express';
import morgan from 'morgan';
import { v4 as uuid_v4 } from 'uuid';
import { createLogger, format, transports } from 'winston';
morgan.token('id', function (req: any) {
    return req.id;
});
const MASK = ['pwd', 'password', 'repeatPassword'];
const maskParameters = (body: any) => {
    const data = { ...body };
    for (const [key] of Object.entries(data)) {
        if (MASK.includes(key)) {
            data[key] = '***';
        }
    }
    return data;
};
const coloredOutput = format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
    format.align(),
    format.printf(info => {
        const { timestamp, level, message, ...args } = info;
        return `${timestamp} [${level}]:${message} ${Object.keys(args).length ? JSON.stringify({ ...args }) : ''}`;
    }),
);
const logger = createLogger({
    transports: [
        new transports.Console({
            level: LOG_LEVEL,
            format: coloredOutput,
        }),
    ],
});
const logRequest = (app: any) => {
    app.use(function (req: ILooseObject, res: Response, next: NextFunction) {
        req.id = uuid_v4();
        const body = maskParameters(req.body);
        logger.info('Request:', {
            requestId: req.id,
            requestMethod: req.method,
            requestUrl: req.url,
            'Query:': req.query,
            'Body:': body,
        });
        next();
    });
};
const logMorgan = (app: any) => {
    app.use(
        morgan(':id :remote-addr :method :url :status :response-time ms - :res[content-length]', {
            stream: {
                write: (text: string) => {
                    logger.info(`Request finished: ${text.split('\n').join('')}`);
                },
            },
            skip: function (req: any) {
                if (req.url.includes('aws-health-checks')) {
                    return true;
                } else {
                    return false;
                }
            },
        }),
    );
};
const logRequestVariables = (requestId: string, variables: {}) => {
    logger.info('Variables: ', {
        requestId: requestId,
        ...variables,
    });
};
const logRequestMessage = (requestId: string, message: string, level = 'info', data = {}) => {
    logger.log(level, message, { requestId: requestId, ...data });
};
const initializeLogger = (app: any) => {
    logMorgan(app);
    logRequest(app);
};
export { logger, initializeLogger, logRequestMessage, logRequestVariables };
