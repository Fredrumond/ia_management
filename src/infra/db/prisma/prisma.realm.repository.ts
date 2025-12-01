import { PrismaClient } from "@prisma/client";
import { RealmRepositoryInterface } from "../../../domain/realm/realm.repository.interface";
import { Realm as RealmEntity } from "../../../domain/realm/realm.entity";

export class PrismaRealmRepository implements RealmRepositoryInterface {
    constructor(private prismaClient: PrismaClient) {}

    async findById(id: number): Promise<RealmEntity | null> {
        return this.prismaClient.realm.findUnique({ where: { id } });
    }
    
}