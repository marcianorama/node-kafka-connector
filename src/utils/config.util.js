import config from 'config';
import fs from 'fs';
import { logger } from '../config/pino.config';

const getConfig = (configName) => {
    let configProps;
    try {
        configProps = config.get(configName);
    } catch (error) {
        logger.error({ message: error.message });
    }
    return configProps;
};

const getKafkaClientOptions = () => {
    const kafkaOptions = {
        connectionString: process.env.KAFKA_CONNECTIONS_STRING,
        clientId: getConfig('kafka.clientId'),
    };
    if (getConfig('zkOptions')) {
        kafkaOptions.zkOptions = getConfig('zkOptions');
    }
    if (getConfig('noAckBatchOptions')) {
        kafkaOptions.noAckBatchOptions = getConfig('noAckBatchOptions');
    }
    if (getConfig('sslOptions')) {
        const kafkaSSL = getConfig('sslOptions');
        if (kafkaSSL.rejectUnauthorized) {
            kafkaSSL.pfx = fs.readFileSync(process.env.KAFKA_SSLOPTIONS_PFX);
            kafkaSSL.passphrase = process.env.KAFKA_SSLOPTIONS_PASSPHRASE;
        }
        kafkaOptions.sslOptions = kafkaSSL;
    }
    return kafkaOptions;
};

const getKafkaProducerOptions = () => {
    let kafkaProducerOptions;
    if (getConfig('kafkaProducer')) {
        kafkaProducerOptions = { ...getConfig('kafkaProducer') };
    }
    return kafkaProducerOptions;
};

const ConfigUtil = {
    getConfig,
    getKafkaClientOptions,
    getKafkaProducerOptions,
};

export default ConfigUtil;
