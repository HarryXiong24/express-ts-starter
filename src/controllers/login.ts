import { Request, Response } from 'express';
import createCaptcha from '../utils/captcha';
import { generateToken } from '../utils/token';

export const getWelcome = (req: Request, res: Response) => {
  res.status(200).send('Welcome to Tunnel-Eye Backend!');
};

export const getCaptcha = (req: Request, res: Response) => {
  const code = createCaptcha();
  res.type('svg');
  res.status(200).send(code.data);
  res.end();
};

export const doLogin = (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const token = generateToken({ username: username, password: password });
  res.json({
    code: 200,
    msg: '请求成功',
    data: {
      msg: '登录成功',
      token,
    },
  });
};
