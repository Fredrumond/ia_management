import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../types/user.types';
import UserService from '../services/user.service';

export default async function userRoutes(app: FastifyInstance) {
    app.post('/', async (request : FastifyRequest<{ Body: User }>, reply : FastifyReply) => {
        try {
            const user = request.body as User;
            await new UserService().createUser(user);
            return reply.status(201).send({ message: 'User created successfully' });
        } catch (error) {
            return reply.status(500).send({ message: 'Internal server error' });
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