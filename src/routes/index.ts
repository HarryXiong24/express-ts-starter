import express from 'express';

// Controllers (route handlers)
import * as index from '../controllers/index';

const router = express.Router();

// get
router.get('/', index.getInfo);
// post
router.get('/login', index.doLogin);

// 处理其他没有定义的请求
router.all('*', (req, res) => {
  res.json('Error request!');
});

export default router;
