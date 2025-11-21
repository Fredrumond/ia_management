import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { User } from '../types/user.types';
import UserService from '../services/user.service';
import { PrismaUserRepository } from '../repositories/prisma/prisma.user.repository';
import { HttpResponse } from '../helpers/http.response';

export default async function userRoutes(app: FastifyInstance, options: { prisma: PrismaClient }) {
    const userService = new UserService(new PrismaUserRepository(options.prisma));
    
    app.post('/', async (request : FastifyRequest<{ Body: User }>, reply : FastifyReply) => {
        try {
            const user = request.body as User;
            const userRegistred = await userService.createUser(user);
            return HttpResponse.created(userRegistred);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            if (errorMessage === 'Email already registered') {
                return HttpResponse.badRequest(new Error(errorMessage));
            }
            
            return HttpResponse.internalServerError(new Error(errorMessage));
        }
    })

    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await userService.getAllUsers();
            return HttpResponse.ok(users);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return HttpResponse.internalServerError(new Error(errorMessage));
        }
    })

    app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            const user = await userService.getUserById(id);
            return HttpResponse.ok(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            if (errorMessage === 'User not found') {
                return HttpResponse.notFound(errorMessage);
            }
            
            return HttpResponse.internalServerError(new Error(errorMessage));
        }
    })

    app.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            const result = await userService.deleteUser(id);
            return HttpResponse.ok(result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            if (errorMessage === 'User not found') {
                return HttpResponse.notFound(errorMessage);
            }
            
            if (errorMessage === 'User already inactive') {
                return HttpResponse.badRequest(new Error(errorMessage));
            }
            
            return HttpResponse.internalServerError(new Error(errorMessage));
        }
    })

    app.patch('/:id/reactivate', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            const result = await userService.reactivateUser(id);
            return HttpResponse.ok(result);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            if (errorMessage === 'User not found') {
                return HttpResponse.notFound(errorMessage);
            }
            
            if (errorMessage === 'User already active') {
                return HttpResponse.badRequest(new Error(errorMessage));
            }
            
            return HttpResponse.internalServerError(new Error(errorMessage));
        }
    })
}


// POST - Criar usuário
// curl -X POST http://localhost:3000/users \
//   -H "Content-Type: application/json" \
//   -d '{
//     "name": "João Silva",
//     "email": "joao@example.com",
//     "password": "senha123"
//   }'

// GET - Listar todos os usuários
// curl -X GET http://localhost:3000/users

// GET - Buscar usuário por ID
// curl -X GET http://localhost:3000/users/1

// DELETE - Desativar usuário
// curl -X DELETE http://localhost:3000/users/2

// PATCH - Reativar usuário
// curl -X PATCH http://localhost:3000/users/2/reactivate