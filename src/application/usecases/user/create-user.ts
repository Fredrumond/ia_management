import bcrypt from "bcrypt";
import { User } from "../../types/user.types";
import { User as UserEntity } from "../../../domain/user/user.entity";
import { RealmRepositoryInterface } from "../../../domain/realm/realm.repository.interface";
import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";

export class CreateUserUseCase {    
    constructor(private userRepository: UserRepositoryInterface, private realmRepository: RealmRepositoryInterface) {}

    async execute(user: User): Promise<User> {
        const existingRealm = await this.realmRepository.findById(user.realmId);
        if (!existingRealm) {
            throw new Error('Realm not found');
        }

        const existingUser = await this.userRepository.findOne({ 
            email: user.email 
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash da senha antes de criar a entidade
        const hashedPassword = await bcrypt.hash(user.password, 10);
        
        const userEntity = UserEntity.create(user.name, user.email, hashedPassword, user.realmId);

        const userRegistred = await this.userRepository.create(userEntity);
        
        const restoredUser = UserEntity.restore(
            userRegistred.id, 
            userRegistred.name, 
            userRegistred.email, 
            userRegistred.password, 
            userRegistred.status, 
            userRegistred.realmId,
            userRegistred.createdAt
        );

        return restoredUser;
    }
}