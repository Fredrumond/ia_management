import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { 
  IHttpServer, 
  IRouter, 
  IRouteHandler, 
  IHttpRequest,
  IHttpResponse 
} from '../../infra/http/http.interfaces';

class FastifyRouterAdapter implements IRouter {
  constructor(private fastifyInstance: FastifyInstance) {}

  private adaptHandler(handler: IRouteHandler) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      const adaptedRequest: IHttpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers as Record<string, string | string[] | undefined>,
      };

      const response = await handler(adaptedRequest, null as any);
      
      if (response.headers) {
        Object.entries(response.headers).forEach(([key, value]) => {
          reply.header(key, value);
        });
      }

      return reply.status(response.statusCode).send(response.body);
    };
  }

  get(path: string, handler: IRouteHandler): void {
    this.fastifyInstance.get(path, this.adaptHandler(handler));
  }

  post(path: string, handler: IRouteHandler): void {
    this.fastifyInstance.post(path, this.adaptHandler(handler));
  }

  put(path: string, handler: IRouteHandler): void {
    this.fastifyInstance.put(path, this.adaptHandler(handler));
  }

  patch(path: string, handler: IRouteHandler): void {
    this.fastifyInstance.patch(path, this.adaptHandler(handler));
  }

  delete(path: string, handler: IRouteHandler): void {
    this.fastifyInstance.delete(path, this.adaptHandler(handler));
  }
}

export class FastifyAdapter implements IHttpServer {
  private fastifyInstance: FastifyInstance;
  public router: IRouter;

  constructor() {
    this.fastifyInstance = Fastify({
      logger: true,
    });
    this.router = new FastifyRouterAdapter(this.fastifyInstance);
  }

  registerRoutes(prefix: string, registerFn: (router: IRouter) => void): void {
    this.fastifyInstance.register(async (instance) => {
      const router = new FastifyRouterAdapter(instance);
      registerFn(router);
    }, { prefix });
  }

  async listen(port: number, host: string): Promise<void> {
    await this.fastifyInstance.listen({ port, host });
  }

  async close(): Promise<void> {
    await this.fastifyInstance.close();
  }

  getInstance(): FastifyInstance {
    return this.fastifyInstance;
  }
}