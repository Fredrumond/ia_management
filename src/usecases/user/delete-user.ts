import { Repository } from "../../repositories/repository";
import { PrismaClient } from "@prisma/client";
import { User as UserEntity } from "../../domain/user.entity";

export class DeleteUserUseCase {
    constructor(private userRepository: Repository<PrismaClient>) {}

    async execute(id: string): Promise<{ message: string }> {
        const user = await this.userRepository.findById(id);
        const userEntity = UserEntity.restore(user.id, user.name, user.email, user.password, user.status, user.createdAt);
        
        if (!userEntity) {
            throw new Error('User not found');
        }

        userEntity.deactivate();
        await this.userRepository.delete(id);
        
        return { message: 'User deactivated successfully' };
    }
}

