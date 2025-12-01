import { IHttpServer } from './infra/http/http.interfaces';
import { UserController } from './infra/http/controllers/user.controller';
import { AuthController } from './infra/http/controllers/auth.controller';
import { registerUserRoutes } from './infra/http/routes/user.route';
import { registerAuthRoutes } from './infra/http/routes/auth.route';
import { PrismaUserRepository } from './infra/db/prisma/prisma.user.repository';
import { PrismaRealmRepository } from './infra/db/prisma/prisma.realm.repository';
import prisma from './lib/prisma';
import { CreateUserUseCase } from './application/usecases/user/create-user';
import { GetAllUsersUseCase } from './application/usecases/user/get-all-users';
import { GetUserByIdUseCase } from './application/usecases/user/get-user-by-id';
import { DeleteUserUseCase } from './application/usecases/user/delete-user';
import { ReactivateUserUseCase } from './application/usecases/user/reactivate-user';
import { LoginUserUseCase } from './application/usecases/auth/login-user';

export function buildApp(httpServer: IHttpServer) {
  const userRepository = new PrismaUserRepository(prisma);
  const realmRepository = new PrismaRealmRepository(prisma);
  
  // User use cases
  const createUserUseCase = new CreateUserUseCase(userRepository, realmRepository);
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const reactivateUserUseCase = new ReactivateUserUseCase(userRepository);
  
  // Auth use cases
  const loginUserUseCase = new LoginUserUseCase(userRepository);
  
  // Controllers
  const userController = new UserController(
    createUserUseCase,
    getAllUsersUseCase,
    getUserByIdUseCase,
    deleteUserUseCase,
    reactivateUserUseCase
  );
  
  const authController = new AuthController(loginUserUseCase);

  // Routes
  httpServer.registerRoutes('/users', (router) => {
    registerUserRoutes(router, userController);
  });

  httpServer.registerRoutes('/auth', (router) => {
    registerAuthRoutes(router, authController);
  });

  return httpServer;
}