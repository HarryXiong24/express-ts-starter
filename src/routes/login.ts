import express from 'express';

// Controllers (route handlers)
import * as login from '../controllers/login';

const router = express.Router();

// get
router.get('/', login.getWelcome);

router.get('/captcha', login.getCaptcha);

// post
router.post('/login', login.doLogin);

export default router;
