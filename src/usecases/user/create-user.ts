import { User } from "../../types/user.types";
import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";
import { User as UserEntity } from "../../domain/user.entity";

export class CreateUserUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(user: User): Promise<User> {

        const userEntity = UserEntity.create(user.name, user.email, user.password);
        console.log('userEntity', userEntity);

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
        
        const restoredUser = UserEntity.restore(
            userRegistred.id, 
            userRegistred.name, 
            userRegistred.email, 
            userRegistred.password, 
            userRegistred.status, 
            userRegistred.createdAt
        );

        return restoredUser;
    }
}