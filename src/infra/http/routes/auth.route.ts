import { IRouter } from '../../http/http.interfaces';
import { AuthController } from '../controllers/auth.controller';

export function registerAuthRoutes(router: IRouter, authController: AuthController): void {
  router.post('/login', (req, res) => authController.login(req));
}

