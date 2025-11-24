import { User } from "../../types/user.types";
import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";

export class CreateUserUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(user: User): Promise<User> {

        console.log('user', user);
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
}