import { logger } from '../config/pino.config';

const gracefulShutDown = (connection, connectionName) => {
    connection.close(true, () => {
        logger.info({ message: `Connection with ${connectionName} closed gracefully!!!` });
    });
};

export default gracefulShutDown;
