import { Request, Response } from 'express';

import CreateUserService from '../service/user/CreateUserService';
import ShowByIdUserService from '../service/user/ShowByIdUserService';

class UserController {
  async showById(request: Request, response: Response) {
    const userID = request.params.id;

    const showByIdUserService = new ShowByIdUserService();

    const user = await showByIdUserService.execute(userID);

    return response.json(user);
  }

  async create(request: Request, response: Response) {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute(request.body);

    return response.status(201).json(user);
  }

  async update(request: Request, response: Response) {}

  async delete(request: Request, response: Response) {}
}

export default UserController;
