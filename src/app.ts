import express from 'express';
// compresses requests
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import cors from 'cors';
import path from 'path';
// SQL
// import options from './sql/config';
// import connect from './sql/connect';
// token
import { verifyToken } from './utils/token';
// Routers
import loginRouter from './routes/login';
import userRouter from './routes/user';

// Create Express server
const app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// SQL
// const mysql = connect(options);
// app.set('mysql', mysql);

// 静态目录配置
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// 跨域配置
// 由于已经安装了 cors, 所以注释了
// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   next();
// });

// Primary app routes.
app.use('/', loginRouter);
// 访问其他路由之前进行 token 验证
app.use('/*', verifyToken);
// Other Routes
app.use('/user', userRouter);

// 中间件处理 404 错误
app.use((req, res) => {
  res.status(404).send('Not found!');
});

// 中间件处理 500 错误
app.use((err: any, req: any, res: any) => {
  console.error(res.stack);
  res.status(500).send('Something broke!');
});

// Error Handler. Provides full stack - remove for production
app.use(errorHandler());

export default app;
