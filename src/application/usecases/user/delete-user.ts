import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";
import { User as UserEntity } from "../../../domain/user/user.entity"

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(id: string): Promise<{ message: string }> {
        const user = await this.userRepository.findById(Number(id));
        if (!user) {
            throw new Error('User not found');
        }
        
        const userEntity = UserEntity.restore(user.id, user.name, user.email, user.password, user.status, user.createdAt);
        
        if (!userEntity) {
            throw new Error('User not found');
        }

        userEntity.deactivate();
        await this.userRepository.delete(id);
        
        return { message: 'User deactivated successfully' };
    }
}

