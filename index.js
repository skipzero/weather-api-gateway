import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors())
app.use(helmet());
app.use(morgan('combined'));

app.disable('x-powered-by');