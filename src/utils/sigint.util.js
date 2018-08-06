import { logger } from '../config/pino.config';

const gracefulShutDown = (connection, connectionName) => {
    connection.close(() => {
        logger.info({ message: `Connection with ${connectionName} closed gracefully!!!` });
    });
};

export default gracefulShutDown;
