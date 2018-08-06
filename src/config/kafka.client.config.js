import { Client } from 'kafka-node';
import { ConfigUtil } from '../utils';
import { logger } from './pino.config';

const getKafkaClientOptions = ConfigUtil.getKafkaClientOptions();
const kafkaClient = new Client(
    getKafkaClientOptions.connectionString,
    getKafkaClientOptions.clientId,
    getKafkaClientOptions.zkOptions,
    getKafkaClientOptions.noAckBatchOptions,
    getKafkaClientOptions.sslOptions,
);

kafkaClient.on('ready', () => {
    logger.info({ message: 'Kafka connected successfully!!!' });
});

kafkaClient.on('error', (error) => {
    logger.error({ message: error.message });
});

export default kafkaClient;
