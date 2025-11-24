import { User } from "../../types/user.types";
import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";

export class GetAllUsersUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users;
    }
}

