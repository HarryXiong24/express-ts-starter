import { Request, Response } from 'express';

export const getInfo = (req: Request, res: Response) => {
  res
    .json([
      {
        id: 1,
        name: 'Harry',
      },
      {
        id: 2,
        name: 'Junny',
      },
    ])
    .status(200)
    .send();
};

export const doLogin = (req: Request, res: Response) => {
  res
    .json({
      success: true,
      resCode: 1,
    })
    .status(200)
    .send();
};
