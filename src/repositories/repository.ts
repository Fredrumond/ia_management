export interface Repository<Model> {
    create(data: Partial<Model>): Promise<Model>;
    findAll(): Promise<Model[]>;
    findById(id: string | number): Promise<Model | null>;
    findOne(criteria: Partial<Model>): Promise<Model | null>;
    findMany(criteria: Partial<Model>): Promise<Model[]>;
    update(id: string | number, data: Partial<Model>): Promise<Model>;
    delete(id: string | number): Promise<void>;
}