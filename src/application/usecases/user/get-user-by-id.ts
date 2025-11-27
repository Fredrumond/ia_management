import { User } from "../../types/user.types";
import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";
import { User as UserEntity } from "../../../domain/user/user.entity"

export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        const userEntity = UserEntity.restore(user.id, user.name, user.email, user.password, user.status, user.createdAt);
        if (!userEntity) {
            throw new Error('User not found');
        }
        
        return user;
    }
}

