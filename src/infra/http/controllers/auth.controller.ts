import { IHttpRequest, IHttpResponse } from '../../http/http.interfaces';
import { HttpResponse } from '../http.response';
import { LoginUserUseCase } from '../../../application/usecases/auth/login-user';

interface LoginRequest {
  email: string;
  password: string;
}

export class AuthController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async login(request: IHttpRequest<LoginRequest>): Promise<IHttpResponse> {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return HttpResponse.badRequest(new Error('Email and password are required'));
      }

      const result = await this.loginUserUseCase.execute({ email, password });
      return HttpResponse.ok(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage === 'Invalid credentials') {
        return HttpResponse.unauthorized(errorMessage);
      }

      if (errorMessage === 'User is inactive') {
        return HttpResponse.forbidden(errorMessage);
      }

      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }
}

