import { IHttpRequest, IHttpResponse } from '../ports/http/http.interfaces';
import { HttpResponse } from '../helpers/http.response';
import UserService from '../services/user.service';
import { User } from '../types/user.types';

export class UserController {
  constructor(private userService: UserService) {}

  async create(request: IHttpRequest<User>): Promise<IHttpResponse> {
    try {
      const user = request.body;
      const userRegistred = await this.userService.createUser(user);
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
      const users = await this.userService.getAllUsers();
      return HttpResponse.ok(users);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return HttpResponse.internalServerError(new Error(errorMessage));
    }
  }

  async getById(request: IHttpRequest<any, { id: string }>): Promise<IHttpResponse> {
    try {
      const { id } = request.params;
      const user = await this.userService.getUserById(id);
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
      const result = await this.userService.deleteUser(id);
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
      const result = await this.userService.reactivateUser(id);
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