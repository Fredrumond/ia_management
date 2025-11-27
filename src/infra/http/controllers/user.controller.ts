import { IHttpRequest, IHttpResponse } from '../../http/http.interfaces';
import { HttpResponse } from '../http.response';
import { User } from '../../../types/user.types';
import { CreateUserUseCase } from '../../../application/usecases/user/create-user';
import { GetAllUsersUseCase } from '../../../application/usecases/user/get-all-users';
import { GetUserByIdUseCase } from '../../../application/usecases/user/get-user-by-id';
import { DeleteUserUseCase } from '../../../application/usecases/user/delete-user';
import { ReactivateUserUseCase } from '../../../application/usecases/user/reactivate-user';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private reactivateUserUseCase: ReactivateUserUseCase
  ) {}
  async create(request: IHttpRequest<User>): Promise<IHttpResponse> {
    try {
      console.log('request', request);
      const user = request.body;
      const userRegistred = await this.createUserUseCase.execute(user);
      return HttpResponse.created(userRegistred);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage === 'Email already registered') {
        return HttpResponse.badRequest(new Error(errorMessage));
      }
      
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }

  async getAll(request: IHttpRequest): Promise<IHttpResponse> {
    console.log('request', request);
    try {
      const users = await this.getAllUsersUseCase.execute();
      console.log('users retornados:', users); // ADICIONE ISSO
      console.log('tipo dos users:', typeof users, Array.isArray(users)); // E ISSO
      return HttpResponse.ok(users);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log('error', error);
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }

  async getById(request: IHttpRequest<any, { id: number }>): Promise<IHttpResponse> {
    try {
      const { id } = request.params;
      const user = await this.getUserByIdUseCase.execute(Number(id));
      return HttpResponse.ok(user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage === 'User not found') {
        return HttpResponse.notFound(errorMessage);
      }
      
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }

  async delete(request: IHttpRequest<any, { id: string }>): Promise<IHttpResponse> {
    try {
      const { id } = request.params;
      const result = await this.deleteUserUseCase.execute(Number(id));
      return HttpResponse.ok(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage === 'User not found') {
        return HttpResponse.notFound(errorMessage);
      }
      
      if (errorMessage === 'User already inactive') {
        return HttpResponse.badRequest(new Error(errorMessage));
      }
      
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }

  async reactivate(request: IHttpRequest<any, { id: string }>): Promise<IHttpResponse> {
    try {
      const { id } = request.params;
      const result = await this.reactivateUserUseCase.execute(Number(id));
      return HttpResponse.ok(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage === 'User not found') {
        return HttpResponse.notFound(errorMessage);
      }
      
      if (errorMessage === 'User already active') {
        return HttpResponse.badRequest(new Error(errorMessage));
      }
      
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }
}