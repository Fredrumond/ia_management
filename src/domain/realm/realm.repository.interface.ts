import { Realm } from "./realm.entity";

export interface RealmRepositoryInterface {
    findById(id: number): Promise<Realm | null>;
}