import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
  res.json('{message: "Hello World!"}').status(200).send();
};
