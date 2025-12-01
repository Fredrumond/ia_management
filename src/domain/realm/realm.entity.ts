export class Realm {
    private constructor(
      public readonly id: number | null,
      public readonly name: string,
      public readonly createdAt: Date,
      public readonly updatedAt: Date
    ) {
      this.validate();
    }
  
    static create(name: string): Realm {
      const now = new Date();
      return new Realm(null, name, now, now); 
    }
  
    static restore(
      id: number,
      name: string,
      createdAt: Date,
      updatedAt: Date
    ): Realm {
      return new Realm(id, name, createdAt, updatedAt);
    }
  
    private validate(): void {
      if (!this.name || this.name.trim().length < 3) {
        throw new Error('Name must have at least 3 characters');
      }

      if (this.name.trim().length > 100) {
        throw new Error('Name must have at most 100 characters');
      }
    }
  }
