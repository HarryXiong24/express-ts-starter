import { Request, Response } from 'express';

export const getUserInfo = (req: Request, res: Response) => {
  res.json({
    code: 200,
    msg: '请求成功',
    data: {
      name: 'harry',
      sex: 'male',
    },
  });
};
