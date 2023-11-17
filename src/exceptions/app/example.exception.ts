import { ApiException } from '@exceptions/app/api.exception';
import { HttpStatus } from '@nestjs/common';

export class ExampleException extends ApiException {
  /**
   * @returns ApiException
   */
  static notFound(): ApiException {
    throw new ApiException(100101, [], HttpStatus.OK);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static deleteError(error?: string[]): ApiException {
    throw new ApiException(100102, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static createError(error?: string[]): ApiException {
    throw new ApiException(100103, error);
  }

  /**
   * @param error
   * @returns ApiException
   */
  static updateError(error?: string[]): ApiException {
    throw new ApiException(100104, error);
  }
}
