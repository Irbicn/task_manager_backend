import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import mainRouter from './routes/index.routes';

const app = express();

//Config

app.set('port', process.env.APPPORT || 4000);

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('dev'));

app.use(mainRouter);

export default app;
