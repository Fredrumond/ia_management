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
}