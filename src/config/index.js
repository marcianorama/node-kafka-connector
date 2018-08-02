import initializeDotenv from './dotenv.config';
import { logger, expressLogger } from './pino.config';
import kafkaHighLevelProducer from './kafka.producer.config';

if (initializeDotenv.parsed) {
    logger.info({ message: 'env initialized!!!' });
} else if (initializeDotenv.error) {
    logger.error({ message: 'Error initializing env!!!' });
}

export {
    logger,
    expressLogger,
    kafkaHighLevelProducer,
};
