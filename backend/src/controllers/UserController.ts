import { Request, Response } from 'express';

import { IUserController } from '../@types/controllers';

import CreateUserService from '../service/user/CreateUserService';

class UserController implements IUserController {
  async showById(request: Request, response: Response) {}

  async create(request: Request, response: Response) {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute(request.body);

    return response.status(201).json(user);
  }

  async update(request: Request, response: Response) {}

  async delete(request: Request, response: Response) {}
}

export default UserController;
