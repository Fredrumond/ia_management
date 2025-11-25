export class User {
    private constructor(
      private readonly _id: number | null,
      private _name: string,
      private _email: string,
      private _password: string,
      private _status: 'ACTIVE' | 'INACTIVE',
      private readonly _createdAt: Date
    ) {
      this.validate();
    }
  
    static create(name: string, email: string, password: string): User {
      return new User(null, name, email, password, 'ACTIVE', new Date());
    }
  
    static restore(
      id: number,
      name: string,
      email: string,
      password: string,
      status: 'ACTIVE' | 'INACTIVE',
      createdAt: Date
    ): User {
      return new User(id, name, email, password, status, createdAt);
    }
  
    private validate(): void {
      if (!this._name || this._name.trim().length < 3) {
        throw new Error('Name must have at least 3 characters');
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this._email || !emailRegex.test(this._email)) {
        throw new Error('Invalid email format');
      }
  
      if (!this._password || this._password.length < 6) {
        throw new Error('Password must have at least 6 characters');
      }
    }
  
    activate(): void {
      if (this._status === 'ACTIVE') {
        throw new Error('User already active');
      }
      this._status = 'ACTIVE';
    }
  
    deactivate(): void {
      if (this._status === 'INACTIVE') {
        throw new Error('User already inactive');
      }
      this._status = 'INACTIVE';
    }
  
 
    get id(): number | null { return this._id; }
    get name(): string { return this._name; }
    get email(): string { return this._email; }
    get password(): string { return this._password; }
    get status(): 'ACTIVE' | 'INACTIVE' { return this._status; }
    get isActive(): boolean { return this._status === 'ACTIVE'; }
    get createdAt(): Date { return this._createdAt; }
  }