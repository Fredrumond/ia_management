import { IHttpRequest, IHttpResponse } from '../ports/http/http.interfaces';
import { HttpResponse } from '../helpers/http.response';
import { User } from '../types/user.types';
import { CreateUserUseCase } from '../usecases/user/create-user';
import { GetAllUsersUseCase } from '../usecases/user/get-all-users';
import { GetUserByIdUseCase } from '../usecases/user/get-user-by-id';
import { DeleteUserUseCase } from '../usecases/user/delete-user';
import { ReactivateUserUseCase } from '../usecases/user/reactivate-user';

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
    try {
      const users = await this.getAllUsersUseCase.execute();
      return HttpResponse.ok(users);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }

  async getById(request: IHttpRequest<any, { id: string }>): Promise<IHttpResponse> {
    try {
      const { id } = request.params;
      const user = await this.getUserByIdUseCase.execute(id);
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
      const result = await this.deleteUserUseCase.execute(id);
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
      const result = await this.reactivateUserUseCase.execute(id);
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