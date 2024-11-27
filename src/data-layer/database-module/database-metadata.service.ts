import { Injectable } from '@nestjs/common';
import { DatabaseMetadataRepository } from './database-metadata.repository';

@Injectable()
export class DatabaseMetadataService extends DatabaseMetadataRepository {}
