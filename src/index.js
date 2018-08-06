import Express from 'express';
import bodyParser from 'body-parser';
import { logger, expressLogger, kafkaHighLevelProducer } from './config';

// initialize express
const app = Express();

// adding pino express logger middleware to express
app.use(expressLogger);

// adding body parser middlewaree to express
app.use(bodyParser.json({ limit: '2mb' }));

app.get('/', (req, res) => {
    kafkaHighLevelProducer.send([{ topic: 'node-kafka-topic', messages: 'Msg from NodeJS', attributes: 1 }], (error, results) => {
        if (error) {
            logger.error({ message: error.message });
        } else {
            logger.info(results);
        }
    });
    res.status(200).json({
        status: 200,
        message: 'API is up and running...',
    });
});

// starting the server
app.listen(process.env.APP_PORT, () => {
    logger.info({ message: `Server listening at http://${process.env.APP_HOST}:${process.env.APP_PORT}/` });
});
