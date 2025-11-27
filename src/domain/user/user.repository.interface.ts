import { User } from "./user.entity";

export interface UserRepositoryInterface {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findOne(criteria: Partial<User>): Promise<User | null>;
    findMany(criteria: Partial<User>): Promise<User[]>;
    update(id: number, data: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}