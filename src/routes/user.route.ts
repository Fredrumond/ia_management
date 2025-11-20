import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { User } from '../types/user.types';
import UserService from '../services/user.service';
import { PrismaUserRepository } from '../repositories/prisma/prisma.user.repository';

export default async function userRoutes(app: FastifyInstance, options: { prisma: PrismaClient }) {
    const userService = new UserService(new PrismaUserRepository(options.prisma));
    
    app.post('/', async (request : FastifyRequest<{ Body: User }>, reply : FastifyReply) => {
        try {
            const user = request.body as User;
            const userRegistred = await userService.createUser(user);
            return reply.status(201).send({ message: 'User created successfully', user: userRegistred });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            if (errorMessage === 'Email already registered') {
                return reply.status(400).send({ message: errorMessage });
            }
            
            return reply.status(500).send({ message: 'Internal server error', error: errorMessage });
        }
    })

    app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await userService.getAllUsers();
            return reply.status(200).send({ message: 'Users retrieved successfully', users });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return reply.status(500).send({ message: 'Internal server error', error: errorMessage });
        }
    })

    app.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            const user = await userService.getUserById(id);
            return reply.status(200).send({ message: 'User retrieved successfully', user });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            if (errorMessage === 'User not found') {
                return reply.status(404).send({ message: errorMessage });
            }
            
            return reply.status(500).send({ message: 'Internal server error', error: errorMessage });
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