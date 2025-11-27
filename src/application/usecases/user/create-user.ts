import { User } from "../../types/user.types";
import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";
import { User as UserEntity } from "../../../domain/user/user.entity";
import bcrypt from "bcrypt";

export class CreateUserUseCase {    
    constructor(private userRepository: UserRepositoryInterface) {}

    async execute(user: User): Promise<User> {
        const existingUser = await this.userRepository.findOne({ 
            email: user.email 
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash da senha antes de criar a entidade
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        const userEntity = UserEntity.create(user.name, user.email, hashedPassword);

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