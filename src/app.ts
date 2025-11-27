import { IHttpServer } from './ports/http/http.interfaces';
import { UserController } from './controllers/user.controller';
import { registerUserRoutes } from './routes/user.route';
import { PrismaUserRepository } from './infra/db/prisma/prisma.user.repository';
import prisma from './lib/prisma';
import { CreateUserUseCase } from './application/usecases/user/create-user';
import { GetAllUsersUseCase } from './application/usecases/user/get-all-users';
import { GetUserByIdUseCase } from './application/usecases/user/get-user-by-id';
import { DeleteUserUseCase } from './application/usecases/user/delete-user';
import { ReactivateUserUseCase } from './application/usecases/user/reactivate-user';

export function buildApp(httpServer: IHttpServer) {
  const userRepository = new PrismaUserRepository(prisma);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);
  const reactivateUserUseCase = new ReactivateUserUseCase(userRepository);
  const userController = new UserController(
    createUserUseCase,
    getAllUsersUseCase,
    getUserByIdUseCase,
    deleteUserUseCase,
    reactivateUserUseCase
  );


  httpServer.registerRoutes('/users', (router) => {
    registerUserRoutes(router, userController);
  });

  return httpServer;
}