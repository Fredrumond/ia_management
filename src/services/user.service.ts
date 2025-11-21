import { PrismaClient } from '@prisma/client';
import { User } from '../types/user.types';
import { Repository } from '../repositories/repository';

export default class UserService {
    constructor( private userRepository: Repository<PrismaClient>  ) {}

    async createUser(user: User) {

        const existingUser = await this.userRepository.findOne({ 
            email: user.email 
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        const userRegistred = await this.userRepository.create({
            name: user.name,
            email: user.email,
            password: user.password
        });

        return userRegistred;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        if (user.status === 'INACTIVE') {
            throw new Error('User already inactive');
        }
        
        await this.userRepository.delete(id);
        
        return { message: 'User deactivated successfully' };
    }

    async reactivateUser(id: string) {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        if (user.status === 'ACTIVE') {
            throw new Error('User already active');
        }
        
        await this.userRepository.reactivate(id);
        
        return { message: 'User reactivated successfully' };
    }
}