import { IRouter } from '../../http/http.interfaces';
import { UserController } from '../controllers/user.controller';

export function registerUserRoutes(router: IRouter, userController: UserController): void {
  router.post('/', (req, res) => userController.create(req));
  router.get('/', (req, res) => userController.getAll(req));
  router.get('/:id', (req, res) => userController.getById(req));
  router.delete('/:id', (req, res) => userController.delete(req));
  router.patch('/:id/reactivate', (req, res) => userController.reactivate(req));
}