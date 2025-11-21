import { IHttpServer } from './ports/http/http.interfaces';
import { UserController } from './controllers/user.controller';
import { registerUserRoutes } from './routes/user.route';
import UserService from './services/user.service';
import { PrismaUserRepository } from './repositories/prisma/prisma.user.repository';
import prisma from './lib/prisma';

export function buildApp(httpServer: IHttpServer) {
  const userRepository = new PrismaUserRepository(prisma);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);


  httpServer.registerRoutes('/users', (router) => {
    registerUserRoutes(router, userController);
  });

  return httpServer;
}