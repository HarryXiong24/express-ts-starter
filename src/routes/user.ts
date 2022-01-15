import express from 'express';

// Controllers (route handlers)
import * as user from '../controllers/user';

const router = express.Router();

router.get('/userInfo', user.getUserInfo);

export default router;
