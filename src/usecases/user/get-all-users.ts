import { User } from "../../types/user.types";
import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";
import { User as UserEntity } from "../../domain/user.entity";

export class GetAllUsersUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();  
        const usersEntity = users.map(user => UserEntity.restore(user.id, user.name, user.email, user.password, user.status, user.createdAt));
        return usersEntity;
    }
}

