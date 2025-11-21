import { Repository } from "../repository";
import { PrismaClient, User as PrismaUser } from '@prisma/client'

export class PrismaUserRepository implements Repository<PrismaUser> {
    constructor(private prismaClient: PrismaClient) {}
    
    async findAll(): Promise<PrismaUser[]> {
        return this.prismaClient.user.findMany();
    }
    
    async findById(id: string): Promise<PrismaUser> {
        const user = await this.prismaClient.user.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        
        return user;
    }

    async findOne(criteria: Partial<PrismaUser>): Promise<PrismaUser | null> {
        const user = await this.prismaClient.user.findFirst({
            where: criteria as any
        });
        
        return user;
    }
    
    async findMany(criteria: Partial<PrismaUser>): Promise<PrismaUser[]> {
        const users = await this.prismaClient.user.findMany({
            where: criteria as any
        });
        
        return users;
    }

    async update(id: string, data: PrismaUser): Promise<PrismaUser> {
        return this.prismaClient.user.update({
            where: { id: parseInt(id) },
            data
        });
    }
    
    async delete(id: string): Promise<void> {
        await this.prismaClient.user.update({
            where: { id: parseInt(id) },
            data: { status: 'INACTIVE' }
        });
    }

    async reactivate(id: string): Promise<void> {
        await this.prismaClient.user.update({
            where: { id: parseInt(id) },
            data: { status: 'ACTIVE' }
        });
    }

    async create(data: PrismaUser): Promise<PrismaUser> {
        return this.prismaClient.user.create({ data });
    }
}