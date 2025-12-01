export class User {
    private constructor(
      public readonly id: number | null,
      public readonly name: string,
      public readonly email: string,
      public readonly password: string,
      public status: 'ACTIVE' | 'INACTIVE',
      public readonly realmId: number,
      public readonly createdAt: Date
    ) {
      this.validate();
    }
  
    static create(name: string, email: string, password: string, realmId: number): User {
      return new User(null, name, email, password, 'ACTIVE', realmId, new Date()); 
    }
  
    static restore(
      id: number,
      name: string,
      email: string,
      password: string,
      status: 'ACTIVE' | 'INACTIVE',
      realmId: number,
      createdAt: Date
    ): User {
      return new User(id, name, email, password, status, realmId, createdAt);
    }
  
    private validate(): void {
      if (!this.name || this.name.trim().length < 3) {
        throw new Error('Name must have at least 3 characters');
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email || !emailRegex.test(this.email)) {
        throw new Error('Invalid email format');
      }
  
      if (!this.password || this.password.length < 6) {
        throw new Error('Password must have at least 6 characters');
      }

      if (this.realmId === null || this.realmId === undefined) {
        throw new Error('Realm ID is required');
      }

      if (!Number.isInteger(this.realmId) || this.realmId <= 0) {
        throw new Error('Realm ID must be a positive integer');
      }

    }
  
    activate(): void {
      if (this.status === 'ACTIVE') {
        throw new Error('User already active');
      }
      this.status = 'ACTIVE';
    }
  
    deactivate(): void {
      if (this.status === 'INACTIVE') {
        throw new Error('User already inactive');
      }
      this.status = 'INACTIVE';
    }
  
    get isActive(): boolean { return this.status === 'ACTIVE'; }
  }