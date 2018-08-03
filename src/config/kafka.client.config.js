import { KafkaClient } from 'kafka-node';
import { ConfigUtil } from '../utils';
import { logger } from './pino.config';

const kafkaClient = new KafkaClient(ConfigUtil.getKafkaClientOptions());

kafkaClient.on('ready', () => {
    logger.info({ message: 'Kafka connected successfully!!!' });
});

kafkaClient.on('error', (error) => {
    logger.error({ message: error.message });
});

export default kafkaClient;
