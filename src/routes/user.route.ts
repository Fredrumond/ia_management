import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { User } from '../types/user.types';
import UserService from '../services/user.service';

export default async function userRoutes(app: FastifyInstance, options: { prisma: PrismaClient }) {
    const userService = new UserService(options.prisma);
    
    app.post('/', async (request : FastifyRequest<{ Body: User }>, reply : FastifyReply) => {
        try {
            const user = request.body as User;
            const userRegistred = await userService.createUser(user);
            return reply.status(201).send({ message: 'User created successfully', user: userRegistred });
        } catch (error) {
            console.error('Error creating user:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            
            // Retorna 409 Conflict se o email já estiver cadastrado
            if (errorMessage === 'Email already registered') {
                return reply.status(409).send({ message: errorMessage });
            }
            
            return reply.status(500).send({ message: 'Internal server error', error: errorMessage });
        }
    })
}


// curl -X POST http://localhost:3000/users \
//   -H "Content-Type: application/json" \
//   -d '{
//     "name": "João Silva",
//     "email": "joao@example.com",
//     "password": "senha123"
//   }'