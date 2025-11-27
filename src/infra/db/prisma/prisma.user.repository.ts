import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/user.entity";
import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";

export class PrismaUserRepository implements UserRepositoryInterface {
    constructor(private prismaClient: PrismaClient) {}

    async create(user: User): Promise<User> {
        const { id, ...userData } = user;
        return this.prismaClient.user.create({ data: userData });
    }

    async findAll(): Promise<User[]> {
        return this.prismaClient.user.findMany();
    }

    async findById(id: number): Promise<User | null> {
        return this.prismaClient.user.findUnique({ where: { id } });
    }
    
    async findOne(criteria: Partial<User>): Promise<User | null> {
        return this.prismaClient.user.findFirst({ where: criteria });
    }

    async findMany(criteria: Partial<User>): Promise<User[]> {
        return this.prismaClient.user.findMany({ where: criteria });
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return this.prismaClient.user.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.user.delete({ where: { id } });
    }
}