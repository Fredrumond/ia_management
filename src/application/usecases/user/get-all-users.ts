import { User } from "../../types/user.types";
import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";
import { User as UserEntity } from "../../../domain/user/user.entity"

export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();  
        const usersEntity = users.map(user => UserEntity.restore(user.id, user.name, user.email, user.password, user.status, user.createdAt));
        return usersEntity;
    }
}

