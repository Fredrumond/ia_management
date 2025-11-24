import { User } from "../../types/user.types";
import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";

export class GetUserByIdUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    }
}

