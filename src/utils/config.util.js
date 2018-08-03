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
    let kafkaOptions;
    if (getConfig('kafka')) {
        kafkaOptions = { ...getConfig('kafka'), kafkaHost: process.env.KAFKA_BROKER_LIST };
    }
    if (getConfig('kafkaConnectRetry')) {
        kafkaOptions.connectRetryOptions = getConfig('kafkaConnectRetry');
    }
    if (getConfig('kafkaSSL')) {
        const kafkaSSL = getConfig('kafkaSSL');
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
