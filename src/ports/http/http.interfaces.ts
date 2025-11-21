// Interfaces genéricas para qualquer framework HTTP

export interface IHttpRequest<TBody = any, TParams = any, TQuery = any> {
    body: TBody;
    params: TParams;
    query: TQuery;
    headers: Record<string, string | string[] | undefined>;
  }
  
  export interface IHttpResponse {
    statusCode: number;
    body: any;
    headers?: Record<string, string>;
  }
  
  export interface IRouteHandler {
    (request: IHttpRequest, response: IHttpResponseBuilder): Promise<IHttpResponse> | IHttpResponse;
  }
  
  export interface IHttpResponseBuilder {
    status(code: number): IHttpResponseBuilder;
    json(data: any): IHttpResponse;
    send(data: any): IHttpResponse;
  }
  
  export interface IRouter {
    get(path: string, handler: IRouteHandler): void;
    post(path: string, handler: IRouteHandler): void;
    put(path: string, handler: IRouteHandler): void;
    patch(path: string, handler: IRouteHandler): void;
    delete(path: string, handler: IRouteHandler): void;
  }
  
  export interface IHttpServer {
    router: IRouter;
    listen(port: number, host: string): Promise<void>;
    close(): Promise<void>;
    registerRoutes(prefix: string, registerFn: (router: IRouter) => void): void;
  }