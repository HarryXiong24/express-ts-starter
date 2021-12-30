import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import path from 'path';

// Routers
import indexRouter from './routes/index';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态目录配置
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// 跨域配置
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// Primary app routes.
app.use('/', indexRouter);

export default app;
