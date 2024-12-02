export type DataDTO = {
  data: Record<string, string | number>[];
  mostRecentTimestamp: number | null;
};

export type DataQueryInput = {
  dictionaryColumnNames: string[] | undefined;
  selectColumnNames: string[] | undefined;
};

type DataDictionary = Record<string | number, string | number | DataDictionary>;
export type DataDictionaryDTO = {
  dataDictionary: DataDictionary;
  mostRecentTimestamp: number | null;
};

export type DataDictionaryQueryInput = {
  dictionaryColumnNames: string[];
  selectColumnNames: string[] | undefined;
};

export type DatasetConfig = {
  tableName: string;
  timeColumnName: string;
  //countryColumn: string;
};
