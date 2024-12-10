import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export enum DownsamplingMethod {
  LatestMonthly = 'LATEST_MONTHLY'
}

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

  @IsOptional()
  @IsEnum(DownsamplingMethod)
  @Transform(({ value }) => String(value).toUpperCase())
  downsamplingMethod?: DownsamplingMethod;
}
