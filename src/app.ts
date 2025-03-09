import express, { json, urlencoded } from 'express';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

export const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,DELETE,PATCH,PUT',
    credentials: true,
  })
);
// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
RegisterRoutes(app);
app.use(errorHandler);
