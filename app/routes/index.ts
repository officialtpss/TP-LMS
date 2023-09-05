import { IRoutes } from '@common/interfaces/IRoutes';
import { logger } from '@utils/logger';
import { Router } from 'express';
import InfoRouter from './info.route';
import UserRouter from '@/routes/user.route';
import AdminRouter from '@/routes/admin/admin.route';

export class IndexRoute implements IRoutes {

    router = Router({ mergeParams: true });

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(AdminRouter);
        this.router.use(UserRouter);
        this.router.use(InfoRouter);
        logger.info('Routes initiated...');
    }
}
