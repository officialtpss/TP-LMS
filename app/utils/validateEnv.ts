import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        CONF_ENV: str({ choices: ['local', 'production'] }),
        LOG_LEVEL: str({ choices: ['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug'], default: 'debug', desc: 'Log Level' }),
        PORT: port({ choices: [3000, 5000], default: 3000, desc: 'The port to start the server on' }),
    });
};

export default validateEnv;
