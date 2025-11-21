interface HttpResponseBody {
    message?: string;
    body?: any;
    error?: string;
}

export class HttpResponse {
    static ok(body: any, message?: string): HttpResponse {
        return {
            statusCode: 200,
            body: {
                message: message || '',
                body
            }
        };
    }

    static created(body: any, message?: string): HttpResponse {
        return {
            statusCode: 201,
            body: {
                message: message || '',
                body
            }
        };
    }

    static badRequest(error: Error): HttpResponse {
        return {
            statusCode: 400,
            body: {
                error: error.message
            }
        };
    }

    static notFound(message: string): HttpResponse {
        return {
            statusCode: 404,
            body: {
                message
            }
        };
    }

    static internalServerError(error: Error): HttpResponse {
        return {
            statusCode: 500,
            body: {
                message: 'Internal server error',
                error: error.message
            }
        };
    }
}