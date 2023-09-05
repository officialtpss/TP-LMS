import Database from '@common/Database';
import { IRoutes } from '@common/interfaces/IRoutes';
import errorMiddleware from '@common/middlewares/error';
import * as config from '@config/config';
import { locale } from '@config/locales';
import swagger from '@config/swagger';
import { IndexRoute } from '@routes/index';
import { initializeLogger, logger } from '@utils/logger';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import * as http from 'http';
import { RESPONSE_CODE, RESPONSE_FAILURE } from './common/Constants';
import { ILooseObject } from './common/interfaces/ILooseObject';
import { sendResponse } from './utils/common';

export default class App extends http.Server {
    public app: express.Application;
    public port: string | number;
    public env: string;
    private server?: http.Server;

    constructor() {
        super();
        this.app = express();
        this.port = config.PORT;
        this.env = config.CONF_ENV;
        initializeLogger(this.app);
    }

    public async initialize(): Promise<void> {
        await Database.connectDatabase();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.initializeRoutes(new IndexRoute());
    }

    public async start() {
        this.server = this.app.listen(this.port, () => {
            logger.info(`==========================================`);
            logger.info(`🚀 API (${this.env}) listening on the port ${this.port}`);
            logger.info(`==========================================`);
        });
    }

    public async disconnect(): Promise<void> {
        if (this.server) {
            await new Promise((resolve, reject) => {
                this.server?.close(err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(true);
                });
            });
        }
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.json({ limit: '2mb' }));
        this.app.use(express.urlencoded({
            limit: '3mb', extended: true
        }));
        this.app.all('*', (req: any, res: any, next: any) => {
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'POST, GET, PUT,PATCH, DELETE');
            res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, content-type');
            if ('OPTIONS' === req.method) return res.status(200).send();
            next();
        });
        this.app.use('/docs', swagger.router);
    }

    public initializeRoutes(routes: IRoutes) {
        this.app.use('/', routes.router);
        this.app.use((err: ILooseObject, req: Request, res: Response, next: NextFunction) => {
            if (err.name === 'UnauthorizedError') {
                logger.error('invalid token...');
                return sendResponse(res, {}, locale('USER_UNAUTHENTICATED'), RESPONSE_FAILURE, RESPONSE_CODE.UNAUTHORISED);
            }
            next();
        });
    }



    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}
