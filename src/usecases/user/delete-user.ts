import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";

export class DeleteUserUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(id: string): Promise<{ message: string }> {
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
}

