import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";

export class ReactivateUserUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(id: string): Promise<{ message: string }> {
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

