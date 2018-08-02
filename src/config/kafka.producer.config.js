import { HighLevelProducer } from 'kafka-node';
import kafkaClient from './kafka.client.config';
import { logger } from './pino.config';
import { ConfigUtil } from '../utils';

const kafkaProducerOptions = ConfigUtil.getKafkaProducerOptions();

const kafkaHighLevelProducer = new HighLevelProducer(kafkaClient, kafkaProducerOptions);

kafkaHighLevelProducer.on('ready', () => {
    logger.info({ message: 'Connected Successfully to high level producer!!!' });
});

kafkaHighLevelProducer.on('error', (error) => {
    logger.error({ message: error.message });
});

export default kafkaHighLevelProducer;
