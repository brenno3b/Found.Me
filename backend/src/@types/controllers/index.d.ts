import { Request, Response } from 'express';

export interface IUserController {
  create(request: Request, response: Response);
  delete(request: Request, response: Response);
  showById(request: Request, response: Response);
  update(request: Request, response: Response);
}
