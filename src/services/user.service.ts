import { PrismaClient } from '@prisma/client';
import { User } from '../types/user.types';

export default class UserService {
    constructor(private prismaClient: PrismaClient) {}

    async createUser(user: User) {
        const existingUser = await this.prismaClient.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        const userRegistred = await this.prismaClient.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
        return userRegistred;
    }
}