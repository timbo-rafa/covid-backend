import { ConflictException, HttpStatus } from '@nestjs/common';

export class TableAlreadyExistsException extends ConflictException {
  constructor(errorMessage: string) {
    super({
      status: HttpStatus.CONFLICT,
      error: errorMessage,
    });
  }
}
