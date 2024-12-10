import { DownsamplingMethod } from "./table.dto";

export type DataDTO = {
  data: Record<string, string | number>[];
  mostRecentTimestamp: number | null;
};

export type DataQueryInput = {
  selectColumnNames: string[] | undefined;
  downsamplingMethod: DownsamplingMethod | undefined;
};

type DataDictionary = Record<string | number, string | number | DataDictionary>;
export type DataDictionaryDTO = {
  dataDictionary: DataDictionary;
  mostRecentTimestamp: number | null;
};

export type DataDictionaryQueryInput = {
  dictionaryColumnNames: string[];
  selectColumnNames: string[] | undefined;
  downsamplingMethod: DownsamplingMethod | undefined;
};

export type DatasetConfig = {
  tableName: string;
  timeColumnName: string;
  //countryColumn: string;
};
