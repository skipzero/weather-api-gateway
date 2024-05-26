import express from 'express';
import cors from 'cors';
import 'dotenv/config'

import helmet from 'helmet'
import morgan from 'morgan'
import { createProxyMiddleware } from 'http-proxy-middleware';
import routes from './routes/'

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors())
app.use(helmet());
app.use(morgan('combined'));

app.disable('x-powered-by');

app.use('/api', routes)

const rateLimit = 20;
const interval = 60 * 1000;

const requestCounter = {};

setInterval(() => {
  Object.keys(requestCounter).forEach(ip => {
    requestCounter[ip] = 0;
  })
}, interval)

function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip; // Get client IP

  // Update request count for current IP
  requestCounter[ip] = (requestCounter[ip] || 0) + 1;

  // Check rate limit
  if (requestCounter[ip] > rateLimit) {
    return res.status(429).json({
      code: 429,
      status: 'Error',
      message: 'rate limit exceeded',
      data: null
    })
  }

  // Set timeout for each request
  req.setTimeout(15000, () => {
    res.status(504).json({
      status: 504,
      status: 'Error',
      message: 'Gateway timed out...',
      data: null
    })
    req.abort()
  });

  next();
}

app.use*(rateLimitAndTimeout)

service.forEach(({route, target}) => {
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: ''
    },
  }
  // apply rate limiting and timeout middleware before proxying
  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions))
});

// Handler for route-not-found
app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})