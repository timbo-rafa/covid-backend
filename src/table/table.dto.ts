import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { each } from 'lodash';

export class DataQueryGetRequest {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2, { message: 'Only 2-levels deep dictionaries are supported currently' })
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  dictionaryColumnNames?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  selectColumnNames?: string[];

  //@IsString()
  //tableName: string;

  @IsString()
  timeColumnName: string;
  //countryColumn: string;
}
