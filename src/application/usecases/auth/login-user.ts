import { UserRepositoryInterface } from "../../../domain/user/user.repository.interface";
import bcrypt from "bcrypt";

interface LoginInput {
  email: string;
  password: string;
}

interface LoginOutput {
  id: number;
  name: string;
  email: string;
  status: string;
  realmId: number;
}

export class LoginUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { email, password } = input;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error('User is inactive');
    }

    return {
      id: user.id!,
      name: user.name,
      email: user.email,
      status: user.status,
      realmId: user.realmId
    };
  }
}

