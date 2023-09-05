import App from '@/app';
import { ExitStatus } from '@common/enum/Server';
import { logger } from '@utils/logger';
import validateEnv from '@utils/validateEnv';
import { connection } from 'mongoose';
const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

validateEnv();

process.on('unhandledRejection', (reason, promise) => {
    logger.error(`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`);
    // lets throw the error and let the uncaughtException handle below handle it
    throw reason;
});

process.on('uncaughtException', error => {
    logger.error(`App exiting due to an uncaught exception: ${error}`);
    process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
    try {
        const server = new App();
        await server.initialize();
        server.start();

        for (const exitSignal of exitSignals) {
            process.on(exitSignal, async () => {
                await connection.close();
                try {
                    await server.disconnect();
                    logger.info(`App exited with success`);
                    process.exit(ExitStatus.Success);
                } catch (error) {
                    logger.error(`App exited with error: ${error}`);
                    process.exit(ExitStatus.Failure);
                }
            });
        }
    } catch (error) {
        logger.error(`App exited with error: ${error}`);
        await connection.close();
        process.exit(ExitStatus.Failure);
    }
})();
