import { HttpStatus, NotFoundException } from '@nestjs/common';

export class TableNotFoundException extends NotFoundException {
  constructor(errorMessage: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      error: errorMessage,
    });
  }
}
