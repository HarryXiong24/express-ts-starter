import express from 'express';
// compresses requests
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
// SQL
import options from './sql/config';
import connect from './sql/connect';
// Routers
import indexRouter from './routes/index';

// Create Express server
const app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// SQL
const mysql = connect(options);
app.set('mysql', mysql);

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

// Error Handler. Provides full stack - remove for production
app.use(errorHandler());

export default app;
