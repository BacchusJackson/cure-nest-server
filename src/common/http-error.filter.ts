import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      // Assign a message depending on if it's an internal server error or not
      message: status !== HttpStatus.INTERNAL_SERVER_ERROR ?
        exception.message.error || exception.message || null : 'Something went terribly wrong...'
    };

    // Log the Errors in the Console
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(`${request.method} ${request.url}`,
        exception.stack,
        'Dev Exception Filter'
      )
    } else {
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(errorResponse),
        'Dev Exception Filter'
      );
    }

    // Send the response
    response.status(status).json(errorResponse);

  }

}