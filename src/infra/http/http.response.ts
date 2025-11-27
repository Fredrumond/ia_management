import { IHttpResponse } from './http.interfaces';

interface HttpResponseBody {
    message?: string;
    body?: any;
    error?: string;
}

export class HttpResponse {
    static ok(body: any, message?: string): IHttpResponse {
        return {
            statusCode: 200,
            body: {
                message: message || '',
                body
            }
        };
    }

    static created(body: any, message?: string): IHttpResponse {
        return {
            statusCode: 201,
            body: {
                message: message || '',
                body
            }
        };
    }

    static badRequest(error: Error): IHttpResponse {
        return {
            statusCode: 400,
            body: {
                error: error.message
            }
        };
    }

    static unauthorized(message: string): IHttpResponse {
        return {
            statusCode: 401,
            body: {
                error: message
            }
        };
    }

    static forbidden(message: string): IHttpResponse {
        return {
            statusCode: 403,
            body: {
                error: message
            }
        };
    }

    static notFound(message: string): IHttpResponse {
        return {
            statusCode: 404,
            body: {
                message
            }
        };
    }

    static internalServerError(error: Error): IHttpResponse {
        return {
            statusCode: 500,
            body: {
                message: 'Internal server error',
                error: error.message
            }
        };
    }
}