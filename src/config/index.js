import initializeDotenv from './dotenv.config';
import { logger, expressLogger } from './pino.config';
import kafkaClient from './kafka.client.config';
import kafkaHighLevelProducer from './kafka.producer.config';
import { gracefulShutDown } from '../utils';

if (initializeDotenv.parsed) {
    logger.info({ message: 'env initialized!!!' });
} else if (initializeDotenv.error) {
    logger.error({ message: 'Error initializing env!!!' });
}

// keeps the process running even after exit is called
process.stdin.resume();

// SIGINT listens to ctrl+c
process.on('SIGINT', () => {
    gracefulShutDown(kafkaClient, 'KafkaClient');
    gracefulShutDown(kafkaHighLevelProducer, 'KafkaHighLevelProducer');
    process.exit();
});

export {
    logger,
    expressLogger,
    kafkaHighLevelProducer,
};
