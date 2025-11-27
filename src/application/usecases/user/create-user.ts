import { User } from "../../types/user.types";
import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";
import { User as UserEntity } from "../../../domain/user/user.entity"

export class CreateUserUseCase {    
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(user: User): Promise<User> {

        const userEntity = UserEntity.create(user.name, user.email, user.password);
        console.log('userEntity', userEntity);

        const existingUser = await this.userRepository.findOne({ 
            email: user.email 
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        const userRegistred = await this.userRepository.create(userEntity);
        
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