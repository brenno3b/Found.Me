import express from 'express';

import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

router.get('/user/:id', userController.showById);
router.post('/user', userController.create);
router.patch('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

export default router;
